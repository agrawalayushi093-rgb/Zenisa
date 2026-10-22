import {Link} from 'react-router-dom';

const pages={
 'shipping-policy':['Shipping Policy','Official shipping regions, rates and delivery timelines are awaiting confirmation. Please contact Zenisa for shipping information before placing an enquiry.'],
 'return-exchange-policy':['Return & Exchange Policy','Zenisa’s return and exchange eligibility, timelines and process will be published here once confirmed. Contact the team with your product enquiry.'],
 'refund-policy':['Refund Policy','Official refund terms and processing timelines are awaiting confirmation. Please contact Zenisa for assistance.'],
 'track-order':['Track Order','Online order tracking is not connected yet. Please contact Zenisa with your order reference for assistance.'],
 'blogs':['Blogs','Fragrance stories, guides and new discoveries are coming soon.']
};
export default function FooterInformation({page}){if(page==='faqs')return <main className="container section policy"><h1>Frequently Asked Questions</h1>{[['How do I make an enquiry?','Choose your perfume and size, add it to your bag, then continue to the enquiry checkout.'],['Can I pay online?','Online payments are not available. Checkout prepares an order enquiry.'],['Where can I find shipping and returns details?','Contact Zenisa for confirmed delivery, return and exchange terms.']].map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</main>;const [title,copy]=pages[page];return <main className="container section policy"><p className="eyebrow">ZENISA PERFUMES</p><h1>{title}</h1><p>{copy}</p><Link className="button" to="/contact">Contact Us</Link></main>}
