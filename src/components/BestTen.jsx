import {Link} from './SiteLink';
import Bottle from './Bottle';
import {useCatalogue} from '../context/Catalogue';
import CatalogueStatus from './CatalogueStatus';

export default function BestTen(){const {products,loading,error}=useCatalogue();const selected=products.filter(product=>product.is_bestseller);if(!loading&&!error&&!selected.length)return null;return <section className="best-ten" id="best-ten" aria-labelledby="best-ten-title"><div className="best-ten-inner"><h2 id="best-ten-title">10 Best-Selling Fragrances</h2><p className="best-ten-note">Explore the Zenisa fragrance collection</p><CatalogueStatus/><ol>{selected.slice(0,10).map((product,index)=><li key={product.id}><Link to={`/product/${product.id}`}><span className="best-ten-rank">{index+1}</span><span className="best-ten-image"><img src={product.images?.[0]||'/images/placeholders/product.svg'} alt={product.name} loading="lazy"/></span><span className="best-ten-copy"><strong>{product.name} - Eau de Parfum | ZENISA</strong><small><span aria-hidden="true">ϟ</span> {product.collection} · {product.scent}</small></span></Link></li>)}</ol></div></section>}
