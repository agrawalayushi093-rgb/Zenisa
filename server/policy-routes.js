import {Router} from 'express';
import {pool} from './db.js';
import {policyDefinition,cleanPolicy} from './policy-content.js';
import {HttpError} from './validation.js';
export const policyAdmin=Router(),policyPublic=Router();
// Table names come exclusively from the fixed policy allowlist, never request input.
async function read(slug){const definition=policyDefinition(slug);const [rows]=await pool.execute(`SELECT content_html,updated_at FROM ${definition.table} WHERE id=1`);return rows[0]?{slug,...rows[0],content_html:cleanPolicy(rows[0].content_html)}:null}
policyPublic.get('/policies/:slug',async(req,res)=>{res.set('Cache-Control','no-store');const definition=policyDefinition(req.params.slug);res.json({page:await read(definition.slug),title:definition.title})});
policyAdmin.get('/policies/:slug',async(req,res)=>{res.set('Cache-Control','no-store');const definition=policyDefinition(req.params.slug);res.json({page:await read(definition.slug),title:definition.title})});
policyAdmin.put('/policies/:slug',async(req,res)=>{const definition=policyDefinition(req.params.slug),content=cleanPolicy(req.body?.content_html);if(!content.replace(/<[^>]*>/g,'').replace(/&nbsp;|&#160;/g,' ').trim()&&!content.includes('<img '))throw new HttpError(400,'Write some policy content before saving.');await pool.execute(`INSERT INTO ${definition.table} (id,content_html) VALUES (1,?) ON DUPLICATE KEY UPDATE content_html=VALUES(content_html),updated_at=CURRENT_TIMESTAMP`,[content]);res.json({message:'Policy saved and published.',page:await read(definition.slug)})});
policyAdmin.delete('/policies/:slug',async(req,res)=>{const definition=policyDefinition(req.params.slug),connection=await pool.getConnection();try{await connection.beginTransaction();await connection.execute(`DELETE FROM ${definition.table} WHERE id=1`);await connection.execute('DELETE FROM policy_pages WHERE slug=?',[definition.slug]);await connection.commit();res.json({message:'Policy content deleted.'})}catch(error){await connection.rollback();throw error}finally{connection.release()}});
