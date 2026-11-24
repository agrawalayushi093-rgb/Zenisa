import {matchesOfferProduct} from '../src/data/offerRules.js';
import {Router} from 'express';
import {readSettings} from './commerce-routes.js';
import {commerceCatalogue} from './commerce-catalogue.js';
import {HttpError} from './validation.js';
export const offerSelectionPublic=Router();
offerSelectionPublic.get('/offer-selection/:key',async(req,res)=>{
 const settings=await readSettings(),key=req.params.key;let offer;
 if(/^offer-[1-9][0-9]*$/.test(key))offer=settings.managedOffers.find(row=>row.id===Number(key.slice(6)));
 else if(['free50','bundle20'].includes(key)){const rule=settings[key],first=key==='free50';offer={id:key,title:first?'Buy 2 × 50ml, Get 1 Free':'4 × 20ml for ₹999',description:first?'Choose three eligible bottles. The lowest-priced bottle is free.':'Choose four eligible fragrances for one bundle price.',type:first?'buy_get':'bundle',buyQuantity:2,getQuantity:1,minQuantity:first?1:4,ml:first?50:20,value:first?0:999,scope:'selected',productIds:rule.productIds,is_active:rule.active}}
 if(!offer)throw new HttpError(404,'This offer is unavailable or inactive.');
 const count=offer.type==='buy_get'?Math.max(offer.minQuantity,offer.buyQuantity+offer.getQuantity):offer.minQuantity;
 const products=offer.is_active?(await commerceCatalogue()).filter(row=>matchesOfferProduct(offer,row)).map(row=>({...row,variants:row.variants.filter(size=>!offer.ml||size===offer.ml+' ml')})).filter(row=>row.variants.length):[];
 res.set('Cache-Control','no-store');res.json({offer:{...offer,selectionCount:count},products});
});
