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
import {collections,occasions,scents} from '../data/products';

function Title({kicker,title,text}){return <div className="l4-heading">{kicker&&<p className="l4-kicker">{kicker}</p>}<h2>{title}</h2>{text&&<p className="l4-section-copy">{text}</p>}</div>}
export default function HomeFour(){return <main className="home-four"><HomeFourHero/><BestTen/><OfferSlider/>
    <section className="container l4-section" id="collections"><Title title="Shop by Collection" text="A fragrance wardrobe, as individual as you are."/><div className="l4-collection-grid">{collections.map((name,i)=><Link className="l4-collection" key={name} to={`/collections/${encodeURIComponent(name)}`}><span className="l4-collection-photo" style={{backgroundPosition:`${i*100/3}% center`}}/><span className="l4-collection-index">0{i+1} / THE COLLECTION</span><div><p>{['DISTINCTIVE. CONFIDENT. YOURS.','GRACE IN EVERY NOTE.','BEYOND EVERY EXPECTATION.','THOUGHTFULLY GIVEN.'][i]}</p><h3>{name}</h3><span>Explore the collection <ArrowUpRight size={20}/></span></div></Link>)}</div></section>
    <SampleKitBanner/>
    <section className="container l4-section" id="scents"><Title title="Shop by Fragrance Notes" text="Find a fragrance that feels like you."/><div className="l4-scent-grid">{scents.map((name,i)=><Link key={name} to={`/shop?scent=${encodeURIComponent(name)}`}><span className="l4-scent-image" style={{backgroundPosition:`${i*20}% center`}}/><div className="scent-card-caption"><h3>{name}</h3><p>{["Bright, clean and uplifting","Elegant, romantic and graceful","Smooth, comforting and sophisticated","Warm, sensual and expressive","Soft, cosy and beautifully sweet","Cool, breezy and refreshing"][i]}</p><span>Explore <ArrowRight size={14}/></span></div></Link>)}</div></section>

    <AllProductsSlider/>
    <section className="l4-occasion-section" id="occasions"><div className="container l4-section"><Title title="Shop by Occasion" text="Find the perfect fragrance for every moment."/><div className="l4-occasion-grid">{occasions.map((occasion,i)=><Link className={`l4-occasion l4-occasion-${i}`} key={occasion} to={`/shop?occasion=${encodeURIComponent(occasion)}`}><span className="l4-occasion-image" style={{backgroundPosition:`${i*20}% center`}}/><div><small>THE {['DAILY','WORKDAY','ENERGY','AFTER DARK','CELEBRATION','FOREVER'][i]} EDIT</small><h3>{['Everyday Wear','Office Wear','Gym Wear','Date Night','Party Wear','Wedding Wear'][i]}</h3><p>{['Quiet moments. Beautiful beginnings.','A little confidence, beautifully worn.','Fresh energy. Your own rhythm.','Leave a little mystery behind.','A presence that lights up the room.','For a day you will always remember.'][i]}</p><span className="l4-occasion-arrow"><ArrowUpRight size={19}/></span></div></Link>)}</div></div></section>


    <section className="container l4-section l4-why"><Title kicker="THE DETAILS MAKE THE DIFFERENCE" title="Why Choose Zenisa"/><div className="l4-benefit-grid">{[[Droplets,'Thoughtful compositions','Expressive fragrance concepts for every side of you.'],[Leaf,'A world of notes','Fresh, floral and warm accords to explore.'],[Heart,'Personally yours','Discover the fragrance that feels like your signature.'],[Gift,'Beautifully considered','A little luxury for you, or someone you love.']].map(([Icon,title,copy])=><div key={title}><span><Icon size={29}/></span><h3>{title}</h3><p>{copy}</p></div>)}</div><p className="l4-fine-print">Editable sample brand benefits · Awaiting official Zenisa product information</p></section>
    <GoogleReviews/>
    <InstagramGallery/>
  </main>}

export function HomeFourFooter(){return <PremiumFooter/>}
