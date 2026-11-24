import {useState,useEffect} from 'react';
import {Layers3,GitBranch,CheckCircle2,RefreshCw,Power,Globe} from 'lucide-react';
import useAdminData from './useAdminData';
import {useAdmin} from './AdminApp';

export default function Dashboard(){
  const {api,notify}=useAdmin();
  const [revision,setRevision]=useState(0);
  const {data,loading,error}=useAdminData('/dashboard',revision);
  const [isLive,setIsLive]=useState(true);
  const [toggling,setToggling]=useState(false);
  const [statusLoaded,setStatusLoaded]=useState(false);

  useEffect(()=>{
    let alive=true;
    api('/site-status').then(res=>{
      if(alive){
        setIsLive(res.isLive!==false);
        setStatusLoaded(true);
      }
    }).catch(()=>{
      if(alive) setStatusLoaded(true);
    });
    return()=>{alive=false};
  },[api,revision]);

  async function toggleStatus(){
    setToggling(true);
    try{
      const nextStatus=!isLive;
      const res=await api('/site-status',{
        method:'PUT',
        body:JSON.stringify({isLive:nextStatus})
      });
      setIsLive(res.isLive);
      notify(res.isLive?'Store is now LIVE to visitors!':'Store is now in COMING SOON mode.');
    }catch(err){
      notify(err.message||'Failed to update store status');
    }finally{
      setToggling(false);
    }
  }

  const cards=[
    ['Total Categories',data?.categories.total,Layers3,'Your primary catalogue groups'],
    ['Active Categories',data?.categories.active,CheckCircle2,'Visible and available to organise'],
    ['Total Subcategories',data?.subcategories.total,GitBranch,'Organised under a parent category'],
    ['Active Subcategories',data?.subcategories.active,CheckCircle2,'Subcategories currently marked active']
  ];

  return <main className="admin-content">
    <div className="admin-page-heading">
      <div>
        <p className="admin-eyebrow">STORE OVERVIEW</p>
        <h1>Dashboard</h1>
        <p>A clear view of your catalogue and storefront visibility.</p>
      </div>
    </div>

    {statusLoaded && (
      <section className={`admin-status-banner ${isLive?'is-live':'is-coming-soon'}`}>
        <div className="admin-status-info">
          <div className="admin-status-indicator">
            <span className={`admin-status-dot ${isLive?'live':'coming-soon'}`}></span>
            <span className="admin-status-badge">{isLive?'STORE IS LIVE (ONLINE)':'COMING SOON MODE (MAINTENANCE)'}</span>
          </div>
          <h2>{isLive?'Public visitors see the full live storefront':'Public visitors see the Coming Soon landing page'}</h2>
          <p>
            {isLive
              ?'Customers can browse luxury perfumes, categories, and place orders.'
              :'The Coming Soon luxury launch page is active. Admins can still sign in and access the workspace.'}
          </p>
        </div>
        <button
          type="button"
          className={`admin-status-toggle-btn ${isLive?'disable':'enable'}`}
          disabled={toggling}
          onClick={toggleStatus}
        >
          <Power size={18}/>
          {toggling?'Updating…':(isLive?'Disable Live Site (Show Coming Soon)':'Enable Live Site (Go Live)')}
        </button>
      </section>
    )}

    {error&&<div className="admin-alert" role="alert">
      <div>
        <strong>Database connection needs attention</strong>
        <p>{error}</p>
      </div>
      <button className="admin-secondary" onClick={()=>setRevision(value=>value+1)}>
        <RefreshCw size={15}/> Retry
      </button>
    </div>}

    <div className="admin-stat-grid">
      {cards.map(([label,value,Icon,copy])=><article key={label} className="admin-stat">
        <div><span>{label}</span><Icon size={19}/></div>
        <strong>{loading?'…':value??'—'}</strong>
        <p>{copy}</p>
      </article>)}
    </div>
  </main>;
}
