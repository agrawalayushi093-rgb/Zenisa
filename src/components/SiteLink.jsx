import {Link as RouterLink} from 'react-router-dom';
import {homepageOnly} from '../data/siteMode';

// Preserve link labels and their styling while secondary page navigation is paused.
export function Link({to,children,onClick,...props}){
  const path=typeof to==='string'?to:to?.pathname||'/';
  const allowed=path.startsWith('#')||path.split(/[?#]/)[0]==='/';
  if(homepageOnly&&!allowed)return <a {...props} role="link" aria-disabled="true" tabIndex={-1} data-preview-disabled="true" onClick={event=>event.preventDefault()}>{children}</a>;
  return <RouterLink {...props} to={to} onClick={onClick}>{children}</RouterLink>;
}
