import {HttpError} from './validation.js';
export function validateAnnouncement(body){
 const text=typeof body?.text==='string'?body.text.trim():'';
 if(!text||[...text].length>1000)throw new HttpError(400,'Enter an announcement between 1 and 1,000 characters.');
 if(typeof body.is_active!=='boolean')throw new HttpError(400,'Choose active or inactive.');
 const sort_order=Number(body.sort_order??0);if(!Number.isInteger(sort_order)||sort_order<0||sort_order>100000)throw new HttpError(400,'Display order must be between 0 and 100,000.');
 return {text,is_active:body.is_active,sort_order};
}
