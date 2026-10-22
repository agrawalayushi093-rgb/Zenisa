import {Router} from 'express';
import {pool} from './db.js';
import {validateRecord,id,HttpError} from './validation.js';
import {storeSubcategoryImage,renameSubcategoryImage,removeSubcategoryImage} from './subcategory-images.js';
export const subcategoryAdmin=Router();
async function mutate(req,res,mode){
 const recordId=mode==='create'?null:id(req.params.id),data=mode==='delete'?null:validateRecord(req.body,true);
 const upload=req.body?.image_data;if(mode!=='delete'&&upload!==undefined&&upload!==null&&typeof upload!=='string')throw new HttpError(400,'Choose a valid image file.');
 const connection=await pool.getConnection();let previous=null,next=null,committed=false;
 try{
  await connection.beginTransaction();let existing;
  if(recordId){const [rows]=await connection.execute('SELECT * FROM subcategories WHERE id=? FOR UPDATE',[recordId]);if(!rows.length)throw new HttpError(404,'Subcategory not found.');existing=rows[0];previous=existing.image_path}
  if(mode==='delete'){await connection.execute('DELETE FROM subcategories WHERE id=?',[recordId])}
  else{
   const [parents]=await connection.execute('SELECT id FROM categories WHERE id=?',[data.category_id]);if(!parents.length)throw new HttpError(400,'Select an existing category.');
   let savedId=recordId;
   if(mode==='create'){const [result]=await connection.execute('INSERT INTO subcategories (category_id,name,slug,description,is_active) VALUES (?,?,?,?,?)',[data.category_id,data.name,data.slug,data.description,data.is_active?1:0]);savedId=result.insertId}
   next=upload?await storeSubcategoryImage(data.name,savedId,upload):await renameSubcategoryImage(data.name,savedId,previous);
   await connection.execute('UPDATE subcategories SET category_id=?,name=?,slug=?,description=?,is_active=?,image_path=? WHERE id=?',[data.category_id,data.name,data.slug,data.description,data.is_active?1:0,next,savedId]);
  }
  await connection.commit();committed=true;
  let cleanupPending=false;
  if(previous&&previous!==next){try{await removeSubcategoryImage(previous)}catch(error){cleanupPending=true;console.error('Subcategory image cleanup failed:',error.code)}}
  res.status(mode==='create'?201:200).json({message:mode==='delete'?'Subcategory and image deleted.':mode==='create'?'Subcategory created.':'Subcategory updated.',...(cleanupPending?{warning:'Saved, but the old image could not be removed. Check upload folder permissions.'}:{})});
 }catch(error){if(!committed){await connection.rollback();if(next&&next!==previous)await removeSubcategoryImage(next).catch(()=>{})}throw error}finally{connection.release()}
}
subcategoryAdmin.post('/subcategories',(req,res)=>mutate(req,res,'create'));
subcategoryAdmin.put('/subcategories/:id',(req,res)=>mutate(req,res,'update'));
subcategoryAdmin.delete('/subcategories/:id',(req,res)=>mutate(req,res,'delete'));
