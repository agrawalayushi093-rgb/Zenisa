import {Router} from 'express';
import {mkdir,writeFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {HttpError} from './validation.js';
export const policyImageAdmin=Router(),policyImagePublic=Router();
const directory=fileURLToPath(new URL('../public/uploads/policies/',import.meta.url));
export function decodePolicyImage(value){
 if(typeof value!=='string')throw new HttpError(400,'Choose an image file.');
 const match=/^data:image\/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/=]+)$/.exec(value);
 if(!match)throw new HttpError(400,'Use PNG, JPEG, WebP or GIF images.');
 const bytes=Buffer.from(match[2],'base64');if(!bytes.length||bytes.length>8*1024*1024)throw new HttpError(400,'Use an image smaller than 8 MB.');
 const valid=match[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:match[1]==='gif'?['GIF87a','GIF89a'].includes(bytes.subarray(0,6).toString()):bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP';
 if(!valid)throw new HttpError(400,'This file is not a valid supported image.');
 return {bytes,extension:match[1]==='jpeg'?'jpg':match[1]};
}
policyImageAdmin.post('/policy-images',async(req,res)=>{const {bytes,extension}=decodePolicyImage(req.body?.image);const file=`${randomUUID()}.${extension}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}/${file}`,bytes,{flag:'wx'});res.status(201).json({url:`/api/store/policy-images/${file}`})});
policyImagePublic.get('/policy-images/:file',(req,res,next)=>{if(!/^[a-f0-9-]{36}\.(png|jpg|webp|gif)$/.test(req.params.file))return next(new HttpError(404,'Image not found.'));res.set('X-Content-Type-Options','nosniff');res.sendFile(req.params.file,{root:directory},error=>{if(error)next(new HttpError(error.status===404?404:500,'Image unavailable.'))})});
