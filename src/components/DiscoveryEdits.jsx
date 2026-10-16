import {Link} from './SiteLink';
import {ArrowRight,UserRound} from 'lucide-react';
import {celebrityEdits,brandEdits} from '../data/discoveryEdits';

export default function DiscoveryEdits({type}){
  const celebrities=type==='celebrities',items=celebrities?celebrityEdits:brandEdits;
  const title=celebrities?'Shop by Celebrities':'Shop by Brands';
  return <section className={`l4-discovery l4-section l4-discovery-${type}`} id={type} aria-labelledby={`${type}-title`}>
    <div className="container"><div className="l4-heading"><h2 id={`${type}-title`}>{title}</h2><p className="l4-section-copy">{celebrities?'Distinctive personalities. A world of signature scents.':'Explore a world of fragrance, one house at a time.'}</p></div>
    <div className="l4-discovery-grid">{items.map((item,i)=><article className="l4-discovery-card" key={item.id}>
      <div className="l4-discovery-art" aria-hidden="true">{celebrities?<><img src={item.image} alt="" loading="lazy"/><span className="l4-discovery-portrait"><UserRound strokeWidth={.65}/></span></>:<div className="l4-brand-emblem"><span>THE FRAGRANCE EDIT</span><strong>{item.monogram}</strong><span>IDENTITY COMING SOON</span></div>}<span className="l4-discovery-tag">{celebrities?'PORTRAIT PLACEHOLDER':'LOGO PLACEHOLDER'}</span></div>
      <div className="l4-discovery-copy"><span>THE {String(i+1).padStart(2,'0')} EDIT</span><h3>{item.name}</h3><p>{item.label}</p></div>
    </article>)}</div><div className="l4-discovery-more"><Link className="l4-discovery-button" to="/shop">Explore all fragrances <ArrowRight size={17}/></Link></div></div>
  </section>
}
