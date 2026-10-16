import HomeFour from '../pages/HomeFour';
import Home from '../pages/Home';
import HomeTwo from '../pages/HomeTwo';
import HomeThree from '../pages/HomeThree';

// Add each new homepage component here and enable its entry when ready.
export const homePreviews = [
  { id: 'home-1', label: 'Home 1 — Luxury Collection', available: false, component: Home },
  { id: 'home-2', label: 'Home 2 — Signature Storefront', available: false, component: HomeTwo },
  { id: 'home-3', label: 'Home 3 — Emerald Atelier', available: false, component: HomeThree },
  { id: 'home-4', label: 'Home 4 — Emerald Atelier Copy', available: true, showInMenu: false, component: HomeFour },
];
export const defaultHomePreview = homePreviews.find(home=>home.id==='home-4');
