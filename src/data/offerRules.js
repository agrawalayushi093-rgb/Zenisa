export const offerScope=offer=>offer.scope||(offer.productIds?.length?'selected':'all');
export function matchesOfferProduct(offer,product){
 const scope=offerScope(offer),productId=product.id??product.productId;
 if(scope==='selected')return (offer.productIds||[]).includes(productId);
 if(!/^product-[1-9][0-9]*$/.test(productId||''))return false;
 if(scope==='categories')return (offer.categoryIds||[]).some(id=>(product.categoryIds||[]).includes(Number(id)));
 if(scope==='subcategories')return (offer.subcategoryIds||[]).some(id=>(product.subcategoryIds||[]).includes(Number(id)));
 return scope==='all';
}
export function offerInDateRange(offer,now=new Date()){
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 return (!offer.startDate||offer.startDate<=today)&&(!offer.endDate||offer.endDate>=today);
}
