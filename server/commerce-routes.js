import {Router} from 'express';
import {pool} from './db.js';
import {defaultSettings,validateSettings,quoteCart,validateCustomer,enquiryMessage} from './commerce.js';
import {HttpError} from './validation.js';
import {checkOrigin} from './auth.js';
export async function readSettings(){const [rows]=await pool.execute("SELECT settings_json FROM commerce_settings WHERE id=1");return rows.length?{...defaultSettings(),...JSON.parse(rows[0].settings_json)}:defaultSettings()}
export const commerceAdmin=Router();
commerceAdmin.get('/commerce',async(req,res)=>res.json({settings:await readSettings(),products:(await import('../src/data/products.js')).products.map(({id,name,collection})=>({id,name,collection})),googleApiConfigured:!!process.env.GOOGLE_PLACES_API_KEY}));
commerceAdmin.put('/commerce',async(req,res)=>{const settings=validateSettings(req.body);await pool.execute('INSERT INTO commerce_settings (id,settings_json) VALUES (1,?) ON DUPLICATE KEY UPDATE settings_json=VALUES(settings_json)',[JSON.stringify(settings)]);res.json({settings,message:'Checkout and promotion settings saved.'})});
export const commercePublic=Router();
// Bounded in-memory request throttling. Use a shared limiter when deploying multiple API processes.
const clients=new Map();
commercePublic.use((req,res,next)=>{const now=Date.now();for(const [key,item] of clients)if(item.until<now)clients.delete(key);const entry=clients.get(req.ip)||{count:0,until:now+60000};entry.count++;clients.set(req.ip,entry);if(entry.count>120)return next(new HttpError(429,'Please wait a moment and try again.'));res.set('Cache-Control','no-store');next()});
commercePublic.use(checkOrigin);
commercePublic.get('/settings',async(req,res)=>res.json(await readSettings()));
commercePublic.post('/quote',async(req,res)=>res.json(quoteCart(req.body?.items,await readSettings())));
commercePublic.post('/enquiry',async(req,res)=>{
  const settings=await readSettings();const quote=quoteCart(req.body?.items,settings);
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
