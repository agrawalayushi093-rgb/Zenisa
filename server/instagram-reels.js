import {HttpError} from './validation.js';
export function validateInstagramReel(body){
 let parsed;try{parsed=new URL(body?.url)}catch{throw new HttpError(400,'Enter a valid Instagram Reel link.')}
 const match=parsed.pathname.match(/^\/reel\/([A-Za-z0-9_-]{5,80})\/?$/);
 if(parsed.protocol!=='https:'||!['instagram.com','www.instagram.com','m.instagram.com'].includes(parsed.hostname)||parsed.username||parsed.password||parsed.port||!match)throw new HttpError(400,'Use an Instagram Reel URL such as https://www.instagram.com/reel/REEL_CODE/.');
 const title=typeof body.title==='string'?body.title.trim():'';if([...title].length>150)throw new HttpError(400,'Reel title must be 150 characters or fewer.');
 if(typeof body.is_active!=='boolean')throw new HttpError(400,'Choose active or inactive.');const sort_order=Number(body.sort_order??0);if(!Number.isInteger(sort_order)||sort_order<0||sort_order>100000)throw new HttpError(400,'Enter a display order between 0 and 100,000.');
 return {title,url:'https://www.instagram.com/reel/'+match[1]+'/',shortcode:match[1],is_active:body.is_active,sort_order};
}
export const instagramReelSchema=`CREATE TABLE IF NOT EXISTS instagram_reels (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,title VARCHAR(150) NOT NULL DEFAULT '',url VARCHAR(500) NOT NULL,shortcode VARCHAR(80) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,is_active TINYINT(1) NOT NULL DEFAULT 1,sort_order INT UNSIGNED NOT NULL DEFAULT 0,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,UNIQUE KEY uq_instagram_shortcode (shortcode),INDEX idx_reels_active_order (is_active,sort_order,id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
