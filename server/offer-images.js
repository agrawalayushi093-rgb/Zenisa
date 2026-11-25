import {Router} from 'express';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import {imagePath,storeSubcategoryImage,removeSubcategoryImage} from './subcategory-images.js';
import {HttpError} from './validation.js';

const root=fileURLToPath(new URL('../public/uploads/offers/',import.meta.url));
const imagesRoot=fileURLToPath(new URL('../public/images/',import.meta.url));
const distImagesRoot=fileURLToPath(new URL('../dist/images/',import.meta.url));

export const storeOfferImage=(name,id,input)=>storeSubcategoryImage(name,id,input,root);
export const removeOfferImage=path=>removeSubcategoryImage(path,root);
export const offerImageUrl=path=>path?'/api/store/offer-images/'+path+'?v=2':null;
export const offerImagePublic=Router();

offerImagePublic.get('/offer-images/:folder/:file',(req,res,next)=>{
  res.set('X-Content-Type-Options','nosniff');
  res.set('Cache-Control','no-cache, must-revalidate, max-age=0');
  res.set('Pragma','no-cache');

  try{
    const target=imagePath(req.params.folder+'/'+req.params.file,root);
    if(fs.existsSync(target)){
      return res.sendFile(target);
    }
  }catch{}

  const targetStr=(req.params.folder+' '+req.params.file).toLowerCase();
  let candidateName='zenisa-gifting-black-cap-v1.jpg';
  if(targetStr.includes('discovery')||targetStr.includes('20ml')||targetStr.includes('999')){
    candidateName='zenisa-gifting-black-cap-v1.jpg';
  }else if(targetStr.includes('buy-2')||targetStr.includes('50ml')||targetStr.includes('free')){
    candidateName='zenisa-hero-gifting-pair-v2.jpg';
  }else{
    candidateName='zenisa-collections-black-cap-v1.jpg';
  }

  for(const dir of [imagesRoot,distImagesRoot]){
    const candPath=path.join(dir,candidateName);
    if(fs.existsSync(candPath)){
      return res.sendFile(candPath);
    }
    const candPng=candPath.replace(/\.jpg$/,'.png');
    if(fs.existsSync(candPng)){
      return res.sendFile(candPng);
    }
  }

  const placeholder=path.join(imagesRoot,'placeholders','offer.svg');
  if(fs.existsSync(placeholder)){
    res.set('Content-Type','image/svg+xml');
    return res.sendFile(placeholder);
  }

  return next(new HttpError(404,'Image not found.'));
});
