import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContact} from '../contact-routes.js';
test('contact input preserves message and trims customer details',()=>{const data=validateContact({name:' Customer ',email:'customer@example.com',phone:'+91 9876543210',subject:'Question',message:'Hello\nProduct question'});assert.equal(data.name,'Customer');assert.equal(data.message,'Hello\nProduct question')});
test('contact input rejects missing and malformed fields',()=>{for(const data of [{},{name:'Customer',email:'invalid',message:'Hello'},{name:'Customer',email:'a@b.com',message:' '},{name:'Customer',email:'a@b.com',message:'x'.repeat(5001)},{name:'Customer',email:'a@b.com',message:{}}])assert.throws(()=>validateContact(data))});
