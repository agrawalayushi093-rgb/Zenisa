import {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useCatalogue} from '../context/Catalogue';
import {searchProducts} from '../data/productSearch';
import {money,priceFor} from '../data/products';
export default function SearchResults({query,onClose}){
 const {products,loading,error,refresh}=useCatalogue(),results=useMemo(()=>searchProducts(products,query,8),[products,query]);
 if(!query.trim())return <p className="search-results-hint">Start typing a perfume name, fragrance note or occasion.</p>;
 if(loading&&!products.length)return <p className="search-results-hint" role="status">Loading perfumes…</p>;
 if(error)return <div className="search-results-hint" role="alert"><p>{error}</p><button onClick={refresh}>Try again</button></div>;
 return <section className="search-live-results" aria-label="Matching perfumes"><p className="search-results-count" role="status">{results.length?results.length+' matching perfume'+(results.length>1?'s':''):'No matching perfumes. Try another spelling or fragrance note.'}</p>{results.map(product=>{const variant=product.defaultVariant||product.variants[0],image=product.variantPhotos?.[variant]?.[0]||product.images?.[0];return <Link className="search-result-card" key={product.id} to={'/product/'+product.id} onClick={onClose}><img src={image||'/images/placeholders/product.svg'} alt={product.name} loading="lazy"/><div><h3>{product.name}</h3><p>{variant}{product.collection?' · '+product.collection:''}</p><strong>{money(priceFor(product,variant))}</strong>{!product.available&&<small>Out of stock</small>}</div><ArrowUpRight size={18}/></Link>})}</section>
}
