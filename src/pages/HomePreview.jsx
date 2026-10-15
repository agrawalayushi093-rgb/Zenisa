import {useSearchParams} from 'react-router-dom';
import {homePreviews,defaultHomePreview} from '../data/homePreviews';
export default function HomePreview(){const [params]=useSearchParams();const selected=homePreviews.find(home=>home.id===params.get('home')&&home.available)||defaultHomePreview;const Page=selected.component;return <Page key={selected.id}/>}
