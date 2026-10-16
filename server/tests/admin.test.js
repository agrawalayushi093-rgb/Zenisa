import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {id,validateRecord,listParams} from '../validation.js';
import {hashPassword,verifyPassword,makeToken,session,checkOrigin} from '../auth.js';
import {config} from '../config.js';

test('rejects invalid IDs and malformed category fields',()=>{
  for(const value of [0,-1,'1 OR 1=1',1.5])assert.throws(()=>id(value));
  const valid={name:' Floral ',slug:'floral',is_active:true};
  assert.equal(validateRecord(valid).name,'Floral');
  for(const change of [{name:'a'},{slug:'bad--slug'},{is_active:'true'},{description:'x'.repeat(2001)}])assert.throws(()=>validateRecord({...valid,...change}));
  assert.throws(()=>validateRecord(valid,true));
  assert.equal(validateRecord({...valid,category_id:2},true).category_id,2);
});
test('limits pagination and ignores unsupported status filters',()=>{
  assert.deepEqual(listParams({page:'-5',limit:'999',status:'anything'}),{page:1,limit:50,offset:0,search:'',status:''});
});
test('password hashing rejects incorrect passwords and malformed hashes',()=>{
  const hash=hashPassword('test password only');
  assert.equal(verifyPassword('test password only',hash),true);
  assert.equal(verifyPassword('incorrect',hash),false);
  assert.equal(verifyPassword('test','malformed'),false);
});
test('sessions reject tampering, expiry and different administrators',()=>{
  const saved={...config};
  Object.assign(config,{adminEmail:'test@example.invalid',adminPasswordHash:'test',sessionSecret:'a'.repeat(48)});
  try{
    const read=token=>session({headers:{cookie:`zenisa_admin=${token}`}});
    const token=makeToken();
    assert.equal(read(token).email,config.adminEmail);
    assert.equal(read(token+'tampered'),null);
    for(const data of [{email:config.adminEmail,exp:0},{email:'other@example.invalid',exp:Date.now()+10000}]){
      const payload=Buffer.from(JSON.stringify(data)).toString('base64url');
      const signature=createHmac('sha256',config.sessionSecret).update(payload).digest('base64url');
      assert.equal(read(`${payload}.${signature}`),null);
    }
  }finally{Object.assign(config,saved)}
});
test('write requests require configured origin and JSON',()=>{
  let error;
  checkOrigin({method:'POST',headers:{origin:'https://untrusted.invalid'},is:()=>true},{},value=>{error=value});
  assert.equal(error.status,403);
  checkOrigin({method:'POST',headers:{origin:config.origin},is:()=>false},{},value=>{error=value});
  assert.equal(error.status,415);
});
