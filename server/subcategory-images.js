import {mkdir,writeFile,readFile,unlink,rmdir} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {Router} from 'express';
import {decodePolicyImage} from './policy-images.js';
import {HttpError} from './validation.js';
export const subcategoryImageRoot=fileURLToPath(new URL('../public/uploads/subcategories/',import.meta.url));
export const imageName=name=>name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||'subcategory';
export function imagePath(relative,root=subcategoryImageRoot){if(typeof relative!=='string'||!/^([a-z0-9-]+)-([1-9][0-9]*)\/[a-z0-9-]+\.(png|jpg|webp|gif)$/.test(relative))throw new HttpError(400,'Invalid subcategory image path.');const base=resolve(root),target=resolve(base,relative);if(!target.startsWith(base+sep))throw new HttpError(400,'Invalid image path.');return target}
export async function storeSubcategoryImage(name,id,input,root=subcategoryImageRoot){const {bytes,extension}=decodePolicyImage(input);return writeImage(name,id,bytes,extension,root)}
async function writeImage(name,id,bytes,extension,root){const slug=imageName(name),relative=`${slug}-${id}/${slug}-${randomUUID()}.${extension}`,target=imagePath(relative,root);await mkdir(resolve(root,`${slug}-${id}`),{recursive:true});await writeFile(target,bytes,{flag:'wx'});return relative}
export async function renameSubcategoryImage(name,id,previous,root=subcategoryImageRoot){if(!previous)return null;const desired=`${imageName(name)}-${id}/`;if(previous.startsWith(desired))return previous;const bytes=await readFile(imagePath(previous,root));return writeImage(name,id,bytes,previous.split('.').at(-1),root)}
export async function removeSubcategoryImage(relative,root=subcategoryImageRoot){if(!relative)return;const target=imagePath(relative,root);try{await unlink(target)}catch(error){if(error.code!=='ENOENT')throw error}try{await rmdir(resolve(root,relative.split('/')[0]))}catch(error){if(!['ENOENT','ENOTEMPTY'].includes(error.code))throw error}}
export const imageUrl=relative=>relative?`/api/store/subcategory-images/${relative}`:null;
export const subcategoryImagePublic=Router();
subcategoryImagePublic.get('/subcategory-images/:folder/:file',(req,res,next)=>{let target;try{target=imagePath(`${req.params.folder}/${req.params.file}`)}catch{return next(new HttpError(404,'Image not found.'))}res.set('X-Content-Type-Options','nosniff');res.set('Cache-Control','public, max-age=31536000, immutable');res.sendFile(target,error=>{if(error)next(new HttpError(error.status===404?404:500,'Image unavailable.'))})});
