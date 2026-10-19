import {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import HomeOfferBanner from './HomeOfferBanner';

export default function OfferSlider(){
  const [index,setIndex]=useState(0),[paused,setPaused]=useState(false);
  useEffect(()=>{if(paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setInterval(()=>setIndex(value=>1-value),3000);return()=>clearInterval(timer)},[paused]);
  return <div className="zenisa-offer-slider" role="region" aria-roledescription="carousel" aria-label="Exclusive offers" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}}><div className="offer-slide-stack">{[0,1].map(value=><div key={value} className={`offer-slide-frame ${index===value?'is-current':''}`} aria-hidden={index!==value} inert={index!==value}><HomeOfferBanner number={value+1} carousel/></div>)}</div><div className="offer-slider-controls"><button aria-label="Previous offer" onClick={()=>setIndex(value=>1-value)}><ChevronLeft size={19}/></button>{[0,1].map(value=><button key={value} className="offer-slider-dot" aria-label={`Show offer ${value+1}`} aria-pressed={index===value} onClick={()=>setIndex(value)}/>)}<button aria-label="Next offer" onClick={()=>setIndex(value=>1-value)}><ChevronRight size={19}/></button></div></div>
}
