import {createContext,useContext,useEffect,useCallback,useState} from 'react';
import {storeRequest} from './Commerce';
const Catalogue=createContext();
export function CatalogueProvider({children}){
 const [state,setState]=useState({products:[],categories:[],subcategories:[],loading:true,loaded:false,error:''}),[revision,setRevision]=useState(0);
 const refresh=useCallback(()=>setRevision(value=>value+1),[]);
 useEffect(()=>{const controller=new AbortController();setState(old=>({...old,loading:true,error:''}));storeRequest('/products',{signal:controller.signal}).then(result=>{if(!controller.signal.aborted)setState({products:result.data,categories:result.categories||[],subcategories:result.subcategories||[],loading:false,loaded:true,error:''})}).catch(error=>{if(error.name!=='AbortError')setState(old=>({...old,loading:false,error:error.message}))});return()=>controller.abort()},[revision]);
 useEffect(()=>{window.addEventListener('focus',refresh);return()=>window.removeEventListener('focus',refresh)},[refresh]);
 return <Catalogue.Provider value={{...state,refresh}}>{children}</Catalogue.Provider>
}
export const useCatalogue=()=>useContext(Catalogue);
