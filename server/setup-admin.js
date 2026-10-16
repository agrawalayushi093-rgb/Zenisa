import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {randomBytes,scryptSync} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const envPath=fileURLToPath(new URL('./.env',import.meta.url));
let content=existsSync(envPath)?readFileSync(envPath,'utf8'):readFileSync(new URL('./.env.example',import.meta.url),'utf8');
if(/^ADMIN_PASSWORD_HASH=.+$/m.test(content)){console.log('Admin credentials already exist. Existing configuration was preserved.');process.exit(0)}
const email='admin@zenisa.local';const password=randomBytes(18).toString('base64url');const salt=randomBytes(16).toString('hex');const passwordHash=`scrypt:${salt}:${scryptSync(password,salt,64).toString('hex')}`;
for(const [key,value] of Object.entries({ADMIN_EMAIL:email,ADMIN_PASSWORD_HASH:passwordHash,SESSION_SECRET:randomBytes(48).toString('hex')})){const line=new RegExp(`^${key}=.*$`,'m');content=line.test(content)?content.replace(line,`${key}=${value}`):`${content}\n${key}=${value}`}
writeFileSync(envPath,content,{mode:0o600});writeFileSync(new URL('./ADMIN-ACCESS.txt',import.meta.url),`Zenisa local admin login\nURL: http://127.0.0.1:5173/admin\nEmail: ${email}\nPassword: ${password}\n\nKeep this file private. It is ignored by Git. Credentials are configured locally, not inserted into MySQL.\n`,{mode:0o600});console.log('Local admin configured. Read server/ADMIN-ACCESS.txt for login details. No database records were created.');
