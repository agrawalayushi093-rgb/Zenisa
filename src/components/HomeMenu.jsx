import {useEffect,useRef,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {ChevronDown,Check} from 'lucide-react';
import {homePreviews,defaultHomePreview} from '../data/homePreviews';

export default function HomeMenu({onNavigate}){
  const [open,setOpen]=useState(false);
  const root=useRef(null),trigger=useRef(null);
  const location=useLocation();
  const selected=new URLSearchParams(location.search).get('home')||defaultHomePreview.id;
  useEffect(()=>{setOpen(false)},[location.pathname,location.search]);
  useEffect(()=>{
    if(!open)return;
    const outside=event=>{if(!root.current?.contains(event.target))setOpen(false)};
    const key=event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setOpen(false);trigger.current?.focus()}};
    document.addEventListener('pointerdown',outside);
    root.current?.addEventListener('keydown',key);
    const element=root.current;
    return()=>{document.removeEventListener('pointerdown',outside);element?.removeEventListener('keydown',key)};
  },[open]);
  return <div className="nav-home-menu" ref={root} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false)}}>
    <button className="nav-home-trigger" ref={trigger} aria-expanded={open} aria-label="Home designs" onClick={()=>setOpen(value=>!value)}>Home <ChevronDown size={14} className={open?'rotated':''}/></button>
    {open&&<div className="nav-home-options" aria-label="Homepage designs">{homePreviews.filter(home=>home.showInMenu!==false).map((home,index)=>home.available?<Link key={home.id} to={`/?home=${home.id}`} aria-current={location.pathname==='/'&&selected===home.id?'page':undefined} onClick={()=>{setOpen(false);onNavigate?.()}}><span><strong>Home {index+1}</strong><small>{home.label.split(' — ')[1]}</small></span>{selected===home.id&&<Check size={16}/>}</Link>:<button key={home.id} disabled><span><strong>Home {index+1}</strong><small>Coming soon</small></span></button>)}</div>}
  </div>;
}
