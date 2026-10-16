import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultSettings,validateSettings,quoteCart,validateCustomer,enquiryMessage} from '../commerce.js';
const item=(productId,variant,quantity)=>({productId,variant,quantity});
const ids=['royal-oud','bloom-essence','mystic-noir'];
function settings(){const s=defaultSettings();for(const key of ['free50','bundle20'])s[key]={active:true,productIds:ids,repeat:true};return s}
test('offers start inactive and no customer-supplied prices are trusted',()=>{
  const q=quoteCart([{...item('royal-oud','50 ml',3),unitPrice:1,price:1}],defaultSettings());
  assert.equal(q.subtotal,3897);assert.equal(q.savings,0);assert.equal(q.total,3897);assert.equal(q.shippingPending,true);
});
test('50ml threshold, repeated groups, leftovers and one-bundle cap',()=>{
  const s=settings();
  for(const [quantity,free] of [[2,0],[3,1],[4,1],[5,1],[6,2],[7,2]])assert.equal(quoteCart([item('royal-oud','50 ml',quantity)],s).savings,1299*free);
  s.free50.repeat=false;assert.equal(quoteCart([item('royal-oud','50 ml',6)],s).savings,1299);
});
test('20ml bundle mixes eligible perfumes and leaves extras at regular price',()=>{
  const s=settings();
  assert.equal(quoteCart([item('royal-oud','20 ml',3)],s).total,1497);
  const q=quoteCart([item('royal-oud','20 ml',2),item('bloom-essence','20 ml',2)],s);
  assert.equal(q.total,999);assert.equal(q.savings,997);
  assert.equal(quoteCart([item('royal-oud','20 ml',5)],s).total,1498);
  assert.equal(quoteCart([item('royal-oud','20 ml',8)],s).total,1998);
  s.bundle20.repeat=false;assert.equal(quoteCart([item('royal-oud','20 ml',8)],s).total,2995);
});
test('ineligible products, gift sets and other sizes do not qualify',()=>{
  const s=settings();
  for(const line of [item('aqua-elite','50 ml',3),item('royal-oud','100 ml',3),item('signature-duo','50 ml',3)])assert.equal(quoteCart([line],s).savings,0);
});
test('best single offer wins unless combination is explicitly enabled',()=>{
  const s=settings(),items=[item('royal-oud','50 ml',3),item('royal-oud','20 ml',4)];
  assert.equal(quoteCart(items,s).savings,1299);
  s.combineOffers=true;assert.equal(quoteCart(items,s).savings,2296);
  s.shippingFee=49.5;assert.equal(quoteCart(items,s).total,3646.5);
});
test('cart merges duplicate variants and rejects unavailable or invalid quantities',()=>{
  const s=settings();const q=quoteCart([item('royal-oud','50 ml',1),item('royal-oud','50 ml',2)],s);
  assert.equal(q.lines.length,1);assert.equal(q.savings,1299);
  for(const line of [item('royal-oud','50 ml',0),item('royal-oud','50 ml',1.1),item('royal-oud','50 ml',100),item('royal-oud','10 ml',1),item('unknown','50 ml',1)])assert.throws(()=>quoteCart([line],s));
  assert.throws(()=>quoteCart([item('royal-oud','50 ml',99),item('royal-oud','50 ml',1)],s));
  assert.equal(quoteCart([],s).total,0);
});
test('offer activation requires an explicit eligible selection; validates contact settings',()=>{
  const s=defaultSettings();assert.deepEqual(validateSettings(s),s);
  s.free50.active=true;assert.throws(()=>validateSettings(s));s.free50.productIds=ids;assert.equal(validateSettings(s).free50.active,true);
  for(const change of [{whatsappNumber:'123'},{shippingFee:-1},{googleProfileUrl:'https://evil.invalid/maps'},{googleProfileUrl:'javascript:alert(1)'}])assert.throws(()=>validateSettings({...s,...change}));
});
test('enquiry contains validated customer, variants, discounts, quantities and estimated total',()=>{
  const customer=validateCustomer({name:'Test Customer',phone:'+919999999999',email:'test@example.invalid',address:'Test address',city:'Test city',state:'Test state',pincode:'110001',notes:''});
  const q=quoteCart([item('royal-oud','50 ml',3)],settings()),message=enquiryMessage(q,customer);
  for(const text of ['Royal Oud','50 ml','Qty 3','Buy 2','Savings:','Estimated total:','Test Customer','110001','not a confirmed or paid order'])assert.ok(message.includes(text),text);
  assert.throws(()=>validateCustomer({...customer,name:'Injected\nmessage'}));
  assert.throws(()=>validateCustomer({...customer,pincode:'123'}));
});
