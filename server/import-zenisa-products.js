import {readFile,readdir,mkdir,copyFile,unlink,rmdir} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {pool} from './db.js';
import {writeVariants,contentFields} from './product-storage.js';
import {writeAssignments} from './product-categories.js';
import {imageName,imagePath} from './subcategory-images.js';
const manifest=JSON.parse(await readFile(new URL('./imports/zenisa-products-2026-11-23.json',import.meta.url),'utf8'));
const sourceRoot=resolve('public/images/Website'),uploadRoot=resolve('public/uploads/products');const created=[];const directories=[];const connection=await pool.getConnection();
try{
 const sourceImages=new Map();for(const product of manifest.products){const dir=resolve(sourceRoot,product.folder);if(!dir.startsWith(sourceRoot+sep))throw Error('Invalid source folder');const files=(await readdir(dir,{withFileTypes:true})).filter(row=>row.isFile()&&/^\d+\.png$/i.test(row.name)).map(row=>row.name).sort((a,b)=>Number.parseInt(a)-Number.parseInt(b));if(files.length!==8)throw Error('Expected 8 images for '+product.name);sourceImages.set(product.folder,files)}
 await connection.beginTransaction();
 let category=(await connection.execute("SELECT id FROM categories WHERE slug='all-products' FOR UPDATE"))[0][0];if(!category){const [result]=await connection.execute("INSERT INTO categories (name,slug,description,is_active,show_in_header) VALUES ('All Products','all-products','',1,0)");category={id:result.insertId}}
 let child=(await connection.execute("SELECT id FROM subcategories WHERE category_id=? AND slug='all-products'",[category.id]))[0][0];if(!child){const [result]=await connection.execute("INSERT INTO subcategories (category_id,name,slug,description,is_active) VALUES (?,'All Products','all-products','',1)",[category.id]);child={id:result.insertId}}
 const imported=[];
 for(const product of manifest.products){const [found]=await connection.execute('SELECT id FROM products WHERE name=?',[product.name]);if(found.length){imported.push({name:product.name,id:found[0].id,existing:true});continue}
 const [result]=await connection.execute('INSERT INTO products (name,category_id,subcategory_id,price,mrp,stock,description,is_active,is_bestseller) VALUES (?,?,?,750,999,20,?,1,0)',[product.name,category.id,child.id,'Apparel perfume by Zenisa. Available in 50 ml and 20 ml.']);const id=result.insertId;
 const folder=imageName(product.name)+'-'+id;const target=resolve(uploadRoot,folder);if(!target.startsWith(uploadRoot+sep))throw Error('Invalid target');await mkdir(target,{recursive:true});directories.push(target);
 const photos=[];for(const [index,file] of sourceImages.get(product.folder).entries()){const relative=folder+'/image-'+(index+1)+'.png';const path=imagePath(relative,uploadRoot);await copyFile(resolve(sourceRoot,product.folder,file),path);created.push(path);photos.push('/api/store/product-images/'+relative)}
 const variants=[{ml:50,price:750,mrp:999,stock:manifest.stockPerVariant,photos:[...photos]},{ml:20,price:350,mrp:499,stock:manifest.stockPerVariant,photos:[...photos]}];const content=Object.fromEntries(contentFields.map(key=>[key,'']));
 await connection.execute('UPDATE products SET variants_json=?,content_json=? WHERE id=?',[JSON.stringify(variants),JSON.stringify(content),id]);await writeVariants(connection,id,variants);await writeAssignments(connection,id,[{category_id:category.id,subcategory_id:child.id}]);imported.push({id,name:product.name});
 }
 await connection.commit();console.log(JSON.stringify({products:imported,filesCopied:created.length,stockPerVariant:manifest.stockPerVariant}));
}catch(error){await connection.rollback();for(const path of created)await unlink(path).catch(()=>{});for(const path of directories)await rmdir(path).catch(()=>{});throw error}finally{connection.release();await pool.end()}
