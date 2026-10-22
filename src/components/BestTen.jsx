import {Link} from './SiteLink';
import Bottle from './Bottle';
import {products} from '../data/products';

export default function BestTen(){return <section className="best-ten" id="best-ten" aria-labelledby="best-ten-title"><div className="best-ten-inner"><h2 id="best-ten-title">10 Best-Selling Fragrances</h2><p className="best-ten-note">Sample selection · Official sales rankings pending</p><ol>{products.slice(0,10).map((product,index)=><li key={product.id}><Link to={`/product/${product.id}`}><span className="best-ten-rank">{index+1}</span><span className="best-ten-image"><Bottle name={product.name}/></span><span className="best-ten-copy"><strong>{product.name} - Eau de Parfum | ZENISA</strong><small><span aria-hidden="true">ϟ</span> {product.collection} · {product.scent} · Sample selection</small></span></Link></li>)}</ol></div></section>}
