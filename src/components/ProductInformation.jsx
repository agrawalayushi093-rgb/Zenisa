import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
export default function ProductInformation({product}){
 const content=product.content||{},[policies,setPolicies]=useState([]);
 useEffect(()=>{const controller=new AbortController();setPolicies([]);if(!content.delivery_returns)Promise.all(['shipping-policy','return-exchange-policy'].map(async slug=>{try{const response=await fetch('/api/store/policies/'+slug,{signal:controller.signal,cache:'no-store'});if(!response.ok)return null;return (await response.json()).page}catch{return null}})).then(rows=>{if(!controller.signal.aborted)setPolicies(rows.filter(Boolean))});return()=>controller.abort()},[content.delivery_returns]);
 const notes=[['Top Notes',content.top_notes],['Middle Notes',content.middle_notes],['Base Notes',content.base_notes]].filter(([,value])=>value);
 const info=[['Ingredients',content.ingredients],['Manufacturer',content.manufacturer],['Country of origin',content.country_of_origin]].filter(([,value])=>value);
 return <div className="pdp-accordions">
 {product.description&&product.description!=='Apparel perfume by Zenisa. Available in 50 ml and 20 ml.'&&<details open><summary>Description</summary><p style={{whiteSpace:'pre-wrap'}}>{product.description}</p></details>}
 <details><summary>Fragrance Notes</summary>{notes.length?notes.map(([label,value])=><p key={label} style={{whiteSpace:'pre-wrap'}}><strong>{label}: </strong>{value}</p>):<p>{product.notes?.join(' · ')||'Fragrance notes will be added soon.'}</p>}</details>
 <details><summary>Mood &amp; Moments</summary><p style={{whiteSpace:'pre-wrap'}}>{content.mood_description||'Mood & moments details will be added soon.'}</p></details>
 <details><summary>Delivery &amp; Returns</summary>{content.delivery_returns?<p style={{whiteSpace:'pre-wrap'}}>{content.delivery_returns}</p>:<>{policies.map((policy,index)=><div key={index} className="policy-rich-content" dangerouslySetInnerHTML={{__html:policy.content_html}}/>)}<p><Link to="/shipping-policy">Shipping Policy</Link> · <Link to="/return-exchange-policy">Return &amp; Exchange Policy</Link></p></>}</details>
 <details><summary>Product Information</summary>{info.map(([label,value])=><p key={label} style={{whiteSpace:'pre-wrap'}}><strong>{label}: </strong>{value}</p>)}{content.product_information&&<p style={{whiteSpace:'pre-wrap'}}>{content.product_information}</p>}{!info.length&&!content.product_information&&<p>Product information will be added soon.</p>}</details>
 </div>
}
