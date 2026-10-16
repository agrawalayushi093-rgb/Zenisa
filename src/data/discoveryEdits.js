// Design placeholders only. Replace with approved people/brands and catalogue mappings.
// No celebrity endorsement or relationship with a fragrance brand is implied.
export const celebrityEdits = Array.from({length:4},(_,i)=>({
  id:`celebrity-${i+1}`,name:`Celebrity ${String(i+1).padStart(2,'0')}`,
  image:'/images/placeholders/category.svg',label:'Portrait & selection coming soon'
}));
export const brandEdits = Array.from({length:4},(_,i)=>({
  id:`brand-${i+1}`,name:`Brand ${String(i+1).padStart(2,'0')}`,
  monogram:String(i+1).padStart(2,'0'),label:'Brand & selection coming soon'
}));
