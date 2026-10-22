import {Router} from 'express';
import {pool} from './db.js';
import {imageUrl} from './subcategory-images.js';
export const cataloguePublic=Router();
cataloguePublic.get('/categories',async(req,res)=>{
 res.set('Cache-Control','no-store');
 const [rows]=await pool.execute('SELECT c.id,c.name,c.slug,c.description,s.id AS subcategory_id,s.name AS subcategory_name,s.slug AS subcategory_slug,s.description AS subcategory_description,s.image_path FROM categories c LEFT JOIN subcategories s ON s.category_id=c.id AND s.is_active=1 WHERE c.is_active=1 ORDER BY c.id,s.id');
 const groups=new Map();for(const row of rows){if(!groups.has(row.id))groups.set(row.id,{id:row.id,name:row.name,slug:row.slug,description:row.description,subcategories:[]});if(row.subcategory_id)groups.get(row.id).subcategories.push({id:row.subcategory_id,name:row.subcategory_name,slug:row.subcategory_slug,description:row.subcategory_description,image_url:imageUrl(row.image_path)})}
 res.json({data:[...groups.values()]});
});
