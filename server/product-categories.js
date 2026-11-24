import {id,HttpError} from './validation.js';
export function validateAssignments(body){
 const rows=body.assignments??[{category_id:body.category_id,subcategory_id:body.subcategory_id}];
 if(!Array.isArray(rows)||!rows.length||rows.length>100)throw new HttpError(400,'Select between 1 and 100 category/subcategory assignments.');
 const seen=new Set();return rows.map(row=>{const category_id=id(row?.category_id),subcategory_id=id(row?.subcategory_id),key=category_id+':'+subcategory_id;if(seen.has(key))throw new HttpError(400,'The same category and subcategory is selected more than once.');seen.add(key);return {category_id,subcategory_id}});
}
export async function checkAssignments(connection,rows){for(const row of rows){const [found]=await connection.execute('SELECT id FROM subcategories WHERE id=? AND category_id=?',[row.subcategory_id,row.category_id]);if(!found.length)throw new HttpError(400,'Select a subcategory belonging to its selected category.')}}
export async function writeAssignments(connection,productId,rows){await connection.execute('DELETE FROM product_category_assignments WHERE product_id=?',[productId]);for(const [index,row] of rows.entries())await connection.execute('INSERT INTO product_category_assignments (product_id,category_id,subcategory_id,sort_order) VALUES (?,?,?,?)',[productId,row.category_id,row.subcategory_id,index]);}
export async function readAssignments(connection,productId){const [rows]=await connection.execute('SELECT a.category_id,a.subcategory_id,c.name AS category_name,s.name AS subcategory_name FROM product_category_assignments a JOIN categories c ON c.id=a.category_id JOIN subcategories s ON s.id=a.subcategory_id WHERE a.product_id=? ORDER BY a.sort_order',[productId]);return rows;}
