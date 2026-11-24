import {Router} from 'express';
import {pool} from './db.js';
import {checkOrigin} from './auth.js';
import {HttpError,id,listParams} from './validation.js';
export const contactAdmin=Router(),contactPublic=Router();
// Contact messages belong to the configured Zenisa database.
const table='contact_inquiries';
export function validateContact(body){
 if(!body||typeof body!=='object')throw new HttpError(400,'Enter your contact details.');
 const data={};for(const [key,max] of [['name',100],['email',150],['phone',20],['subject',200],['message',5000]]){const value=body[key]??'';if(typeof value!=='string'||value.trim().length>max)throw new HttpError(400,`Enter a valid ${key} (up to ${max} characters).`);data[key]=value.trim();}
 if(!data.name||!data.message||!/^\S+@\S+\.\S+$/.test(data.email))throw new HttpError(400,'Enter your name, a valid email and message.');
 if(data.phone&&!/^[+\d\s().-]{5,20}$/.test(data.phone))throw new HttpError(400,'Enter a valid phone number.');return data;
}
const attempts=new Map();
function limit(req,res,next){const now=Date.now();for(const [key,value] of attempts)if(value.until<=now)attempts.delete(key);const key=req.ip,entry=attempts.get(key)||{count:0,until:now+600000};if(entry.count>=5)return next(new HttpError(429,'Please wait a few minutes before sending another inquiry.'));entry.count++;attempts.set(key,entry);next();}
contactPublic.post('/contact-inquiries',checkOrigin,limit,async(req,res)=>{const data=validateContact(req.body);await pool.execute(`INSERT INTO ${table} (name,email,phone,subject,message,status) VALUES (?,?,?,?,?,'unread')`,[data.name,data.email,data.phone||null,data.subject||'Zenisa website contact',data.message]);res.status(201).json({message:'Thank you! Your inquiry has been received.'})});
contactAdmin.get('/contact-inquiries',async(req,res)=>{const p=listParams(req.query),status=['unread','read','replied'].includes(req.query.status)?req.query.status:'',where=[],args=[];if(p.search){where.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR subject LIKE ? OR message LIKE ?)');args.push(...Array(5).fill('%'+p.search+'%'))}if(status){where.push('status=?');args.push(status)}const clause=where.length?' WHERE '+where.join(' AND '):'';const [counts]=await pool.execute(`SELECT COUNT(*) AS total FROM ${table}${clause}`,args);const [data]=await pool.execute(`SELECT id,name,email,phone,subject,message,status,created_at FROM ${table}${clause} ORDER BY id DESC LIMIT ${p.limit} OFFSET ${p.offset}`,args);res.json({data,total:Number(counts[0].total)})});
contactAdmin.patch('/contact-inquiries/:id/status',async(req,res)=>{if(!['unread','read','replied'].includes(req.body.status))throw new HttpError(400,'Select a valid inquiry status.');const recordId=id(req.params.id);const [rows]=await pool.execute(`SELECT id FROM ${table} WHERE id=?`,[recordId]);if(!rows.length)throw new HttpError(404,'Inquiry not found.');await pool.execute(`UPDATE ${table} SET status=? WHERE id=?`,[req.body.status,recordId]);res.json({message:'Inquiry status updated.'})});
