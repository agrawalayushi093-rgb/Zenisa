import {HomeFourFooter} from './pages/HomeFour';
import {HomeThreeFooter} from './pages/HomeThree';
import {useEffect} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
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
export default function App(){const location=useLocation();return <MotionConfig reducedMotion="user"><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a><RouteEffects/><Navbar/><div id="main-content" data-original-images={location.pathname==='/'&&new URLSearchParams(location.search).get('home')==='home-4'?'true':undefined}><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/collections" element={<Collections/>}/><Route path="/collections/:collection" element={<Shop/>}/><Route path="/product/:id" element={<ProductDetails key={location.pathname}/>}/><Route path="/cart" element={<Cart/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Policy type="privacy"/>}/><Route path="/terms" element={<Policy type="terms"/>}/><Route path="*" element={<NotFound/>}/></Routes></div>{location.pathname==='/'&&new URLSearchParams(location.search).get('home')==='home-3'?<HomeThreeFooter/>:location.pathname==='/'&&new URLSearchParams(location.search).get('home')==='home-4'?<HomeFourFooter/>:<Footer/>}<OfferPopup/></StoreProvider></MotionConfig>}
