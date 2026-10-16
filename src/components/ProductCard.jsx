import {homepageOnly} from '../data/siteMode';
import {Link} from './SiteLink';
import {Heart} from 'lucide-react';
import Bottle from './Bottle';
import {useStore} from '../context/Store';
import {money,priceFor} from '../data/products';
export default function ProductCard({product:p,variant='50 ml'}){const {add,wishlist,toggle}=useStore();return <article className="product-card"><div className="product-image"><span className="badge">{p.badge}</span><button className="wish icon-button" aria-label={`Wishlist ${p.name}`} aria-pressed={wishlist.includes(p.id)} onClick={()=>toggle(p.id)}><Heart size={18} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button><Link to={`/product/${p.id}?size=${encodeURIComponent(variant)}`}><Bottle color={p.color} name={p.name}/></Link></div><div className="product-info"><small>{p.collection} · Eau de parfum · Sample</small><Link to={`/product/${p.id}?size=${encodeURIComponent(variant)}`}><h3>{p.name}</h3></Link><div className="product-bottom"><span>{money(priceFor(p,variant))} <small>/ {variant}</small></span><button aria-label={`Add ${p.name} to cart`} disabled={homepageOnly} onClick={()=>add(p,variant)}>Add to Cart</button></div></div></article>}
