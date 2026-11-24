import test from 'node:test';
import assert from 'node:assert/strict';
import {validateVariants} from '../product-variants.js';
const variant=(ml,extra={})=>({ml,price:'350',mrp:'499',stock:'5',photos:[],...extra});
test('ML variants preserve independent prices, stock and photos',()=>{
 const result=validateVariants([variant(20),variant(50,{price:'750',mrp:'999',stock:'8'})]);
 assert.deepEqual(result.map(row=>[row.ml,row.price,row.mrp,row.stock]),[[20,350,499,5],[50,750,999,8]]);
});
test('reject duplicate sizes, invalid prices and unsupported photos',()=>{
 for(const rows of [[],[variant(20),variant('20')],[variant(0)],[variant(20,{price:600})],[variant(20,{stock:-1})],[variant(20,{photos:['https://example.com/a.png']})],[variant(20,{photos:['data:image/png;base64,YmFk']})]])assert.throws(()=>validateVariants(rows));
});
