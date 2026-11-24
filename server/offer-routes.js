import {offerScope,offerInDateRange} from '../src/data/offerRules.js';
import {storeOfferImage,removeOfferImage,offerImageUrl} from './offer-images.js';
import {Router} from 'express';
import {pool} from './db.js';
import {id,HttpError,listParams} from './validation.js';
import {validateOffer} from './offers.js';
export const offerAdmin=Router();
const normal=row=>({...JSON.parse(row.rules_json),scope:offerScope(JSON.parse(row.rules_json)),id:row.id,title:row.title,description:row.description,is_active:!!row.is_active,created_at:row.created_at,image_url:offerImageUrl(row.image_path)});
export async function activeOffers(){const [rows]=await pool.execute('SELECT * FROM offers WHERE is_active=1 ORDER BY id');return rows.map(normal).filter(offer=>offerInDateRange(offer))}
async function productOptions(){const [rows]=await pool.execute('SELECT id,name,is_active FROM products ORDER BY name');return rows.map(row=>({...row,id:'product-'+row.id}))}
async function targetingOptions(){const [categories]=await pool.execute('SELECT id,name FROM categories ORDER BY name');const [subcategories]=await pool.execute('SELECT s.id,s.name,c.name AS category_name FROM subcategories s JOIN categories c ON c.id=s.category_id ORDER BY c.name,s.name');return {categories,subcategories}}
offerAdmin.get('/offer-targets',async(req,res)=>res.json(await targetingOptions()));
offerAdmin.get('/offer-products',async(req,res)=>res.json({data:await productOptions()}));
offerAdmin.get('/offers',async(req,res)=>{const p=listParams(req.query),where=[],args=[];if(p.search){where.push('(title LIKE ? OR description LIKE ?)');args.push('%'+p.search+'%','%'+p.search+'%')}if(p.status){where.push('is_active=?');args.push(p.status==='active'?1:0)}const clause=where.length?' WHERE '+where.join(' AND '):'';const [counts]=await pool.execute('SELECT COUNT(*) AS total FROM offers'+clause,args);const [rows]=await pool.execute('SELECT * FROM offers'+clause+' ORDER BY id DESC LIMIT '+p.limit+' OFFSET '+p.offset,args);res.json({data:rows.map(normal),total:Number(counts[0].total)})});
for(const method of ['post','put'])offerAdmin[method]('/offers'+(method==='put'?'/:id':''),async(req,res)=>{
 const offer=validateOffer(req.body,await productOptions(),await targetingOptions()),values=[offer.title,offer.description,offer.is_active?1:0,JSON.stringify(offer)],connection=await pool.getConnection();let recordId,previous=null,next=null,created=null;
 try{await connection.beginTransaction();if(method==='put'){recordId=id(req.params.id);const [rows]=await connection.execute('SELECT image_path FROM offers WHERE id=? FOR UPDATE',[recordId]);if(!rows.length)throw new HttpError(404,'Offer not found.');previous=rows[0].image_path;next=previous}else{const [result]=await connection.execute('INSERT INTO offers (title,description,is_active,rules_json) VALUES (?,?,?,?)',values);recordId=result.insertId}
 if(req.body.remove_image===true)next=null;
 if(req.body.image_data){created=await storeOfferImage(offer.title,recordId,req.body.image_data);next=created;}
 await connection.execute('UPDATE offers SET title=?,description=?,is_active=?,rules_json=?,image_path=? WHERE id=?',[...values,next,recordId]);await connection.commit();
 }catch(error){await connection.rollback();if(created)await removeOfferImage(created).catch(()=>{});throw error}finally{connection.release()}
 let warning;if(previous&&previous!==next)try{await removeOfferImage(previous)}catch{warning='Offer saved; previous image could not be removed.'}res.status(method==='post'?201:200).json({id:recordId,warning});
});
offerAdmin.patch('/offers/:id/status',async(req,res)=>{if(typeof req.body.is_active!=='boolean')throw new HttpError(400,'Select a valid status.');const recordId=id(req.params.id);const [rows]=await pool.execute('SELECT * FROM offers WHERE id=?',[recordId]);if(!rows.length)throw new HttpError(404,'Offer not found.');if(req.body.is_active)validateOffer({...normal(rows[0]),is_active:true},await productOptions(),await targetingOptions());await pool.execute('UPDATE offers SET is_active=? WHERE id=?',[req.body.is_active?1:0,recordId]);res.json({message:'Offer status updated.'})});
offerAdmin.delete('/offers/:id',async(req,res)=>{const recordId=id(req.params.id),connection=await pool.getConnection();let photo;try{await connection.beginTransaction();const [rows]=await connection.execute('SELECT image_path FROM offers WHERE id=? FOR UPDATE',[recordId]);if(!rows.length)throw new HttpError(404,'Offer not found.');photo=rows[0].image_path;await connection.execute('DELETE FROM offers WHERE id=?',[recordId]);await connection.commit()}catch(error){await connection.rollback();throw error}finally{connection.release()}let warning;if(photo)try{await removeOfferImage(photo)}catch{warning='Offer deleted; image could not be removed.'}res.json({message:'Offer deleted.',warning})});
