import {Link} from 'react-router-dom';
import {useCommerce} from '../context/Commerce';
import {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import HomeOfferBanner from './HomeOfferBanner';

export default function OfferSlider(){
  const {settings}=useCommerce();const banners=(settings?.managedOffers||[]).filter(offer=>offer.is_active&&offer.image_url);const count=banners.length||2;
  const [index,setIndex]=useState(0),[paused,setPaused]=useState(false);
  useEffect(()=>{if(count<2||paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setInterval(()=>setIndex(value=>(value+1)%count),3000);return()=>clearInterval(timer)},[paused,count]);
  useEffect(()=>setIndex(0),[count]);
  return <div className="zenisa-offer-slider" role="region" aria-roledescription="carousel" aria-label="Exclusive offers" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}}><div className="offer-slide-stack">{Array.from({length:count},(_,value)=>{const src=banners[value]?.image_url?(banners[value].image_url.includes('?')?`${banners[value].image_url}&cb=2`:`${banners[value].image_url}?cb=2`):'';return <div key={value} className={`offer-slide-frame ${index===value?'is-current':''}`} aria-hidden={index!==value} inert={index!==value}>{banners.length?<Link className="managed-home-offer" to={'/offers/offer-'+banners[value].id}><img src={src} alt={banners[value].title} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=banners[value].title?.toLowerCase().includes('discovery')?'/images/zenisa-gifting-black-cap-v1.jpg':'/images/zenisa-hero-gifting-pair-v2.jpg'}}/><span className="managed-offer-cta">Choose Your Perfumes <ChevronRight size={18}/></span></Link>:<HomeOfferBanner number={value+1} carousel/>}</div>})}</div>{count>1&&<div className="offer-slider-controls"><button aria-label="Previous offer" onClick={()=>setIndex(value=>(value+count-1)%count)}><ChevronLeft size={19}/></button>{Array.from({length:count},(_,value)=><button key={value} className="offer-slider-dot" aria-label={`Show offer ${value+1}`} aria-pressed={index===value} onClick={()=>setIndex(value)}/>)}<button aria-label="Next offer" onClick={()=>setIndex(value=>(value+1)%count)}><ChevronRight size={19}/></button></div>}</div>
}
