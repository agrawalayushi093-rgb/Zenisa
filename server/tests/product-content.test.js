import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProductContent} from '../product-content.js';
test('product content preserves notes, mood text and optional policy override',()=>{
 const content=validateProductContent({top_notes:' Bergamot ',mood:'Date Night',mood_description:'Evening wear\nSpecial occasions',delivery_returns:'',ingredients:'Alcohol, perfume'});
 assert.equal(content.top_notes,'Bergamot');assert.equal(content.mood_description,'Evening wear\nSpecial occasions');assert.equal(content.delivery_returns,'');assert.equal(content.ingredients,'Alcohol, perfume');
});
test('malformed product content is rejected',()=>{assert.throws(()=>validateProductContent({mood_description:{}}));assert.throws(()=>validateProductContent({top_notes:'x'.repeat(20001)}))});
