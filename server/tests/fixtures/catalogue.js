export const products=[
 ['royal-oud','Royal Oud','Men','Woody','Date Night','#3b2415','Bestseller'],
 ['bloom-essence','Bloom Essence','Women','Floral','Wedding Wear','#bd7b70','Bestseller'],
 ['mystic-noir','Mystic Noir','Unisex','Amber & Spicy','Party Wear','#173b27','New'],
 ['golden-desire','Golden Desire','Women','Sweet & Vanilla','Office Wear','#bb8c35','New'],
 ['aqua-elite','Aqua Elite','Men','Aquatic','Gym Wear','#286b68','Bestseller'],
 ['citrus-muse','Citrus Muse','Unisex','Fresh & Citrus','Everyday Wear','#75914d','New'],
 ['signature-duo','Signature Duo','Gift Sets','Woody','Wedding Wear','#342b20','New'],
 ['velvet-rose','Velvet Rose','Women','Floral','Date Night','#893e48','New'],
 ['desert-musk','Desert Musk','Unisex','Woody','Office Wear','#bb8c35','New'],
 ['midnight-bloom','Midnight Bloom','Women','Amber & Spicy','Party Wear','#893e48','New'],
 ['cedar-mystique','Cedar Mystique','Men','Woody','Everyday Wear','#173b27','New']
].map(([id,name,collection,scent,occasion,color,badge],i)=>({id,name,collection,scent,occasion,color,badge,price:i===6?2299:1299,variants:i===6?['50 ml','100 ml']:['20 ml','50 ml','100 ml'],notes:[scent,'Soft aromatic heart','Warm musk base'],description:'A sample fragrance concept with an expressive opening and a beautifully balanced finish. Product name, notes, sizes and prices are placeholders awaiting the official Zenisa catalogue.'}));
products.unshift({id:'azz-the-most-loved',name:'AZZ The Most Loved',collection:'Men',scent:'Amber & Spicy',occasion:'Date Night',color:'#a26a23',badge:'Bestseller',price:750,variantPrices:{'20 ml':350,'50 ml':750},variantMrps:{'20 ml':499,'50 ml':999},variants:['20 ml','50 ml'],images:[2,1,7,3,4,5,6].map(number=>'/images/'+number+'.png'),notes:['Cardamom, toffee, bergamot','Toffee, amber, cinnamon','Amberwood, musk, woody notes'],description:'AZZ The Most Loved — Cardamom, Caramel, Woody Amber. Product imagery supplied by Zenisa. Available in 20 ml and 50 ml.'});
