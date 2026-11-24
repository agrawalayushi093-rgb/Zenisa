import {useLayoutEffect,useRef} from 'react';
export default function ProductTitle({children}){
 const ref=useRef(null);
 useLayoutEffect(()=>{const title=ref.current;if(!title)return;let lastWidth=0,alive=true;
 const fit=()=>{if(!alive)return;const width=title.clientWidth;if(!width)return;title.style.fontSize='28px';const textWidth=title.scrollWidth;title.style.fontSize=Math.min(28,28*width/textWidth*.99)+'px'};
 const observer=new ResizeObserver(()=>{const width=title.clientWidth;if(width!==lastWidth){lastWidth=width;fit()}});observer.observe(title);fit();document.fonts?.ready.then(fit);return()=>{alive=false;observer.disconnect()};
 },[children]);
 return <h1 ref={ref} className="pdp-product-title">{children}</h1>;
}
