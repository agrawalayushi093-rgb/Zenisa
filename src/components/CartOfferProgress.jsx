import {Gift,Check} from 'lucide-react';
import {matchesOfferProduct} from '../data/offerRules';
import {useStore} from '../context/Store';
import {useCommerce} from '../context/Commerce';
export default function CartOfferProgress(){
 const {cart}=useStore(),{settings}=useCommerce();if(!settings||!cart.length)return null;
 const offers=(settings.managedOffers||[]).filter(offer=>offer.is_active).map(offer=>{
  const quantity=cart.filter(row=>matchesOfferProduct(offer,row.product)&&(!offer.ml||row.variant===offer.ml+' ml')).reduce((sum,row)=>sum+row.quantity,0);
  return {id:'managed-'+offer.id,title:offer.title,quantity,needed:Math.max(Number(offer.minQuantity)||1,offer.type==='buy_get'?Number(offer.buyQuantity)+Number(offer.getQuantity):1),size:offer.ml?offer.ml+' ml':'',repeat:offer.repeat};
 });
 for(const [key,size,needed,title] of [['free50','50 ml',3,'Buy 2, Get 1 Free'],['bundle20','20 ml',4,'4 × 20ml for ₹999']]){
  const rule=settings[key];if(rule?.active)offers.push({id:key,title,size,needed,repeat:rule.repeat,quantity:cart.filter(row=>row.variant===size&&rule.productIds.includes(row.product.id)).reduce((sum,row)=>sum+row.quantity,0)});
 }
 const relevant=offers.filter(offer=>offer.quantity>0);if(!relevant.length)return null;
 return <section className="cart-offer-progress" aria-label="Active offers">{relevant.map(offer=>{const unlocked=offer.quantity>=offer.needed;const milestones=offer.repeat?[offer.needed,offer.needed*2]:[offer.needed];const maximum=milestones.at(-1);return <div className="cart-offer-step" key={offer.id}><p className="cart-offer-prompt">{unlocked?<><Check size={15}/> {offer.title} — requirement reached</>:<>Add <u>{offer.needed-offer.quantity} more {offer.size}</u> to unlock <b>{offer.title}</b></>}</p><div className="cart-milestone-bar"><div className="cart-offer-track" role="progressbar" aria-label={offer.title} aria-valuemin={0} aria-valuemax={maximum} aria-valuenow={Math.min(offer.quantity,maximum)}><span style={{width:Math.min(100,offer.quantity/maximum*100)+'%'}}/></div>{milestones.map((target,index)=><div className="cart-milestone" style={{left:target/maximum*100+'%'}} key={target}><span className={offer.quantity>=target?'reached':''}>{offer.quantity>=target?<Check size={19}/>:<Gift size={19}/>}</span><small>{index===0?offer.title:'2 × '+offer.title}<br/>{target} items</small></div>)}</div></div>})}</section>;
}
