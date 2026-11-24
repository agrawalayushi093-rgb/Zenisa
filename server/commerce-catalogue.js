import {pool} from './db.js';
import {readAssignments} from './product-categories.js';
import {readVariants} from './product-storage.js';
import {storeProduct} from './store-product.js';
export async function commerceCatalogue(connection=pool){
 const [rows]=await connection.execute('SELECT p.* FROM products p WHERE p.is_active=1 AND EXISTS (SELECT 1 FROM product_category_assignments a JOIN categories c ON c.id=a.category_id JOIN subcategories s ON s.id=a.subcategory_id WHERE a.product_id=p.id AND c.is_active=1 AND s.is_active=1) ORDER BY p.id DESC');
 const [orders]=await connection.execute("SELECT quote_json FROM orders WHERE status IN ('confirmed','shipped','delivered')");const sales=new Map();for(const order of orders){const quote=JSON.parse(order.quote_json);for(const line of quote.lines)sales.set(line.productId,(sales.get(line.productId)||0)+line.quantity)}
 const data=await Promise.all(rows.map(async row=>storeProduct(row,await readVariants(connection,row.id),await readAssignments(connection,row.id),sales.get('product-'+row.id)||0)));
 return data.filter(row=>row.variants.length).sort((a,b)=>b.salesCount-a.salesCount||b.databaseId-a.databaseId);
}
