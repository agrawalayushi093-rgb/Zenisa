import {products,priceFor} from '../src/data/products.js';
import {HttpError} from './validation.js';

export const defaultSettings=()=>({
  whatsappNumber:'',shippingFee:null,
  free50:{active:false,productIds:[],repeat:true},
  bundle20:{active:false,productIds:[],repeat:true},
  combineOffers:false,googleProfileUrl:'',googlePlaceId:''
});
export function validateSettings(body){
  if(!body||typeof body!=='object')throw new HttpError(400,'Invalid settings.');
  const result=defaultSettings();
  const number=String(body.whatsappNumber||'').trim();
  if(number&&!/^[1-9]\d{7,14}$/.test(number))throw new HttpError(400,'Use a country-code WhatsApp number, digits only (8–15 digits).');
  result.whatsappNumber=number;
  if(body.shippingFee!==null&&body.shippingFee!==''){
    if(typeof body.shippingFee!=='number'||!Number.isFinite(body.shippingFee)||body.shippingFee<0||body.shippingFee>10000)throw new HttpError(400,'Enter a shipping fee from ₹0 to ₹10,000 or leave it unconfirmed.');
    result.shippingFee=Math.round(body.shippingFee*100)/100;
  }
  for(const key of ['free50','bundle20']){
    const rule=body[key];
    if(!rule||typeof rule.active!=='boolean'||typeof rule.repeat!=='boolean'||!Array.isArray(rule.productIds))throw new HttpError(400,'Choose valid offer rules.');
    const ids=[...new Set(rule.productIds)];
    if(ids.some(id=>!products.some(p=>p.id===id&&p.collection!=='Gift Sets')))throw new HttpError(400,'Select eligible individual perfumes only.');
    if(rule.active&&!ids.length)throw new HttpError(400,'Select at least one eligible product before activating an offer.');
    result[key]={active:rule.active,repeat:rule.repeat,productIds:ids};
  }
  if(typeof body.combineOffers!=='boolean')throw new HttpError(400,'Choose whether offers can combine.');
  result.combineOffers=body.combineOffers;
  const url=String(body.googleProfileUrl||'').trim();
  if(url){let parsed;try{parsed=new URL(url)}catch{throw new HttpError(400,'Enter a valid Google Business Profile link.')}
    if(parsed.protocol!=='https:'||!['google.com','www.google.com','maps.google.com','maps.app.goo.gl','g.page'].includes(parsed.hostname)||parsed.username||parsed.password)throw new HttpError(400,'Use an official HTTPS Google Maps or g.page link.');
    if(url.length>1000)throw new HttpError(400,'Google profile link is too long.');
  }
  result.googleProfileUrl=url;
  result.googlePlaceId=String(body.googlePlaceId||'').trim();
  if(result.googlePlaceId&&!/^[A-Za-z0-9_-]{10,255}$/.test(result.googlePlaceId))throw new HttpError(400,'Enter a valid Google Place ID.');
  return result;
}
export function quoteCart(input,settings){
  if(!Array.isArray(input)||input.length>60)throw new HttpError(400,'Cart must contain at most 60 product variants.');
  const merged=new Map();
  for(const item of input){
    const p=products.find(p=>p.id===item?.productId);
    if(!p||!p.variants.includes(item.variant))throw new HttpError(400,'A product or size is no longer available. Remove it and select again.');
    if(!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>99)throw new HttpError(400,'Quantity must be between 1 and 99.');
    const key=p.id+'|'+item.variant;
    const quantity=(merged.get(key)?.quantity||0)+item.quantity;
    if(quantity>99)throw new HttpError(400,'Maximum 99 of each product and size.');
    merged.set(key,{productId:p.id,name:p.name,variant:item.variant,quantity,unitPrice:priceFor(p,item.variant)});
  }
  const lines=[...merged.values()].map(line=>({...line,lineTotal:line.unitPrice*line.quantity}));
  const subtotal=lines.reduce((sum,line)=>sum+line.lineTotal,0);
  const eligible=(key,size)=>lines.filter(line=>line.variant===size&&settings[key].productIds.includes(line.productId)).flatMap(line=>Array.from({length:line.quantity},()=>({price:line.unitPrice,productId:line.productId,name:line.name})));
  const discounts=[];
  if(settings.free50.active){
    const units=eligible('free50','50 ml').sort((a,b)=>a.price-b.price);
    const groups=Math.min(Math.floor(units.length/3),settings.free50.repeat?Infinity:1);
    if(groups){const free=units.slice(0,groups);discounts.push({id:'free50',title:'Buy 2 × 50ml, Get 1 Free',groups,amount:free.reduce((sum,u)=>sum+u.price,0),detail:`${groups} lowest-priced eligible 50ml bottle${groups>1?'s':''} free from your selection.`})}
  }
  if(settings.bundle20.active){
    const units=eligible('bundle20','20 ml').sort((a,b)=>b.price-a.price);
    const groups=Math.min(Math.floor(units.length/4),settings.bundle20.repeat?Infinity:1);
    if(groups){const value=units.slice(0,groups*4).reduce((sum,u)=>sum+u.price,0);const amount=Math.max(0,value-groups*999);if(amount)discounts.push({id:'bundle20',title:'4 × 20ml for ₹999',groups,amount,detail:`${groups} mix-and-match bundle${groups>1?'s':''}; highest-priced eligible bottles included first.`})}
  }
  const appliedOffers=settings.combineOffers?discounts:discounts.sort((a,b)=>b.amount-a.amount).slice(0,1);
  const savings=appliedOffers.reduce((sum,o)=>sum+o.amount,0);
  const shippingFee=lines.length?settings.shippingFee:0;
  return {lines,subtotal,savings,appliedOffers,shippingFee,shippingPending:shippingFee===null,total:subtotal-savings+(shippingFee||0),currency:'INR',sampleCatalogue:true};
}
export function validateCustomer(body){
  const clean=(key,max)=>{const value=typeof body?.[key]==='string'?body[key].trim():'';if(value.length>max||/[\r\n\x00-\x1f]/.test(value))throw new HttpError(400,`Invalid ${key}.`);return value};
  const data={name:clean('name',100),phone:clean('phone',20),email:clean('email',180),address:clean('address',300),city:clean('city',80),state:clean('state',80),pincode:clean('pincode',6),notes:clean('notes',500)};
  if(data.name.length<2||!/^\+?[1-9]\d{7,14}$/.test(data.phone.replace(/[\s()-]/g,''))||data.address.length<5||!data.city||!data.state||!/^\d{6}$/.test(data.pincode))throw new HttpError(400,'Please complete your name, valid phone, address, city, state and six-digit PIN code.');
  if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))throw new HttpError(400,'Enter a valid email address.');
  return data;
}
const inr=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
export function enquiryMessage(quote,customer){return [
  'Hello ZENISA PERFUMES! I would like to enquire about this selection:',
  ...quote.lines.map((line,i)=>`${i+1}. ${line.name} | ${line.variant} | Qty ${line.quantity} × ${inr(line.unitPrice)} = ${inr(line.lineTotal)}`),
  '',`Subtotal: ${inr(quote.subtotal)}`,...quote.appliedOffers.map(offer=>`${offer.title}: −${inr(offer.amount)}`),`Savings: ${inr(quote.savings)}`,`Shipping: ${quote.shippingPending?'To be confirmed':inr(quote.shippingFee)}`,`Estimated total: ${inr(quote.total)}${quote.shippingPending?' + shipping, if applicable':''}`,
  '',`Customer: ${customer.name}`,`Phone: ${customer.phone}`,...(customer.email?[`Email: ${customer.email}`]:[]),`Address: ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,...(customer.notes?[`Note: ${customer.notes}`]:[]),
  '', 'Please confirm availability, final pricing, delivery and applicable taxes. This is an enquiry, not a confirmed or paid order. Catalogue details are currently samples.'
].join('\n')}
