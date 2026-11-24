import {matchesOfferProduct} from '../src/data/offerRules.js';
import {HttpError} from './validation.js';
export function validateOffer(body,products,options={categories:[],subcategories:[]}){
 const title=typeof body?.title==='string'?body.title.trim():'',description=typeof body?.description==='string'?body.description.trim():'';
 if(title.length<2||title.length>150||description.length>2000)throw new HttpError(400,'Enter an offer title (2–150 characters) and description up to 2,000 characters.');
 const type=body.type;if(!['percentage','fixed','buy_get','bundle'].includes(type))throw new HttpError(400,'Select an offer type.');
 if(typeof body.is_active!=='boolean'||typeof body.repeat!=='boolean')throw new HttpError(400,'Choose valid offer status and repeat settings.');
 const scope=body.scope||(body.productIds?.length?'selected':'all');if(!['all','categories','subcategories','selected'].includes(scope))throw new HttpError(400,'Select a valid offer scope.');
 const productIds=scope==='selected'&&Array.isArray(body.productIds)?[...new Set(body.productIds)]:[];
 if(scope==='selected'&&(!productIds.length||productIds.length>1000||productIds.some(value=>!products.some(row=>row.id===value))))throw new HttpError(400,'Select existing eligible products.');
 const selectedIds=(key,rows,enabled)=>{if(!enabled)return [];if(!Array.isArray(body[key])||!body[key].length||body[key].length>1000)throw new HttpError(400,'Choose at least one category or subcategory.');const ids=[...new Set(body[key].map(Number))];if(ids.some(value=>!Number.isSafeInteger(value)||value<1||!rows.some(row=>row.id===value)))throw new HttpError(400,'Select existing categories or subcategories.');return ids};
 const categoryIds=selectedIds('categoryIds',options.categories,scope==='categories'),subcategoryIds=selectedIds('subcategoryIds',options.subcategories,scope==='subcategories');
 const dates={};for(const key of ['startDate','endDate']){const value=body[key]||'';if(typeof value!=='string'||value&&(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value))throw new HttpError(400,'Enter a valid offer date.');dates[key]=value}if(dates.startDate&&dates.endDate&&dates.startDate>dates.endDate)throw new HttpError(400,'End date must be on or after start date.');
 const ml=Number(body.ml),value=Number(body.value),minQuantity=Number(body.minQuantity),buyQuantity=Number(body.buyQuantity),getQuantity=Number(body.getQuantity);
 if(!Number.isFinite(ml)||ml<0||ml>10000||Math.abs(ml*100-Math.round(ml*100))>1e-6)throw new HttpError(400,'Enter a valid ML size, or 0 for all sizes.');
 if(!Number.isInteger(minQuantity)||minQuantity<1||minQuantity>99)throw new HttpError(400,'Minimum quantity must be 1–99.');
 if(type==='buy_get'){if(!Number.isInteger(buyQuantity)||!Number.isInteger(getQuantity)||buyQuantity<1||getQuantity<1||buyQuantity+getQuantity>99)throw new HttpError(400,'Enter valid buy and free quantities (total at most 99).')}
 else if(body.value===''||!Number.isFinite(value)||value<=0||value>(type==='percentage'?100:9999999)||Math.abs(value*100-Math.round(value*100))>1e-6)throw new HttpError(400,'Enter a valid discount or bundle value.');
 return {title,description,type,is_active:body.is_active,repeat:body.repeat,scope,productIds,categoryIds,subcategoryIds,...dates,ml,value:type==='buy_get'?0:value,minQuantity,buyQuantity:type==='buy_get'?buyQuantity:0,getQuantity:type==='buy_get'?getQuantity:0};
}
export function calculateOffer(offer,lines){
 const eligible=lines.filter(line=>matchesOfferProduct(offer,line)&&(!offer.ml||line.variant===offer.ml+' ml'));
 const units=eligible.flatMap(line=>Array(line.quantity).fill(line.unitPrice)),subtotal=eligible.reduce((sum,line)=>sum+line.lineTotal,0);if(units.length<offer.minQuantity)return null;
 let amount=0,groups=1;
 if(offer.type==='percentage')amount=subtotal*offer.value/100;
 if(offer.type==='fixed')amount=Math.min(subtotal,offer.value);
 if(offer.type==='buy_get'){groups=Math.min(Math.floor(units.length/(offer.buyQuantity+offer.getQuantity)),offer.repeat?Infinity:1);amount=units.sort((a,b)=>a-b).slice(0,groups*offer.getQuantity).reduce((sum,value)=>sum+value,0)}
 if(offer.type==='bundle'){groups=Math.min(Math.floor(units.length/offer.minQuantity),offer.repeat?Infinity:1);const eligibleTotal=units.sort((a,b)=>b-a).slice(0,groups*offer.minQuantity).reduce((sum,value)=>sum+value,0);amount=Math.max(0,eligibleTotal-groups*offer.value)}
 amount=Math.round(Math.min(subtotal,amount)*100)/100;return amount>0?{id:'offer-'+offer.id,title:offer.title,detail:offer.description||'Applied to eligible products.',amount,groups}:null;
}
