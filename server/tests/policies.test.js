import test from 'node:test';
import assert from 'node:assert/strict';
import {cleanPolicy,policyDefinition} from '../policy-content.js';
test('policy formatting survives sanitization',()=>{assert.equal(cleanPolicy('<h2>Delivery</h2><p><strong>Terms</strong></p><ul><li>Item</li></ul>'),'<h2>Delivery</h2><p><strong>Terms</strong></p><ul><li>Item</li></ul>')});
test('unsafe HTML, handlers and links are removed',()=>{const html=cleanPolicy('<script>alert(1)</script><p onclick="evil()">Text<img src=x onerror="evil()"></p><a href="javascript:alert(1)">Click</a><iframe src="x"></iframe>');assert.equal(html,'<p>Text</p><a>Click</a>')});
test('only five policy slugs are accepted and long text is preserved',()=>{assert.throws(()=>policyDefinition('../privacy'));assert.equal(policyDefinition('privacy').title,'Privacy Policy');assert.equal(cleanPolicy('x'.repeat(20000)).length,20000);assert.throws(()=>cleanPolicy({}))});

test('images, tables and safe font formatting survive while dangerous styles are removed',()=>{const html=cleanPolicy('<figure class="image"><img src="/api/store/policy-images/12345678-1234-1234-1234-123456789abc.png" onerror="evil()"></figure><table><tbody><tr><td>Cell</td></tr></tbody></table><span style="color:#ff0000;font-size:20px;background-image:url(https://bad.example)">Text</span>');assert.match(html,/<img src=/);assert.match(html,/<table>/);assert.match(html,/font-size:20px/);assert.doesNotMatch(html,/onerror|background-image/)});
