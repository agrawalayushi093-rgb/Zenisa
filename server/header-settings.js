import postcss from 'postcss';
import {headerDefaults} from '../src/data/headerSettings.js';
import {HttpError} from './validation.js';
const fail=message=>{throw new HttpError(400,message)};
const text=(v,max)=>{if(typeof v!=='string'||v.length>max)fail('Header text is invalid or too long.');return v.trim()};
export function validateHeader(input){
 if(!input||typeof input!=='object'||Array.isArray(input))fail('Enter a valid header configuration object.');
 const value={};for(const key of ['logoText','logoSubtitle'])value[key]=text(input[key],100);
 for(const key of ['background','textColor','accentColor','tabsBackground','tabsTextColor']){if(!/^#[0-9a-f]{6}$/i.test(input[key]))fail('Choose valid header colours.');value[key]=input[key]}
 for(const [key,min,max] of [['logoWidth',60,300],['fontSize',12,24],['height',60,150]]){const n=Number(input[key]);if(!Number.isFinite(n)||n<min||n>max)fail('Header dimensions are outside the allowed range.');value[key]=n}
 if(!['Manrope','Lora','Arial','Georgia'].includes(input.font))fail('Choose an available font.');value.font=input.font;
 for(const key of ['showSearch','showCart','showTabs','showAnnouncement','includeCategories']){if(typeof input[key]!=='boolean')fail('Invalid visibility setting.');value[key]=input[key]}
 const url=(v,image=false)=>{v=text(v,1000);if(!v)return '';if(v.startsWith('/')&&!v.startsWith('//')&&!/[\\\s<>]/.test(v))return v;if(image){try{if(new URL(v).protocol==='https:')return v}catch{}}fail(image?'Logo image must use HTTPS or a local image path.':'Menu links must start with / and stay on this website.')};
 value.logoImage=url(input.logoImage,true);
 for(const key of ['links','tabs']){if(!Array.isArray(input[key])||input[key].length>16)fail('Use up to 16 menu links or tabs.');value[key]=input[key].map(row=>{const label=text(row.label,80);if(!label)fail('Every menu link needs a label.');return key==='links'?{label,url:url(row.url)||'/'}:{label,url:url(row.url),category:text(row.category||'',100)}})}
 if(!Array.isArray(input.announcements)||input.announcements.length>20)fail('Use up to 20 announcements.');value.announcements=input.announcements.map(v=>text(v,250)).filter(Boolean);
 value.css=text(input.css,30000);scopeHeaderCss(value.css);return value;
}
export function scopeHeaderCss(css){
 if(/url\s*\(|expression\s*\(|javascript:|<|>|\\|\/\*/i.test(css))fail('Header CSS supports styles only; use the logo image setting for images.');
 let root;try{root=postcss.parse(css)}catch{fail('CSS syntax is invalid. Check brackets and declarations.')}
 root.walkAtRules(rule=>{if(!['media','supports'].includes(rule.name.toLowerCase()))fail('Only @media and @supports are supported in header CSS.')});
 root.walkRules(rule=>{if(rule.parent.type!=='root'&&rule.parent.type!=='atrule')fail('Use complete CSS selectors instead of nested rules.');rule.selectors=rule.selectors.map(selector=>':where(.zenisa-header-shell) '+selector)});
 return root.toString();
}
export const defaultHeader=()=>structuredClone(headerDefaults);
