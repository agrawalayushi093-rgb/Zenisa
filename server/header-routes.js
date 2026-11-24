import {activeAnnouncements} from './announcement-storage.js';
import {Router} from 'express';
import {pool} from './db.js';
import {defaultHeader,validateHeader,scopeHeaderCss} from './header-settings.js';
export const headerAdmin=Router(),headerPublic=Router();
async function read(){const [rows]=await pool.execute('SELECT settings_json FROM header_settings WHERE id=1');const settings=rows.length?validateHeader({...defaultHeader(),...JSON.parse(rows[0].settings_json)}):defaultHeader();settings.announcements=(await activeAnnouncements(pool)).map(row=>row.text);return settings}
headerAdmin.get('/header',async(req,res)=>res.json({settings:await read(),defaults:defaultHeader()}));
headerAdmin.put('/header',async(req,res)=>{const settings=validateHeader({...req.body,announcements:(await activeAnnouncements(pool)).map(row=>row.text)});await pool.execute('INSERT INTO header_settings (id,settings_json) VALUES (1,?) ON DUPLICATE KEY UPDATE settings_json=VALUES(settings_json)',[JSON.stringify(settings)]);res.json({settings,message:'Header saved.'})});
headerAdmin.post('/header/preview',async(req,res)=>{const settings=validateHeader(req.body);res.json({settings,css:scopeHeaderCss(settings.css)})});
headerPublic.get('/header',async(req,res)=>{res.set('Cache-Control','no-store');const settings=await read();res.json({settings,css:scopeHeaderCss(settings.css)})});
