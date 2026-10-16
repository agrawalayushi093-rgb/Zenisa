// Read-only live verification: never creates catalogue records.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const access=await readFile(new URL('./ADMIN-ACCESS.txt',import.meta.url),'utf8');
const email=access.match(/Email:\s*(.+)/i)?.[1].trim();
const password=access.match(/Password:\s*(.+)/i)?.[1].trim();
const base='http://127.0.0.1:5173/api';
assert.equal((await fetch(`${base}/admin/categories`)).status,401);
const login=await fetch(`${base}/admin/login`,{method:'POST',headers:{Origin:'http://127.0.0.1:5173','Content-Type':'application/json'},body:JSON.stringify({email,password})});
assert.equal(login.status,200);
const cookie=login.headers.get('set-cookie').split(';')[0];
for(const path of ['/health','/admin/dashboard','/admin/categories','/admin/subcategories','/admin/category-options']){
  const response=await fetch(base+path,{headers:{Cookie:cookie}});
  assert.equal(response.status,200,path);
  const data=await response.json();
  if(path.endsWith('/dashboard')){assert.equal(data.categories.total,0);assert.equal(data.subcategories.total,0)}
  if(data.data)assert.equal(data.data.length,0);
  console.log(`${path}: OK${data.data?' (empty)':path.endsWith('/dashboard')?' (zero records)':''}`);
}
console.log('Authenticated API and frontend proxy verified; no catalogue records inserted.');
