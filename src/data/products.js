export const collections=['Men','Women','Unisex','Gift Sets'];
export const occasions=['Everyday Wear','Office Wear','Gym Wear','Date Night','Party Wear','Wedding Wear'];
export const scents=['Fresh & Citrus','Floral','Woody','Amber & Spicy','Sweet & Vanilla','Aquatic'];
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
].map(([id,name,collection,scent,occasion,color,badge],i)=>({id,name,collection,scent,occasion,color,badge,price:i===6?2299:1299,variants:['50 ml','100 ml'],notes:[scent,'Soft aromatic heart','Warm musk base'],description:'A sample fragrance concept with an expressive opening and a beautifully balanced finish. Product name, notes, sizes and prices are placeholders awaiting the official Zenisa catalogue.'}));
export const priceFor=(p,v)=>p.price+(v==='100 ml'?700:0);
export const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const siteConfig={whatsappNumber:'',announcement:['Free Sample on Select Orders · Sample Offer','PAN India Shipping · Sample Service','Discover Your Signature Fragrance','Explore the Zenisa Gifting Edit','A Scent for Every Occasion'],offer:{title:'Exclusive Zenisa Offer',headline:'Your next signature, beautifully paired.',description:'Explore a curated fragrance pairing. This is a sample promotion; pricing and availability will be confirmed by Zenisa.'}};
export const photo=(id)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;
export const occasionPhotos=['photo-1442512595331-e89e73853f31','photo-1497366811353-6870744d04b2','photo-1534438327276-14e5300c3a48','photo-1511795409834-ef04bbd61622','photo-1519671482749-fd09be7ccebf','photo-1519741497674-611481863552'];
export const scentPhotos=['photo-1519996529931-28324d1a630e','photo-1490750967868-88aa4486c946','photo-1510798831971-661eb04b3739','photo-1608571423902-eed4a5ad8108','photo-1464305795204-6f5bbfc7fb81','photo-1507525428034-b723cf961d3e'];
