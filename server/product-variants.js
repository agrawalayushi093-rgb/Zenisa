import {HttpError} from './validation.js';
import {decodePolicyImage} from './policy-images.js';
export function validateVariants(input){
 if(!Array.isArray(input)||!input.length||input.length>50)throw new HttpError(400,'Add between 1 and 50 ML variants.');
 const sizes=new Set();return input.map(row=>{
 const ml=Number(row.ml),price=Number(row.price),mrp=Number(row.mrp),stock=Number(row.stock);
 if(!Number.isFinite(ml)||ml<=0||ml>10000||sizes.has(ml))throw new HttpError(400,'Each variant needs a unique ML size greater than zero.');sizes.add(ml);
 if(row.price===''||row.mrp===''||![price,mrp].every(v=>Number.isFinite(v)&&v>=0&&v<=99999999.99)||mrp<price)throw new HttpError(400,'Enter valid variant prices. MRP must be at least the selling price.');
 if(row.stock===''||!Number.isInteger(stock)||stock<0||stock>1000000)throw new HttpError(400,'Enter a valid stock quantity for each variant.');
 if(!Array.isArray(row.photos)||row.photos.length>10)throw new HttpError(400,'Use up to 10 photos per variant.');
 for(const photo of row.photos){if(typeof photo!=='string')throw new HttpError(400,'Invalid variant photo.');if(photo.startsWith('data:'))decodePolicyImage(photo);else if(!photo.startsWith('/api/store/product-images/'))throw new HttpError(400,'Invalid variant photo.');}
 return {ml,price,mrp,stock,photos:row.photos};});
}
