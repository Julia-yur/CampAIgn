import { env } from 'cloudflare:workers';
export function GET(){const configured=Boolean((env as unknown as Record<string,string>).GEMINI_API_KEY);return Response.json({provider:'gemini',connected:configured,configured,verified:false,code:configured?'key_configured':'missing_api_key'},{headers:{'Cache-Control':'no-store'}})}
