export const defaultGeminiModel='gemini-3.5-flash-lite';
export function geminiRequest(instructions:string,source:unknown,schema:unknown,pdf?:string){
 const parts:Record<string,unknown>[]=[{text:JSON.stringify(source)}];
 if(pdf){
  const match=/^data:application\/pdf;base64,([A-Za-z0-9+/=]+)$/.exec(pdf);
  if(!match)throw Error('Invalid PDF data.');
  parts.push({inlineData:{mimeType:'application/pdf',data:match[1]}});
 }
 return {systemInstruction:{parts:[{text:instructions}]},contents:[{role:'user',parts}],generationConfig:{responseMimeType:'application/json',responseJsonSchema:schema,maxOutputTokens:6500}};
}
export function geminiText(data:unknown){
 const result=data as {promptFeedback?:{blockReason?:string},candidates?:{finishReason?:string;content?:{parts?:{text?:string;thought?:boolean}[]}}[]};
 if(result.promptFeedback?.blockReason)throw Error('Gemini could not process this source because it was blocked. Try a different document.');
 const candidate=result.candidates?.[0];
 if(candidate?.finishReason!=='STOP')throw Error(candidate?.finishReason==='MAX_TOKENS'?'Gemini reached its response limit. Try a smaller source.':'Gemini did not complete the analysis. Try a smaller or different source.');
 const output=candidate.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('');
 if(!output)throw Error('Gemini returned no analysis. Please retry.');
 return output;
}
export function classifyGeminiError(status:number,payload:unknown){
 const details=payload as {error?:{status?:string;details?:{reason?:string}[]}}|null;
 if(status===401||details?.error?.details?.some(d=>d.reason==='API_KEY_INVALID'))return {code:'invalid_api_key',error:'Google rejected the Gemini API key. Check the key in Google AI Studio.'};
 if(status===429)return {code:'quota_or_rate_limit',error:'Gemini has reached a rate or quota limit. Check this project’s usage and free-tier allowance in Google AI Studio before retrying.'};
 if(status===403)return {code:'access_denied',error:'The Gemini key lacks permission. Check the project, API enablement, key restrictions, and regional availability.'};
 if(status===404)return {code:'model_not_found',error:'The configured Gemini model is not available to this project. Check GEMINI_MODEL.'};
 if(status>=500)return {code:'provider_unavailable',error:'Gemini is temporarily unavailable. Try again shortly.'};
 return {code:'request_rejected',error:'Gemini rejected the request. Check model support, source size, and the project’s regional or billing requirements.'};
}
