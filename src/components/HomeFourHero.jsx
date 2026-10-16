import {useEffect,useRef,useState} from 'react';
import {Link} from './SiteLink';
import {ArrowRight,ChevronLeft,ChevronRight} from 'lucide-react';
import {homeFourSlides} from '../data/homeFourHero';

export default function HomeFourHero(){
  const [index,setIndex]=useState(0),[keyboardFocus,setKeyboardFocus]=useState(false),[active,setActive]=useState(false),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const root=useRef(null),slide=homeFourSlides[index];
  useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
  useEffect(()=>{let visible=false;const sync=()=>setActive(visible&&!document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.1});observer.observe(root.current);document.addEventListener('visibilitychange',sync);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync)}},[]);
  useEffect(()=>{if(keyboardFocus||!active||reduced)return;const timer=setInterval(()=>setIndex(value=>(value+1)%homeFourSlides.length),5000);return()=>clearInterval(timer)},[keyboardFocus,active,reduced,index]);
  const move=step=>setIndex(value=>(value+step+homeFourSlides.length)%homeFourSlides.length);
  return <section ref={root} className={`l4-hero l4-slider l4-hero-${slide.id}`} aria-roledescription="carousel" aria-label="Featured Zenisa collections" style={{'--hero-image':`url("${slide.image}")`,'--hero-position':slide.position,'--hero-size':slide.size}} onFocusCapture={event=>{if(event.target.matches(':focus-visible'))setKeyboardFocus(true)}} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setKeyboardFocus(false)}}>
    <div className="l4-hero-shade"/>
    <button className="l4-hero-arrow l4-hero-previous" aria-label="Previous hero slide" onClick={()=>move(-1)}><ChevronLeft size={21}/></button>
    <div className="container"><div className="l4-hero-copy" role="group" aria-roledescription="slide" aria-label={`Slide ${index+1} of ${homeFourSlides.length}`}>
      {slide.kicker&&<p className="l4-kicker">{slide.kicker}</p>}<h1>{slide.title}<br/><em>{slide.accent}</em></h1>
      <p>{slide.description[0]}<br/>{slide.description[1]}</p>
      <Link className="l4-gold-button" to={slide.url}>{slide.cta}<ArrowRight size={18}/></Link>
      <div className="l4-hero-caption"><span>{slide.caption}</span></div>
    </div></div>
    <button className="l4-hero-arrow l4-hero-next" aria-label="Next hero slide" onClick={()=>move(1)}><ChevronRight size={21}/></button>
    <span className="l4-hero-side">AN INVITATION TO THE EXTRAORDINARY</span>
    <div className="l4-hero-pagination" role="group" aria-label="Choose hero slide">{homeFourSlides.map((item,i)=><button key={item.id} aria-label={`Show hero slide ${i+1}`} aria-pressed={i===index} onClick={()=>setIndex(i)}><span/></button>)}</div>
  </section>
}
