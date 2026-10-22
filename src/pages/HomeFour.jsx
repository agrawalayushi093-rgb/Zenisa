import HomeGender from '../components/HomeGender';
import HomeDatabaseCategories,{useHomeCategories} from '../components/HomeDatabaseCategories';
import PremiumFooter from '../components/PremiumFooter';
import AllProductsSlider from '../components/AllProductsSlider';
import BestTen from '../components/BestTen';
import InstagramGallery from '../components/InstagramGallery';
import OfferSlider from '../components/OfferSlider';
import SampleKitBanner from '../components/SampleKitBanner';
import GoogleReviews from '../components/GoogleReviews';
import HomeFourHero from '../components/HomeFourHero';
import {useState} from 'react';
import {Link} from '../components/SiteLink';
import {ArrowRight,ArrowUpRight,Droplets,Leaf,Gift,Heart,Instagram,Mail,MessageCircle,Facebook,Youtube} from 'lucide-react';

function Title({kicker,title,text}){return <div className="l4-heading">{kicker&&<p className="l4-kicker">{kicker}</p>}<h2>{title}</h2>{text&&<p className="l4-section-copy">{text}</p>}</div>}
export default function HomeFour(){const homeCategories=useHomeCategories();return <main className="home-four"><HomeFourHero/><BestTen/><OfferSlider/>
    <HomeGender state={homeCategories}/>
    <SampleKitBanner/>
    <HomeDatabaseCategories kind="notes" state={homeCategories}/>

    <AllProductsSlider/>
    <HomeDatabaseCategories kind="occasion" state={homeCategories}/>


    <section className="container l4-section l4-why"><Title kicker="THE DETAILS MAKE THE DIFFERENCE" title="Why Choose Zenisa"/><div className="l4-benefit-grid">{[[Droplets,'Thoughtful compositions','Expressive fragrance concepts for every side of you.'],[Leaf,'A world of notes','Fresh, floral and warm accords to explore.'],[Heart,'Personally yours','Discover the fragrance that feels like your signature.'],[Gift,'Beautifully considered','A little luxury for you, or someone you love.']].map(([Icon,title,copy])=><div key={title}><span><Icon size={29}/></span><h3>{title}</h3><p>{copy}</p></div>)}</div><p className="l4-fine-print">Editable sample brand benefits · Awaiting official Zenisa product information</p></section>
    <GoogleReviews/>
    <InstagramGallery/>
  </main>}

export function HomeFourFooter(){return <PremiumFooter/>}
