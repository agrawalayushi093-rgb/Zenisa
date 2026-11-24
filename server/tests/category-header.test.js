import test from 'node:test';
import assert from 'node:assert/strict';
import {validateRecord} from '../validation.js';
import {headerCategories,categorySectionId,categorySectionLink} from '../../src/data/categoryNavigation.js';
const record={name:'Category',slug:'category',description:'',is_active:true};
test('category header flag accepts booleans, defaults off and rejects malformed values',()=>{assert.equal(validateRecord(record).show_in_header,false);assert.equal(validateRecord({...record,show_in_header:true}).show_in_header,true);assert.throws(()=>validateRecord({...record,show_in_header:'yes'}))});
test('each enabled category links to its own slug-based section',()=>{const categories=[{id:1,slug:'gender',show_in_header:true},{id:2,slug:'new-edit',show_in_header:true},{id:3,slug:'hidden',show_in_header:false}];assert.deepEqual(headerCategories(categories).map(row=>row.id),[1,2]);for(const category of categories)assert.equal(categorySectionLink(category),'/category#'+categorySectionId(category));assert.notEqual(categorySectionId(categories[0]),categorySectionId(categories[1]))});
