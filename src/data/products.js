export const collections=['Men','Women','Unisex','Gift Sets'];
export const occasions=['Everyday Wear','Office Wear','Gym Wear','Date Night','Party Wear','Wedding Wear'];
export const scents=['Fresh & Citrus','Floral','Woody','Amber & Spicy','Sweet & Vanilla','Aquatic'];
// Product records are loaded from the database through CatalogueProvider.
export const products=[];
export const priceFor=(p,v)=>p.variantPrices?.[v]??(v==='20 ml'?499:p.price+(v==='100 ml'?700:0));
export const mrpFor=(p,v)=>p.variantMrps?.[v]??null;
export const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
export const siteConfig={whatsappNumber:'',announcement:['Free Sample on Select Orders · Sample Offer','PAN India Shipping · Sample Service','Discover Your Signature Fragrance','Explore the Zenisa Gifting Edit','A Scent for Every Occasion'],offer:{title:'Exclusive Zenisa Offer',headline:'Your next signature, beautifully paired.',description:'Explore a curated fragrance pairing. This is a sample promotion; pricing and availability will be confirmed by Zenisa.'}};
export const photo=(id)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;
export const occasionPhotos=['photo-1442512595331-e89e73853f31','photo-1497366811353-6870744d04b2','photo-1534438327276-14e5300c3a48','photo-1511795409834-ef04bbd61622','photo-1519671482749-fd09be7ccebf','photo-1519741497674-611481863552'];
export const scentPhotos=['photo-1519996529931-28324d1a630e','photo-1490750967868-88aa4486c946','photo-1510798831971-661eb04b3739','photo-1608571423902-eed4a5ad8108','photo-1464305795204-6f5bbfc7fb81','photo-1507525428034-b723cf961d3e'];

export const discountFor=(p,v)=>{const mrp=Number(mrpFor(p,v)),price=Number(priceFor(p,v));return mrp>price&&price>=0?Math.round((mrp-price)/mrp*100):0};
