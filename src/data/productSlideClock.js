const listeners=new Set();let phase=0,timer=null;
export function subscribeProductSlides(listener){listeners.add(listener);if(timer===null)timer=setInterval(()=>{phase=1-phase;for(const callback of listeners)callback()},3000);return()=>{listeners.delete(listener);if(!listeners.size){clearInterval(timer);timer=null}}}
export const productSlideSnapshot=()=>phase;
export const inactiveProductSlide=()=>0;
export const subscribeInactiveProductSlide=()=>()=>{};
