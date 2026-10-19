import {Link} from './SiteLink';
import {ArrowRight,Gift,Droplets} from 'lucide-react';
import {useCommerce} from '../context/Commerce';

export default function HomeOfferBanner({number,carousel=false}){
  const {settings,error}=useCommerce(),first=number===1,key=first?'free50':'bundle20';
  const rule=settings?.[key],active=rule?.active&&rule.productIds.length>0;
  return <section className={`l4-offer-banner l4-offer-banner-${number}`} id={`exclusive-offer-${number}`} aria-labelledby={`offer-${number}-title`}>
    <div className="container l4-offer-banner-inner"><div className="l4-offer-banner-copy"><p className="l4-kicker">EXCLUSIVE OFFER {carousel?'01':String(number).padStart(2,'0')} · {active?'THE ZENISA PRIVILEGES':'OFFER PREVIEW'}</p><h2 id={`offer-${number}-title`}>{first?<>Buy 2 × 50ml,<br/><em>Get 1 Free.</em></>:<>Your discovery set.<br/><em>4 × 20ml for ₹999.</em></>}</h2>
      <p>{first?'Choose three eligible 50ml fragrances. The lowest-priced eligible bottle is free.':'Mix and match four eligible 20ml fragrances in one beautifully priced bundle.'}</p>
      {active?<small>{rule.repeat?'Applies to every complete eligible bundle.':'One eligible bundle per cart.'} {settings.combineOffers?'Both size offers can apply together.':'Best single offer applies; offers cannot combine.'} Savings are calculated in your bag.</small>:<small>{error?'Offer availability is temporarily unavailable.':settings?'Not active yet · Eligible perfumes and offer rules await confirmation.':'Checking offer availability…'}</small>}
      <Link className="l4-gold-button" to={active?`/offers#${key}`:'/offers'}>{active?'Explore eligible perfumes':'Preview the offers'}<ArrowRight size={18}/></Link>
    </div><div className="l4-offer-banner-art" aria-hidden="true"><span className="l4-offer-art-ring"/>{first?<Gift strokeWidth={.75}/>:<Droplets strokeWidth={.75}/>}<span className="l4-offer-art-size">{first?'50':'20'}<small>ML</small></span><span className="l4-offer-art-caption">{first?'BEAUTIFULLY SHARED':'THE DISCOVERY COLLECTION'}</span></div></div>
  </section>
}
