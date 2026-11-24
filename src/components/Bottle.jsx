import {useCatalogue} from '../context/Catalogue';
export default function Bottle({name='Zenisa',hero=false}){const {products}=useCatalogue();const product=products.find(item=>item.name===name);return <img className={`product-photo ${hero?'hero-bottle':''}`} src={product?.images?.[0]||'/images/placeholders/product.svg'} alt={name} loading="lazy" decoding="async"/>}
