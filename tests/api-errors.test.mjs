import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyApiError} from '../lib/api-errors.ts';
test('distinguishes billing exhaustion from rate limiting at HTTP 429',()=>{
 assert.equal(classifyApiError(429,{error:{code:'insufficient_quota'}}).code,'insufficient_quota');
 assert.equal(classifyApiError(429,{error:{code:'rate_limit_exceeded'}}).code,'rate_limit_exceeded');
});
test('reports authentication and model access separately',()=>{
 assert.equal(classifyApiError(401,{}).code,'invalid_api_key');
 assert.equal(classifyApiError(404,{error:{code:'model_not_found'}}).code,'access_denied');
});
test('does not return raw provider errors or secret-like content',()=>{
 const result=classifyApiError(401,{error:{message:'invalid key: SECRET-SENTINEL'}});
 assert.ok(!JSON.stringify(result).includes('SECRET-SENTINEL'));
});
