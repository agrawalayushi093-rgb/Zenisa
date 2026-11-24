export const categorySectionId=category=>'category-section-'+category.slug;
export const categorySectionLink=category=>'/category#'+categorySectionId(category);
export const headerCategories=categories=>(categories||[]).filter(category=>category.show_in_header===true);
