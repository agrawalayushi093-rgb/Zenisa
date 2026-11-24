import {activeOffers} from './offer-routes.js';
import {commerceCatalogue} from './commerce-catalogue.js';
import {Router} from 'express';
import {pool} from './db.js';
import {defaultSettings,validateSettings,quoteCart,validateCustomer,enquiryMessage} from './commerce.js';
import {HttpError} from './validation.js';
import {checkOrigin} from './auth.js';
let siteStatusCache = { isLive: true, lastChecked: 0 };
export async function getSiteStatus() {
  const now = Date.now();
  if (now - siteStatusCache.lastChecked < 4000) return siteStatusCache.isLive;
  try {
    const [rows] = await pool.execute("SELECT settings_json FROM commerce_settings WHERE id=1");
    if (rows.length) {
      const data = JSON.parse(rows[0].settings_json);
      siteStatusCache.isLive = data.isLive !== false;
    } else {
      siteStatusCache.isLive = true;
    }
  } catch {
    siteStatusCache.isLive = true;
  }
  siteStatusCache.lastChecked = now;
  return siteStatusCache.isLive;
}

export async function readSettings(){const [rows]=await pool.execute("SELECT settings_json FROM commerce_settings WHERE id=1");const settings={...defaultSettings(),...(rows.length?JSON.parse(rows[0].settings_json):{}),managedOffers:await activeOffers()};for(const key of ['free50','bundle20']){settings[key]={...settings[key],productIds:settings[key].productIds.filter(id=>/^product-[1-9][0-9]*$/.test(id))};if(!settings[key].productIds.length)settings[key].active=false}return settings}
export const commerceAdmin=Router();
commerceAdmin.get('/site-status',async(req,res)=>{const settings=await readSettings();res.json({isLive:settings.isLive!==false})});
commerceAdmin.put('/site-status',async(req,res)=>{if(typeof req.body?.isLive!=='boolean')throw new HttpError(400,'Choose a valid status.');const [rows]=await pool.execute("SELECT settings_json FROM commerce_settings WHERE id=1");const current=rows.length?JSON.parse(rows[0].settings_json):defaultSettings();current.isLive=req.body.isLive;await pool.execute('INSERT INTO commerce_settings (id,settings_json) VALUES (1,?) ON DUPLICATE KEY UPDATE settings_json=VALUES(settings_json)',[JSON.stringify(current)]);siteStatusCache.isLive=req.body.isLive;siteStatusCache.lastChecked=Date.now();res.json({isLive:current.isLive,message:current.isLive?'Store is now LIVE to public visitors.':'Store is now in COMING SOON mode.'})});
commerceAdmin.get('/commerce',async(req,res)=>res.json({settings:await readSettings(),products:(await commerceCatalogue()).map(({id,name,collection})=>({id,name,collection})),googleApiConfigured:!!process.env.GOOGLE_PLACES_API_KEY}));
commerceAdmin.put('/commerce',async(req,res)=>{const settings=validateSettings(req.body,await commerceCatalogue());await pool.execute('INSERT INTO commerce_settings (id,settings_json) VALUES (1,?) ON DUPLICATE KEY UPDATE settings_json=VALUES(settings_json)',[JSON.stringify(settings)]);res.json({settings,message:'Checkout and promotion settings saved.'})});
export const commercePublic=Router();
// Bounded in-memory request throttling. Use a shared limiter when deploying multiple API processes.
const clients=new Map();
commercePublic.use((req,res,next)=>{const now=Date.now();for(const [key,item] of clients)if(item.until<now)clients.delete(key);const entry=clients.get(req.ip)||{count:0,until:now+60000};entry.count++;clients.set(req.ip,entry);if(entry.count>120)return next(new HttpError(429,'Please wait a moment and try again.'));res.set('Cache-Control','no-store');next()});
commercePublic.use(checkOrigin);
commercePublic.get('/settings',async(req,res)=>res.json(await readSettings()));
commercePublic.post('/quote',async(req,res)=>res.json(quoteCart(req.body?.items,await readSettings(),await commerceCatalogue())));
commercePublic.post('/enquiry',async(req,res)=>{
  const settings=await readSettings();const quote=quoteCart(req.body?.items,settings,await commerceCatalogue());
  if(!quote.lines.length)throw new HttpError(400,'Add a fragrance to your cart first.');
  if(req.body?.consent!==true)throw new HttpError(400,'Consent is required to include your details in the WhatsApp enquiry.');
  const customer=validateCustomer(req.body?.customer);const message=enquiryMessage(quote,customer);
  // Customer information is used only for this response: no database storage, logs or automatic send.
  res.json({quote,message,whatsappReady:!!settings.whatsappNumber,url:settings.whatsappNumber?`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`:null});
});
let inFlight=null;
commercePublic.get('/reviews',async(req,res)=>{
  const settings=await readSettings();const profileUrl=settings.googleProfileUrl;
  if(!process.env.GOOGLE_PLACES_API_KEY||!settings.googlePlaceId)return res.json({status:'not_configured',profileUrl,reviews:[]});
  try{
    // Coalesce concurrent reads only. No persistent review cache or database copies.
    if(!inFlight||inFlight.key!==settings.googlePlaceId){const key=settings.googlePlaceId;const promise=fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(key)}`,{headers:{'X-Goog-Api-Key':process.env.GOOGLE_PLACES_API_KEY,'X-Goog-FieldMask':'displayName,rating,userRatingCount,reviews,googleMapsUri,attributions'},signal:AbortSignal.timeout(8000)}).then(async response=>{if(!response.ok)throw Error('Google request failed');return response.json()});inFlight={key,promise};promise.finally(()=>{if(inFlight?.promise===promise)inFlight=null}).catch(()=>{})}
    const result=await inFlight.promise;
    res.json({status:'connected',profileUrl:profileUrl||result.googleMapsUri,businessName:result.displayName?.text,rating:result.rating,count:result.userRatingCount,reviews:(result.reviews||[]).slice(0,5),attributions:result.attributions||[]});
  }catch{res.status(502).json({status:'unavailable',profileUrl,reviews:[],message:'Google reviews are temporarily unavailable. Read reviews on Google.'})}
});
