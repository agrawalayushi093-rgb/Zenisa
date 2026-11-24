import {contentFields} from './product-storage.js';
export function storeProduct(row,variants,assignments,salesCount=0){
 const names=word=>assignments.filter(item=>item.category_name.toLowerCase().includes(word)).map(item=>item.subcategory_name);
 const sizes=variants.map(v=>v.ml+' ml'),defaultVariant=sizes.includes('50 ml')?'50 ml':sizes[0];
 const first=variants.find(v=>v.ml+' ml'===defaultVariant)||variants[0];
 return {id:'product-'+row.id,databaseId:row.id,name:row.name,description:row.description||'',created_at:row.created_at,salesCount,assignments,
 categoryIds:[...new Set(assignments.map(item=>item.category_id))],subcategoryIds:[...new Set(assignments.map(item=>item.subcategory_id))],subcategoryNames:assignments.map(item=>item.subcategory_name),
 genderNames:names('gender'),scentNames:names('notes'),occasionNames:names('occasion'),collection:names('gender').join(' / '),scent:names('notes').join(' / '),occasion:names('occasion').join(' / '),
 is_bestseller:!!row.is_bestseller,badge:row.is_bestseller?'Bestseller':'',price:first?.price||0,defaultVariant,variants:sizes,images:first?.photos||[],available:variants.some(v=>v.stock>0),
 variantPrices:Object.fromEntries(variants.map(v=>[v.ml+' ml',v.price])),variantMrps:Object.fromEntries(variants.map(v=>[v.ml+' ml',v.mrp])),variantPhotos:Object.fromEntries(variants.map(v=>[v.ml+' ml',v.photos])),variantStock:Object.fromEntries(variants.map(v=>[v.ml+' ml',v.stock])),content:Object.fromEntries(contentFields.map(key=>[key,row[key]||''])),notes:[row.top_notes,row.middle_notes,row.base_notes].filter(Boolean)};
}
