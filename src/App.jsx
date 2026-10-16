import {homepageOnly} from './data/siteMode';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers';
import {CommerceProvider} from './context/Commerce';
import './styles/checkout.css';
import AdminApp from './admin/AdminApp';
import {HomeFourFooter} from './pages/HomeFour';
import {useEffect} from 'react';
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
function RouteEffects(){const location=useLocation();useEffect(()=>{document.title=`${location.pathname==='/'?'The House of Luxury Aromas':location.pathname.split('/')[1].replace(/^./,c=>c.toUpperCase())} | ZENISA PERFUMES`;if(location.hash){const timer=setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}),100);return()=>clearTimeout(timer)}else window.scrollTo({top:0,left:0,behavior:'instant'})},[location.pathname,location.hash]);return null}
export default function App(){const location=useLocation();if(location.pathname==='/admin'||location.pathname.startsWith('/admin/'))return <AdminApp/>;return <MotionConfig reducedMotion="user"><CommerceProvider><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a><RouteEffects/><Navbar/><div id="main-content" data-original-images={location.pathname==='/'?'true':undefined}><Routes><Route path="/" element={<Home/>}/>{/* Secondary pages are temporarily disabled for homepage review; source is preserved. */}{!homepageOnly&&<><Route path="/shop" element={<Shop/>}/><Route path="/collections" element={<Collections/>}/><Route path="/collections/:collection" element={<Shop/>}/><Route path="/product/:id" element={<ProductDetails key={location.pathname}/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/offers" element={<Offers/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Policy type="privacy"/>}/><Route path="/terms" element={<Policy type="terms"/>}/></>}<Route path="*" element={homepageOnly?<Navigate to="/" replace/>:<NotFound/>}/></Routes></div>{location.pathname==='/'?<HomeFourFooter/>:<Footer/>}{!homepageOnly&&<OfferPopup/>}</StoreProvider></CommerceProvider></MotionConfig>}
