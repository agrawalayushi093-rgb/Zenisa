import test from 'node:test';
import assert from 'node:assert/strict';
import {validateFaq} from '../faq-content.js';
test('FAQ validation trims questions and preserves answer paragraphs',()=>assert.deepEqual(validateFaq({question:' Question? ',answer:' First paragraph.\n\nSecond paragraph. '}),{question:'Question?',answer:'First paragraph.\n\nSecond paragraph.'}));
test('FAQ validation rejects blank, malformed and oversized content',()=>{for(const body of [null,{}, {question:'  ',answer:'Answer'},{question:'Question',answer:''},{question:'a'.repeat(501),answer:'Answer'},{question:'Question',answer:'a'.repeat(10001)}])assert.throws(()=>validateFaq(body))});
