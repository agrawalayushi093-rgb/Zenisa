import Category from './pages/Category';
import Faqs from './pages/Faqs';
import PolicyPage from './pages/PolicyPage';
import FooterInformation from './pages/FooterInformation';
import {homepageOnly} from './data/siteMode';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers';
import {CommerceProvider} from './context/Commerce';
import './styles/checkout.css';
import AdminApp from './admin/AdminApp';
import {HomeFourFooter} from './pages/HomeFour';
import {useEffect,useRef} from 'react';
import {Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfferPopup from './components/OfferPopup';
import Home from './pages/HomePreview';
import Shop,{Collections} from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import {About,Contact,Policy,NotFound} from './pages/Information';
import {StoreProvider} from './context/Store';
function RouteEffects(){
  const location=useLocation(),previous=useRef(null);
  useEffect(()=>{
    document.title=`${location.pathname==='/'?'The House of Luxury Aromas':['/collections','/category'].includes(location.pathname)?'Category':location.pathname.split('/')[1].replace(/^./,c=>c.toUpperCase())} | ZENISA PERFUMES`;
    const first=previous.current===null,changedPage=previous.current!==location.pathname;
    previous.current=location.pathname;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frame=requestAnimationFrame(()=>{
      let target=null;try{target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null}catch{}
      const headerHeight=Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zenisa-header-height'))||88;
      const top=target?Math.max(0,target.getBoundingClientRect().top+window.scrollY-headerHeight-16):0;
      window.scrollTo({top,left:0,behavior:first||changedPage||reduced?'instant':'smooth'});
    });
    return()=>cancelAnimationFrame(frame);
  },[location.pathname,location.hash,location.key]);
  return null;
}

export default function App(){const location=useLocation();if(location.pathname==='/admin'||location.pathname.startsWith('/admin/'))return <AdminApp/>;return <MotionConfig reducedMotion="user"><CommerceProvider><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a><RouteEffects/><Navbar/><div id="main-content" data-original-images={location.pathname==='/'?'true':undefined}><Routes><Route path="/" element={<Home/>}/>{/* Secondary pages are temporarily disabled for homepage review; source is preserved. */}{!homepageOnly&&<><Route path="/shop" element={<Shop/>}/><Route path="/category" element={<Category/>}/><Route path="/collections" element={<Navigate to={'/category'+location.search} replace/>}/><Route path="/collections/:collection" element={<Shop/>}/><Route path="/product/:id" element={<ProductDetails key={location.pathname}/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/offers" element={<Offers/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/>{['track-order','blogs'].map(page=><Route key={page} path={'/'+page} element={<FooterInformation page={page}/>}/>)}{['shipping-policy','return-exchange-policy','refund-policy'].map(slug=><Route key={slug} path={'/'+slug} element={<PolicyPage slug={slug}/>}/>)}<Route path="/faqs" element={<Faqs/>}/><Route path="/privacy" element={<PolicyPage slug="privacy"/>}/><Route path="/terms" element={<PolicyPage slug="terms"/>}/></>}<Route path="*" element={homepageOnly?<Navigate to="/" replace/>:<NotFound/>}/></Routes></div>{location.pathname==='/'?<HomeFourFooter/>:<Footer/>}{!homepageOnly&&<OfferPopup/>}</StoreProvider></CommerceProvider></MotionConfig>}
