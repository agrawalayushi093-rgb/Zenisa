// Integration checks without inserting settings, customers or catalogue records.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pool} from './db.js';
const base='http://127.0.0.1:5173/api';
const headers={'Content-Type':'application/json',Origin:'http://127.0.0.1:5173'};
const items=[{productId:'royal-oud',variant:'50 ml',quantity:3,unitPrice:1}];
try{
  const settings=await (await fetch(`${base}/store/settings`)).json();
  assert.equal(settings.free50.active,false);assert.equal(settings.bundle20.active,false);
  let response=await fetch(`${base}/store/quote`,{method:'POST',headers,body:JSON.stringify({items})});
  assert.equal(response.status,200);const quote=await response.json();assert.equal(quote.total,3897);assert.equal(quote.savings,0);
  response=await fetch(`${base}/store/quote`,{method:'POST',headers,body:JSON.stringify({items:[{...items[0],quantity:0}]})});assert.equal(response.status,400);
  response=await fetch(`${base}/store/quote`,{method:'POST',headers:{...headers,Origin:'https://other.invalid'},body:JSON.stringify({items})});assert.equal(response.status,403);
  response=await fetch(`${base}/store/enquiry`,{method:'POST',headers,body:JSON.stringify({items,customer:{}})});assert.equal(response.status,400);
  const customer={name:'Preview Customer',phone:'+919999999999',email:'preview@example.invalid',address:'Sample address',city:'Sample city',state:'Sample state',pincode:'110001',notes:''};
  response=await fetch(`${base}/store/enquiry`,{method:'POST',headers,body:JSON.stringify({items,customer,consent:true})});assert.equal(response.status,200);const enquiry=await response.json();assert.equal(enquiry.url,null);assert.equal(enquiry.whatsappReady,false);assert.ok(enquiry.message.includes('Royal Oud'));assert.ok(enquiry.message.includes('Estimated total:'));assert.equal(enquiry.quote.total,3897);
  const reviews=await (await fetch(`${base}/store/reviews`)).json();assert.equal(reviews.status,'not_configured');assert.deepEqual(reviews.reviews,[]);
  response=await fetch(`${base}/admin/commerce`);assert.equal(response.status,401);
  const access=await readFile(new URL('./ADMIN-ACCESS.txt',import.meta.url),'utf8');
  const email=access.match(/Email:\s*(.+)/i)[1].trim(),password=access.match(/Password:\s*(.+)/i)[1].trim();
  response=await fetch(`${base}/admin/login`,{method:'POST',headers,body:JSON.stringify({email,password})});assert.equal(response.status,200);
  const cookie=response.headers.get('set-cookie').split(';')[0];
  response=await fetch(`${base}/admin/commerce`,{headers:{Cookie:cookie}});assert.equal(response.status,200);
  const config=await response.json();assert.ok(config.products.length>0);assert.equal(config.settings.whatsappNumber,'');
  const [[counts]]=await pool.execute('SELECT (SELECT COUNT(*) FROM categories) AS categories,(SELECT COUNT(*) FROM subcategories) AS subcategories,(SELECT COUNT(*) FROM commerce_settings) AS settings');
  assert.deepEqual({...counts},{categories:0,subcategories:0,settings:0});
  console.log('Commerce API verified: server prices, invalid quantities, origin protection, pending WhatsApp/Google states, protected settings and authenticated settings read.');
  console.log('Port 3307 database verified: categories=0, subcategories=0, commerce_settings=0. No rows inserted.');
}finally{await pool.end()}
