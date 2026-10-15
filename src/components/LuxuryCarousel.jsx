import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import ProductCard from './ProductCard';

export default function LuxuryCarousel({id,title,kicker,items,url='/shop'}){
  return <section className="l3-dark-section l3-static-showcase" id={id}><div className="container"><div className="l3-heading l3-carousel-heading"><div><p className="l3-kicker">{kicker}</p><h2>{title}</h2></div></div><div className="l3-product-grid" aria-label={`${title} products`}>{items.map(product=><div className="l3-slide" key={product.id}><ProductCard product={product}/></div>)}</div><div className="l3-carousel-bottom"><Link className="l3-outline-button" to={url}>View More <ArrowRight size={17}/></Link><small>Sample fragrance collection</small></div></div></section>;
}
