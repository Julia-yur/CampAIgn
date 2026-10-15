// Never forward provider messages: they can include credentials or source excerpts.
export function classifyApiError(status:number, payload:unknown){
 const data=payload as {error?:{code?:string;type?:string}}|null;
 const code=data?.error?.code;const type=data?.error?.type;
 if(status===401)return {code:'invalid_api_key',error:'OpenAI rejected the API key. Check that it is valid, active, and belongs to the intended project.'};
 if(code==='insufficient_quota'||type==='insufficient_quota'||code==='billing_hard_limit_reached')return {code:'insufficient_quota',error:'The API account has exhausted its credits or reached a spending limit. Check OpenAI API billing and project limits; retrying alone will not fix this.'};
 if(status===429)return {code:'rate_limit_exceeded',error:'OpenAI is rate limiting requests. Wait briefly before trying again.'};
 if(status===403||code==='model_not_found')return {code:'access_denied',error:'The API key does not have access to the selected model or project. Check its permissions and OPENAI_MODEL.'};
 if(status>=500)return {code:'provider_unavailable',error:'OpenAI is temporarily unavailable. Try again shortly.'};
 return {code:'request_rejected',error:'OpenAI rejected the analysis request. Check the document format, size, and configured model.'};
}
export const missingKey={code:'missing_api_key',error:'No API key is configured for this app. Add OPENAI_API_KEY to the local .env.local file and restart the local server. Connecting the Codex plugin alone does not configure this app.'};
