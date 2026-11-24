import {commerceCatalogue} from './commerce-catalogue.js';
import {validateAssignments,checkAssignments,writeAssignments,readAssignments} from './product-categories.js';
import {writeVariants,readVariants,contentFields} from './product-storage.js';
import {validateProductContent} from './product-content.js';
import {validateVariants} from './product-variants.js';
import {storeSubcategoryImage,removeSubcategoryImage,imagePath} from './subcategory-images.js';
import {fileURLToPath} from 'node:url';
const photoRoot=fileURLToPath(new URL('../public/uploads/products/',import.meta.url));
import {Router} from 'express';
import {pool} from './db.js';
import {id,HttpError} from './validation.js';
export const productAdmin=Router(),productImagePublic=Router();
productImagePublic.get('/products',async(req,res)=>{res.set('Cache-Control','no-store');const [subcategories]=await pool.execute('SELECT s.id,s.name,s.slug,c.slug AS category_slug,c.name AS category_name FROM subcategories s JOIN categories c ON c.id=s.category_id WHERE s.is_active=1 AND c.is_active=1');const [categories]=await pool.execute('SELECT id,name,slug FROM categories WHERE is_active=1');res.json({data:await commerceCatalogue(),subcategories,categories})});
productImagePublic.get('/products/:id',async(req,res)=>{const [rows]=await pool.execute('SELECT p.*,s.name AS subcategory_name,c.name AS category_name FROM products p JOIN subcategories s ON s.id=p.subcategory_id JOIN categories c ON c.id=s.category_id WHERE p.id=? AND p.is_active=1 AND EXISTS (SELECT 1 FROM product_category_assignments a JOIN categories ac ON ac.id=a.category_id JOIN subcategories sc ON sc.id=a.subcategory_id WHERE a.product_id=p.id AND ac.is_active=1 AND sc.is_active=1)',[id(req.params.id)]);if(!rows.length)throw new HttpError(404,'Product not found.');res.set('Cache-Control','no-store');res.json({product:{...rows[0],assignments:await readAssignments(pool,rows[0].id),variants:await readVariants(pool,rows[0].id),content:Object.fromEntries(contentFields.map(key=>[key,rows[0][key]||'']))}})});
productImagePublic.get('/product-images/:folder/:file',(req,res,next)=>{let target;try{target=imagePath(req.params.folder+'/'+req.params.file,photoRoot)}catch{return next(new HttpError(404,'Image not found.'))}res.set('X-Content-Type-Options','nosniff');res.sendFile(target,error=>{if(error)next(new HttpError(404,'Image not found.'))})});
export function validateProduct(body){
 const name=typeof body.name==='string'?body.name.trim():'';
 const description=typeof body.description==='string'?body.description.trim():'';
 const price=Number(body.price),mrp=Number(body.mrp),stock=Number(body.stock);
 if(name.length<2||name.length>200)throw new HttpError(400,'Enter a product name between 2 and 200 characters.');
 if(description.length>10000)throw new HttpError(400,'Description is too long.');
 if(body.price===''||body.mrp===''||![price,mrp].every(v=>Number.isFinite(v)&&v>=0&&v<=99999999.99)||mrp<price)throw new HttpError(400,'Enter valid prices. MRP must be at least the selling price.');
 if(!Number.isInteger(stock)||stock<0||stock>50000000)throw new HttpError(400,'Enter a valid stock quantity.');
 if(body.is_bestseller!==undefined&&typeof body.is_bestseller!=='boolean')throw new HttpError(400,'Show in Bestsellers must be checked or unchecked.');
 if(typeof body.is_active!=='boolean')throw new HttpError(400,'Select a valid status.');
 return [name,id(body.subcategory_id),price,mrp,stock,description,body.is_active?1:0];
}
productAdmin.get('/product-occasions',async(req,res)=>{const [data]=await pool.execute("SELECT s.id,s.name FROM subcategories s JOIN categories c ON c.id=s.category_id WHERE c.slug='occasion' ORDER BY s.name");res.json({data})});
productAdmin.get('/product-options',async(req,res)=>{const [data]=await pool.execute('SELECT s.id,s.name,s.category_id,c.name AS category_name FROM subcategories s JOIN categories c ON c.id=s.category_id ORDER BY c.name,s.name');res.json({data})});
productAdmin.get('/products',async(req,res)=>{const [data]=await pool.execute('SELECT p.*,s.category_id,s.name AS subcategory_name,c.name AS category_name FROM products p JOIN subcategories s ON s.id=p.subcategory_id JOIN categories c ON c.id=s.category_id ORDER BY p.id DESC');res.json({data:await Promise.all(data.map(async row=>({...row,assignments:await readAssignments(pool,row.id),variants:await readVariants(pool,row.id)})))})});

for(const method of ['post','put'])productAdmin[method]('/products'+(method==='put'?'/:id':''),async(req,res)=>{
 const assignments=validateAssignments(req.body),content=validateProductContent(req.body),variants=validateVariants(req.body.variants),values=validateProduct({...req.body,...assignments[0],...variants[0],stock:variants.reduce((sum,row)=>sum+row.stock,0)});
 const connection=await pool.getConnection(),created=[];let previous=[],recordId;
 try{await connection.beginTransaction();
 await checkAssignments(connection,assignments);const parents=[assignments[0]];
 if(method==='put'){recordId=id(req.params.id);const [rows]=await connection.execute('SELECT id FROM products WHERE id=? FOR UPDATE',[recordId]);if(!rows.length)throw new HttpError(404,'Product not found.');previous=await readVariants(connection,recordId);}
 else {const [result]=await connection.execute('INSERT INTO products (category_id,name,subcategory_id,price,mrp,stock,description,is_active) VALUES (?,?,?,?,?,?,?,?)',[parents[0].category_id,...values]);recordId=result.insertId;}
 const allowed=new Set(previous.flatMap(row=>row.photos));
 for(const variant of variants){const photos=[];for(const photo of variant.photos){if(photo.startsWith('data:')){const relative=await storeSubcategoryImage(values[0],recordId,photo,photoRoot);created.push(relative);photos.push('/api/store/product-images/'+relative)}else{if(!allowed.has(photo))throw new HttpError(400,'Photo does not belong to this product.');photos.push(photo)}}variant.photos=photos;}
 await connection.execute('UPDATE products SET name=?,subcategory_id=?,price=?,mrp=?,stock=?,description=?,is_active=?,variants_json=?,content_json=? WHERE id=?',[...values,JSON.stringify(variants),JSON.stringify(content),recordId]);await connection.execute('UPDATE products SET is_bestseller=COALESCE(?,is_bestseller),category_id=?,'+contentFields.map(key=>key+'=?').join(',')+' WHERE id=?',[req.body.is_bestseller===undefined?null:req.body.is_bestseller?1:0,parents[0].category_id,...contentFields.map(key=>content[key]),recordId]);await writeVariants(connection,recordId,variants);await writeAssignments(connection,recordId,assignments);await connection.commit();
 }catch(error){await connection.rollback();await Promise.allSettled(created.map(photo=>removeSubcategoryImage(photo,photoRoot)));throw error}finally{connection.release()}
 const retained=new Set(variants.flatMap(row=>row.photos));const removed=previous.flatMap(row=>row.photos).filter(photo=>!retained.has(photo));const cleanup=await Promise.allSettled(removed.map(photo=>removeSubcategoryImage(photo.replace('/api/store/product-images/',''),photoRoot)));res.status(method==='post'?201:200).json({id:recordId,warning:cleanup.some(result=>result.status==='rejected')?'Product saved; an old photo could not be removed.':undefined});
});
productAdmin.delete('/products/:id',async(req,res)=>{const connection=await pool.getConnection();let variants=[];try{await connection.beginTransaction();const recordId=id(req.params.id);const [rows]=await connection.execute('SELECT variants_json FROM products WHERE id=? FOR UPDATE',[recordId]);if(!rows.length)throw new HttpError(404,'Product not found.');variants=await readVariants(connection,recordId);await connection.execute('DELETE FROM products WHERE id=?',[recordId]);await connection.commit()}catch(error){await connection.rollback();throw error}finally{connection.release()}const cleanup=await Promise.allSettled(variants.flatMap(row=>row.photos).map(photo=>removeSubcategoryImage(photo.replace('/api/store/product-images/',''),photoRoot)));res.json({message:'Product deleted.',warning:cleanup.some(result=>result.status==='rejected')?'Product deleted; an old photo could not be removed.':undefined})});
