import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAssignments,checkAssignments} from '../product-categories.js';
test('supports multiple categories and multiple children within one category',()=>{assert.deepEqual(validateAssignments({assignments:[{category_id:'1',subcategory_id:'2'},{category_id:'1',subcategory_id:'3'},{category_id:'4',subcategory_id:'5'}]}),[{category_id:1,subcategory_id:2},{category_id:1,subcategory_id:3},{category_id:4,subcategory_id:5}]);assert.equal(validateAssignments({category_id:1,subcategory_id:2}).length,1)});
test('rejects missing, duplicate and invalid assignments',()=>{for(const assignments of [[],[{}],[{category_id:1,subcategory_id:2},{category_id:1,subcategory_id:2}],[{category_id:0,subcategory_id:2}]])assert.throws(()=>validateAssignments({assignments}))});
test('checks each subcategory belongs to the selected parent',async()=>{await assert.rejects(()=>checkAssignments({execute:async()=>[[]]},[{category_id:1,subcategory_id:2}]));let checked=0;await checkAssignments({execute:async()=>{checked++;return [[{id:2}]]}},[{category_id:1,subcategory_id:2},{category_id:3,subcategory_id:4}]);assert.equal(checked,2)});
