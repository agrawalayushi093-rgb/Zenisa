import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {pool} from './db.js';
import {defaultSettings} from './commerce.js';
import {writeVariants,contentFields} from './product-storage.js';
import {writeAssignments} from './product-categories.js';
import {storeSubcategoryImage,removeSubcategoryImage} from './subcategory-images.js';
const source=JSON.parse(await readFile(new URL('./imports/kavior-products-2026-10-31.json',import.meta.url),'utf8'));
const root=fileURLToPath(new URL('../public/uploads/products/',import.meta.url));
const created=[];let connection;
try{
 const images=new Map();
 for(const product of source.products)for(const variant of product.variants){
  const url=new URL(variant.image.startsWith('//')?'https:'+variant.image:variant.image);url.searchParams.set('width','1000');
  if(images.has(url.href))continue;
  const response=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!response.ok)throw new Error('Image download failed: '+response.status);
  const mime=response.headers.get('content-type').split(';')[0];if(!['image/png','image/jpeg','image/webp','image/gif'].includes(mime))throw new Error('Unsupported source image');
  const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length>8*1024*1024)throw new Error('Image too large');images.set(url.href,'data:'+mime+';base64,'+bytes.toString('base64'));
 }
 connection=await pool.getConnection();
 await connection.execute('CREATE TABLE IF NOT EXISTS product_import_sources (source_url VARCHAR(255) PRIMARY KEY, product_id INT UNSIGNED NOT NULL, imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE) ENGINE=InnoDB');
 await connection.beginTransaction();
 const [children]=await connection.execute('SELECT s.id,s.name,s.category_id,c.name category FROM subcategories s JOIN categories c ON c.id=s.category_id');
 const imported=[];
 for(const product of source.products){
  const [existing]=await connection.execute('SELECT product_id FROM product_import_sources WHERE source_url=?',[product.source_url]);if(existing.length){imported.push({name:product.name,id:existing[0].product_id,existing:true});continue}
  const tags=product.tags.join(' ').toLowerCase();const gender=product.tags.includes('Women')?'Women':product.tags.includes('Unisex')?'Unisex':'Men';
  const names=[gender];if(/woody/.test(tags))names.push('Woody');if(/citrus/.test(tags))names.push('Fresh & Citrus');if(/floral/.test(tags))names.push('Floral');if(/amber/.test(tags))names.push('Amber & Spicy');if(/sweet|gourmand/.test(tags))names.push('Sweet & Vanilla');
  for(const occasion of ['Everyday Wear','Office Wear','Gym Wear','Date Night','Party Wear','Wedding Wear'])if(product.tags.includes(occasion))names.push(occasion);
  const assignments=names.map(name=>children.find(row=>row.name===name)).filter(Boolean).map(row=>({category_id:row.category_id,subcategory_id:row.id}));if(!assignments.length)throw new Error('Missing product categories');
  const main=product.variants.find(row=>row.ml===50)||product.variants[0];
  const description=`${product.name} by KAVIOR. Available sizes: ${product.variants.map(row=>row.ml+' ml').join(', ')}.`;
  const [result]=await connection.execute('INSERT INTO products (name,category_id,subcategory_id,price,mrp,stock,description,is_active,is_bestseller) VALUES (?,?,?,?,?,0,?,1,0)',[product.name,assignments[0].category_id,assignments[0].subcategory_id,main.price,main.mrp,description]);
  const id=result.insertId;const variants=[];const stored=new Map();
  for(const variant of product.variants){const url=new URL(variant.image.startsWith('//')?'https:'+variant.image:variant.image);url.searchParams.set('width','1000');if(!stored.has(url.href)){const relative=await storeSubcategoryImage(product.name,id,images.get(url.href),root);created.push(relative);stored.set(url.href,'/api/store/product-images/'+relative)}variants.push({ml:variant.ml,price:variant.price,mrp:variant.mrp,stock:0,photos:[stored.get(url.href)]})}
  const content=Object.fromEntries(contentFields.map(field=>[field,'']));content.product_information='Brand: KAVIOR. Catalogue source: '+product.source_url;
  await connection.execute('UPDATE products SET variants_json=?,content_json=?,product_information=? WHERE id=?',[JSON.stringify(variants),JSON.stringify(content),content.product_information,id]);
  await writeVariants(connection,id,variants);await writeAssignments(connection,id,assignments);
  await connection.execute('INSERT INTO product_import_sources (source_url,product_id) VALUES (?,?)',[product.source_url,id]);imported.push({name:product.name,id});
 }
 const [settingsRows]=await connection.execute('SELECT settings_json FROM commerce_settings WHERE id=1 FOR UPDATE');const settings={...defaultSettings(),...(settingsRows.length?JSON.parse(settingsRows[0].settings_json):{}),whatsappNumber:'919589138699'};
 await connection.execute('INSERT INTO commerce_settings (id,settings_json) VALUES (1,?) ON DUPLICATE KEY UPDATE settings_json=VALUES(settings_json)',[JSON.stringify(settings)]);
 await connection.commit();console.log(JSON.stringify({imported,photosSaved:created.length,whatsappConfigured:true}));
}catch(error){if(connection)await connection.rollback();await Promise.allSettled(created.map(path=>removeSubcategoryImage(path,root)));throw error}finally{connection?.release();await pool.end()}
