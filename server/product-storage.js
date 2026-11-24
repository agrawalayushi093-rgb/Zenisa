export const contentFields=['top_notes','middle_notes','base_notes','mood','mood_description','delivery_returns','ingredients','manufacturer','country_of_origin','product_information'];
export async function writeVariants(connection,productId,variants){
 await connection.execute('DELETE FROM product_variants WHERE product_id=?',[productId]);
 for(const [index,variant] of variants.entries()){
  const [result]=await connection.execute('INSERT INTO product_variants (product_id,ml,price,mrp,stock,sort_order) VALUES (?,?,?,?,?,?)',[productId,variant.ml,variant.price,variant.mrp,variant.stock,index]);
  for(const [position,photo] of variant.photos.entries())await connection.execute('INSERT INTO product_variant_photos (variant_id,image_path,sort_order) VALUES (?,?,?)',[result.insertId,photo.replace('/api/store/product-images/',''),position]);
 }
}
export async function readVariants(connection,productId){
 const [variants]=await connection.execute('SELECT id,ml,price,mrp,stock FROM product_variants WHERE product_id=? ORDER BY sort_order,id',[productId]);
 const [photos]=await connection.execute('SELECT f.variant_id,f.image_path FROM product_variant_photos f JOIN product_variants v ON v.id=f.variant_id WHERE v.product_id=? ORDER BY f.sort_order,f.id',[productId]);
 return variants.map(row=>({ml:Number(row.ml),price:Number(row.price),mrp:Number(row.mrp),stock:row.stock,photos:photos.filter(photo=>photo.variant_id===row.id).map(photo=>'/api/store/product-images/'+photo.image_path)}));
}
export async function migrateProducts(connection){
 const [columns]=await connection.execute('SHOW COLUMNS FROM products');const existing=new Set(columns.map(row=>row.Field));
 if(!existing.has('is_bestseller'))await connection.execute('ALTER TABLE products ADD COLUMN is_bestseller TINYINT(1) NOT NULL DEFAULT 0');
 if(!existing.has('category_id'))await connection.execute('ALTER TABLE products ADD COLUMN category_id INT UNSIGNED NULL');
 for(const field of contentFields)if(!existing.has(field))await connection.execute(`ALTER TABLE products ADD COLUMN ${field} TEXT NULL`);
 await connection.execute('UPDATE products p JOIN subcategories s ON s.id=p.subcategory_id SET p.category_id=s.category_id WHERE p.category_id IS NULL');
 await connection.execute('ALTER TABLE products MODIFY category_id INT UNSIGNED NOT NULL');
 const [constraints]=await connection.execute("SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='products' AND CONSTRAINT_NAME='fk_products_category'");
 if(!constraints.length)await connection.execute('ALTER TABLE products ADD CONSTRAINT fk_products_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE RESTRICT');
 await connection.execute('INSERT INTO product_category_assignments (product_id,category_id,subcategory_id,sort_order) SELECT p.id,p.category_id,p.subcategory_id,0 FROM products p WHERE NOT EXISTS (SELECT 1 FROM product_category_assignments a WHERE a.product_id=p.id)');
 const [rows]=await connection.execute('SELECT * FROM products');
 await connection.beginTransaction();try{for(const row of rows){
  const content=JSON.parse(row.content_json||'{}');for(const field of contentFields)if(row[field]===null&&content[field]!==undefined)await connection.execute(`UPDATE products SET ${field}=? WHERE id=?`,[content[field],row.id]);
  const [found]=await connection.execute('SELECT id FROM product_variants WHERE product_id=? LIMIT 1',[row.id]);if(!found.length&&row.variants_json)await writeVariants(connection,row.id,JSON.parse(row.variants_json));
 }await connection.commit()}catch(error){await connection.rollback();throw error}
}
