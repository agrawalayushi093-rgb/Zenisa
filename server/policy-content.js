import sanitizeHtml from 'sanitize-html';
import {policyPages} from '../src/data/policies.js';
import {HttpError} from './validation.js';
export function policyDefinition(slug){const page=policyPages.find(page=>page.slug===slug);if(!page)throw new HttpError(404,'Policy page not found.');return page}
export function cleanPolicy(html){
 if(typeof html!=='string')throw new HttpError(400,'Policy content must be HTML text.');
 return sanitizeHtml(html,{
  allowedTags:['p','br','h2','h3','h4','strong','b','em','i','u','s','span','ul','ol','li','blockquote','a','figure','figcaption','img','table','thead','tbody','tfoot','tr','td','th','colgroup','col','hr','pre','code','sup','sub'],
  allowedAttributes:{'*':['style'],a:['href','title'],img:['src','alt','width','height'],figure:['class'],table:['class'],ol:['start','reversed','type'],li:['value'],td:['colspan','rowspan'],th:['colspan','rowspan'],col:['width'],pre:['class'],code:['class']},
  allowedClasses:{figure:['image','table','image_resized','image-style-align-left','image-style-align-right','image-style-align-center','image-style-side','image-style-block-align-left','image-style-block-align-right'],table:['table'],pre:[/^language-[a-z0-9-]+$/],code:[/^language-[a-z0-9-]+$/]},
  allowedStyles:{'*':{'color':[/^#[a-f0-9]{3,8}$/i,/^(rgb|hsl)a?\([\d\s.,%/]+\)$/i,/^(black|white|red|blue|green|transparent)$/i],'background-color':[/^#[a-f0-9]{3,8}$/i,/^(rgb|hsl)a?\([\d\s.,%/]+\)$/i,/^(black|white|red|blue|green|transparent)$/i],'font-family':[/^[a-z\s,'"-]+$/i],'font-size':[/^\d+(\.\d+)?(px|em|rem|%)$/],'text-align':[/^(left|right|center|justify)$/],'width':[/^\d+(\.\d+)?(px|%)$/],'height':[/^\d+(\.\d+)?(px|%)$/],'margin-left':[/^\d+(\.\d+)?(px|em|%)$/],'padding':[/^\d+(\.\d+)?px$/],'border-width':[/^\d+(\.\d+)?px$/],'border-style':[/^(solid|dashed|dotted|double|none)$/],'border-color':[/^#[a-f0-9]{3,8}$/i,/^(rgb|hsl)a?\([\d\s.,%/]+\)$/i],'list-style-type':[/^(disc|circle|square|decimal|lower-alpha|upper-alpha|lower-roman|upper-roman)$/]}},
  allowedSchemes:['http','https','mailto','tel'],allowedSchemesByTag:{img:['https']},allowProtocolRelative:false,
  transformTags:{div:'p'},exclusiveFilter:frame=>frame.tag==='img'&&!(/^\/api\/store\/policy-images\/[a-f0-9-]{36}\.(png|jpg|webp|gif)$/.test(frame.attribs.src||'')||/^https:\/\//i.test(frame.attribs.src||''))
 }).trim()
}
