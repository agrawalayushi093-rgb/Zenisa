import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import ProductCard from './ProductCard';

export default function LuxuryCarousel({id,title,kicker,items,url='/shop'}){
  return <section className="l4-dark-section l4-static-showcase" id={id}><div className="container"><div className="l4-heading l4-carousel-heading"><div><p className="l4-kicker">{kicker}</p><h2>{title}</h2></div></div><div className="l4-product-grid" aria-label={`${title} products`}>{items.map(product=><div className="l4-slide" key={product.id}><ProductCard product={product}/></div>)}</div><div className="l4-carousel-bottom"><Link className="l4-outline-button" to={url}>View More <ArrowRight size={17}/></Link><small>Sample fragrance collection</small></div></div></section>;
}
