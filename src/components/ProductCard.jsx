import {Link} from 'react-router-dom';
import {Heart} from 'lucide-react';
import Bottle from './Bottle';
import {useStore} from '../context/Store';
import {money} from '../data/products';
export default function ProductCard({product:p}){const {add,wishlist,toggle}=useStore();return <article className="product-card"><div className="product-image"><span className="badge">{p.badge}</span><button className="wish icon-button" aria-label={`Wishlist ${p.name}`} aria-pressed={wishlist.includes(p.id)} onClick={()=>toggle(p.id)}><Heart size={18} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button><Link to={`/product/${p.id}`}><Bottle color={p.color} name={p.name}/></Link></div><div className="product-info"><small>{p.collection} · Eau de parfum · Sample</small><Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link><div className="product-bottom"><span>{money(p.price)} <small>/ 50 ml</small></span><button aria-label={`Add ${p.name} to cart`} onClick={()=>add(p)}>Add to Cart</button></div></div></article>}
