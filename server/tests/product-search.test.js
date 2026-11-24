import test from 'node:test';
import assert from 'node:assert/strict';
import {searchProducts} from '../../src/data/productSearch.js';
const products=[{id:'product-1',name:'AZZ The Most Loved',subcategoryNames:['Men','Amber & Spicy'],variants:['20 ml']},{id:'product-2',name:'Rose Garden',subcategoryNames:['Women','Floral'],variants:['50 ml']}];
test('search finds names, partial words, notes and minor spelling mistakes',()=>{for(const query of ['AZZ','az','most lovd','loved','amber','spciy'])assert.equal(searchProducts(products,query)[0]?.id,'product-1');assert.equal(searchProducts(products,'floral')[0].id,'product-2');assert.equal(searchProducts(products,'rose')[0].id,'product-2')});
test('empty and unrelated searches do not invent results; limits are respected',()=>{assert.deepEqual(searchProducts(products,''),[]);assert.deepEqual(searchProducts(products,'unrelatedxyz'),[]);assert.equal(searchProducts(products,'perfume',1).length,1);assert.equal(searchProducts(products,'men').length,1)});
