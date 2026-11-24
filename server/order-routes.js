import {Router} from 'express';
import {randomUUID,createHash} from 'node:crypto';
import {pool} from './db.js';
import {checkOrigin} from './auth.js';
import {HttpError,id,listParams} from './validation.js';
import {readSettings} from './commerce-routes.js';
import {commerceCatalogue} from './commerce-catalogue.js';
import {quoteCart,validateCustomer,enquiryMessage} from './commerce.js';
export const orderPublic=Router(),orderAdmin=Router();
const responseFor=(row,settings)=>({orderNumber:row.order_number,quote:JSON.parse(row.quote_json),message:row.message,url:settings.whatsappNumber?'https://wa.me/'+settings.whatsappNumber+'?text='+encodeURIComponent(row.message):null});
async function adjustStock(connection,lines,direction){
 for(const line of lines){if(!/^product-[1-9][0-9]*$/.test(line.productId))continue;
 const productId=Number(line.productId.slice(8)),ml=Number(line.variant.replace(' ml',''));
 const [result]=await connection.execute('UPDATE product_variants SET stock=stock+? WHERE product_id=? AND ml=? AND stock+?>=0',[direction*line.quantity,productId,ml,direction*line.quantity]);
 if(!result.affectedRows&&direction===1)continue;
 if(!result.affectedRows)throw new HttpError(409,'Product stock changed. Refresh your cart and try again.');
 await connection.execute('UPDATE products SET stock=(SELECT COALESCE(SUM(stock),0) FROM product_variants WHERE product_id=?) WHERE id=?',[productId,productId]);
 }
}
const requests=new Map();
orderPublic.post('/orders',checkOrigin,async(req,res)=>{
 const now=Date.now();for(const [key,value] of requests)if(value.until<now)requests.delete(key);const rate=requests.get(req.ip)||{count:0,until:now+600000};if(++rate.count>20)throw new HttpError(429,'Please wait before placing another order.');requests.set(req.ip,rate);
 if(req.body?.consent!==true)throw new HttpError(400,'Please agree to save your order details and prepare the WhatsApp message.');
 const key=req.body?.requestKey;if(typeof key!=='string'||!/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(key))throw new HttpError(400,'Refresh checkout and try again.');
 const customer=validateCustomer(req.body.customer,false),items=req.body.items,hash=createHash('sha256').update(JSON.stringify({customer,items})).digest('hex'),settings=await readSettings();
 const [existing]=await pool.execute('SELECT * FROM orders WHERE request_key=?',[key]);if(existing.length){if(existing[0].request_hash!==hash)throw new HttpError(409,'This checkout was already submitted. Start a new checkout for changed details.');return res.json(responseFor(existing[0],settings))}
 const connection=await pool.getConnection();let saved;
 try{await connection.beginTransaction();
 const ids=Array.isArray(items)?[...new Set(items.map(item=>item?.productId).filter(value=>typeof value==='string'&&/^product-[1-9][0-9]*$/.test(value)).map(value=>Number(value.slice(8))))].sort((a,b)=>a-b):[];
 if(ids.length)await connection.execute('SELECT id FROM products WHERE id IN ('+ids.map(()=>'?').join(',')+') ORDER BY id FOR UPDATE',ids);
 const quote=quoteCart(items,settings,await commerceCatalogue(connection));if(!quote.lines.length)throw new HttpError(400,'Add products to your cart first.');
 const orderNumber='ZEN-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+randomUUID().slice(0,8).toUpperCase();
 const message='Order: '+orderNumber+'\n'+enquiryMessage(quote,customer).replace('Catalogue details are currently samples.','');
 await connection.execute('INSERT INTO orders (order_number,request_key,request_hash,customer_name,customer_phone,customer_json,quote_json,message) VALUES (?,?,?,?,?,?,?,?)',[orderNumber,key,hash,customer.name,customer.phone,JSON.stringify(customer),JSON.stringify(quote),message]);
 await adjustStock(connection,quote.lines,-1);await connection.commit();saved={order_number:orderNumber,quote_json:JSON.stringify(quote),message};
 }catch(error){await connection.rollback();if(error.code==='ER_DUP_ENTRY'){const [rows]=await pool.execute('SELECT * FROM orders WHERE request_key=?',[key]);if(rows[0]?.request_hash===hash)return res.json(responseFor(rows[0],settings))}throw error}finally{connection.release()}
 res.status(201).json(responseFor(saved,settings));
});
orderAdmin.get('/orders',async(req,res)=>{const p=listParams(req.query),statuses=['new','confirmed','shipped','delivered','cancelled'],where=[],args=[];if(p.search){where.push('(order_number LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)');args.push(...Array(3).fill('%'+p.search+'%'))}if(statuses.includes(req.query.status)){where.push('status=?');args.push(req.query.status)}const clause=where.length?' WHERE '+where.join(' AND '):'';const [count]=await pool.execute('SELECT COUNT(*) AS total FROM orders'+clause,args);const [rows]=await pool.execute('SELECT id,order_number,customer_name,customer_phone,customer_json,quote_json,status,created_at FROM orders'+clause+' ORDER BY id DESC LIMIT '+p.limit+' OFFSET '+p.offset,args);res.json({total:Number(count[0].total),data:rows.map(row=>({...row,customer:JSON.parse(row.customer_json),quote:JSON.parse(row.quote_json)}))})});
orderAdmin.patch('/orders/:id/status',async(req,res)=>{const status=req.body?.status,allowed={new:['confirmed','cancelled'],confirmed:['shipped','cancelled'],shipped:['delivered'],delivered:[],cancelled:[]};if(!Object.hasOwn(allowed,status))throw new HttpError(400,'Invalid order status.');const connection=await pool.getConnection();try{await connection.beginTransaction();const [rows]=await connection.execute('SELECT * FROM orders WHERE id=? FOR UPDATE',[id(req.params.id)]);if(!rows.length)throw new HttpError(404,'Order not found.');const order=rows[0];if(order.status!==status&&!allowed[order.status].includes(status))throw new HttpError(400,'This order status change is not allowed.');if(status==='cancelled'&&order.status!=='cancelled'){const lines=JSON.parse(order.quote_json).lines;const ids=lines.filter(line=>line.productId.startsWith('product-')).map(line=>Number(line.productId.slice(8))).sort((a,b)=>a-b);if(ids.length)await connection.execute('SELECT id FROM products WHERE id IN ('+ids.map(()=>'?').join(',')+') ORDER BY id FOR UPDATE',ids);await adjustStock(connection,lines,1)}await connection.execute('UPDATE orders SET status=? WHERE id=?',[status,order.id]);await connection.commit();res.json({message:'Order status updated.'})}catch(error){await connection.rollback();throw error}finally{connection.release()}});
