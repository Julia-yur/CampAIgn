import test from 'node:test';
import assert from 'node:assert/strict';
import {geminiRequest,geminiText,classifyGeminiError} from '../lib/gemini.ts';
test('sends PDF inline and requests structured JSON',()=>{const r=geminiRequest('audit',{text:'source'},{type:'object'},'data:application/pdf;base64,JVBERi0=');assert.equal(r.contents[0].parts[1].inlineData.data,'JVBERi0=');assert.equal(r.generationConfig.responseMimeType,'application/json');assert.equal(r.systemInstruction.parts[0].text,'audit')});
test('rejects non-PDF input',()=>assert.throws(()=>geminiRequest('',{},{},'data:text/html;base64,YQ==')));
test('extracts only completed answer text, never thinking',()=>assert.equal(geminiText({candidates:[{finishReason:'STOP',content:{parts:[{thought:true,text:'private reasoning'},{text:'{"audit":"ok"}'}]}}]}),'{"audit":"ok"}'));
test('rejects blocked and truncated responses',()=>{assert.throws(()=>geminiText({promptFeedback:{blockReason:'SAFETY'}}));assert.throws(()=>geminiText({candidates:[{finishReason:'MAX_TOKENS'}]}))});
test('classifies Google errors without exposing raw provider text',()=>{assert.equal(classifyGeminiError(400,{error:{details:[{reason:'API_KEY_INVALID'}],message:'SECRET'}}).code,'invalid_api_key');assert.equal(classifyGeminiError(429,{}).code,'quota_or_rate_limit');assert.equal(classifyGeminiError(404,{}).code,'model_not_found');assert.ok(!JSON.stringify(classifyGeminiError(400,{error:{message:'SECRET'}})).includes('SECRET'))});
