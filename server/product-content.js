import {HttpError} from './validation.js';
export function validateProductContent(body){
 const result={};for(const key of ['top_notes','middle_notes','base_notes','mood','mood_description','delivery_returns','ingredients','manufacturer','country_of_origin','product_information']){
  const value=body[key]??'';if(typeof value!=='string'||value.length>20000)throw new HttpError(400,'Enter valid product details.');result[key]=value.trim();
 }return result;
}
