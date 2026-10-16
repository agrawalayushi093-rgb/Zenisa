import {randomBytes,scryptSync,timingSafeEqual,createHmac} from 'node:crypto';
import {config} from './config.js';
import {HttpError} from './validation.js';
const COOKIE='zenisa_admin';
export const hashPassword=password=>{const salt=randomBytes(16).toString('hex');return `scrypt:${salt}:${scryptSync(password,salt,64).toString('hex')}`};
export function verifyPassword(password,encoded){try{const [scheme,salt,hash]=encoded.split(':');if(scheme!=='scrypt'||!salt||!/^[a-f0-9]{128}$/.test(hash))return false;return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(hash,'hex'))}catch{return false}}
export const configured=()=>!!(config.adminEmail&&config.adminPasswordHash&&config.sessionSecret.length>=32);
function sign(payload){return createHmac('sha256',config.sessionSecret).update(payload).digest('base64url')}
export function makeToken(){const payload=Buffer.from(JSON.stringify({email:config.adminEmail,exp:Date.now()+8*60*60*1000,nonce:randomBytes(12).toString('hex')})).toString('base64url');return `${payload}.${sign(payload)}`}
export function session(req){if(!configured())return null;try{const cookie=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith(`${COOKIE}=`));if(!cookie)return null;const token=cookie.slice(COOKIE.length+1);const [payload,signature]=token.split('.');if(!payload||!signature)return null;const expected=sign(payload);if(signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return null;const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.exp>Date.now()&&data.email===config.adminEmail?{email:data.email}:null}catch{return null}}
export function setSession(res){res.cookie(COOKIE,makeToken(),{httpOnly:true,sameSite:'strict',secure:config.production,path:'/api/admin',maxAge:8*60*60*1000})}
export function clearSession(res){res.clearCookie(COOKIE,{httpOnly:true,sameSite:'strict',secure:config.production,path:'/api/admin'})}
export function requireAdmin(req,res,next){const user=session(req);if(!user)return next(new HttpError(401,'Please sign in to continue.'));req.admin=user;next()}
export function checkOrigin(req,res,next){if(['GET','HEAD','OPTIONS'].includes(req.method))return next();if(req.headers.origin!==config.origin)return next(new HttpError(403,'Request origin is not allowed.'));if(!req.is('application/json'))return next(new HttpError(415,'Send JSON requests only.'));next()}
const attempts=new Map();
export function loginRateLimit(req,res,next){const key=req.ip,now=Date.now();for(const [k,value] of attempts){if(value.until<now)attempts.delete(k)}const record=attempts.get(key)||{count:0,until:now+15*60*1000};record.count++;attempts.set(key,record);if(record.count>10)return next(new HttpError(429,'Too many sign-in attempts. Try again in 15 minutes.'));next()}
