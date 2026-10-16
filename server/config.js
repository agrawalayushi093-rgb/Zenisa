import dotenv from 'dotenv';
import {fileURLToPath} from 'node:url';
dotenv.config({path:fileURLToPath(new URL('./.env',import.meta.url)),quiet:true});
export const config={port:Number(process.env.API_PORT||3001),host:process.env.API_HOST||'127.0.0.1',origin:process.env.ADMIN_ORIGIN||'http://127.0.0.1:5173',production:process.env.NODE_ENV==='production',adminEmail:(process.env.ADMIN_EMAIL||'').toLowerCase(),adminPasswordHash:process.env.ADMIN_PASSWORD_HASH||'',sessionSecret:process.env.SESSION_SECRET||'',db:{host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3307),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'zenisa_perfumes'}};
