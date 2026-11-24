import {Instagram} from 'lucide-react';
import {useCommerce} from '../context/Commerce';
import './FloatingSocialLinks.css';
export default function FloatingSocialLinks(){
 const {settings}=useCommerce();
 const phone=settings?.whatsappNumber||'919589138699';
 const instagram=import.meta.env.VITE_INSTAGRAM_URL||settings?.instagramUrl||'https://www.instagram.com/zenisa_perfumes/';
 return <nav className="zenisa-floating-socials" aria-label="Connect with Zenisa">
 {instagram?<a className="zenisa-social-instagram" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Zenisa on Instagram" title="Instagram"><Instagram size={28}/></a>:<button className="zenisa-social-instagram" type="button" aria-label="Instagram — profile link coming soon" aria-disabled="true" title="Instagram profile link coming soon"><Instagram size={28}/></button>}
 <a className="zenisa-social-whatsapp" href={'https://wa.me/'+phone} target="_blank" rel="noopener noreferrer" aria-label="Chat with Zenisa on WhatsApp" title="Chat on WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.95L.02 24l6.27-1.64a11.93 11.93 0 0 0 5.75 1.47h.01C18.63 23.83 24 18.48 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.46 9.88-9.95 9.88Zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61l.45-.52c.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></a>
 </nav>;
}
