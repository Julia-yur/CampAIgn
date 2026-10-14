import { env } from 'cloudflare:workers';
export function GET(){return Response.json({connected:Boolean((env as unknown as Record<string,string>).OPENAI_API_KEY)},{headers:{'Cache-Control':'no-store'}})}
