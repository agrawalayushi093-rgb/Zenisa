import {useRef} from 'react';
import {ChevronLeft,ChevronRight,ArrowRight} from 'lucide-react';
import ProductCard from './ProductCard';
import {products} from '../data/products';
import {Link} from './SiteLink';

export default function AllProductsSlider(){
  const track=useRef(null);
  const move=direction=>{const element=track.current;if(element)element.scrollBy({left:direction*element.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
  return <section id="all-products" className="l4-dark-section l4-static-showcase all-products-slider"><div className="container"><div className="l4-heading"><h2>All Products</h2></div><div className="all-products-frame"><button className="all-products-arrow previous" aria-label="Previous products" onClick={()=>move(-1)}><ChevronLeft/></button><div ref={track} className="all-products-track" role="region" aria-label="All perfumes" tabIndex={0}>{products.map(product=><ProductCard key={product.id} product={product} editorial/>)}</div><button className="all-products-arrow next" aria-label="Next products" onClick={()=>move(1)}><ChevronRight/></button></div><div className="l4-carousel-bottom"><Link className="l4-outline-button" to="/shop">View All Products <ArrowRight size={17}/></Link></div></div></section>
}
