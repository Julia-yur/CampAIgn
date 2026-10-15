export default function CampaignMark({size=20}:{size?:number}){
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M17 6.3a7.4 7.4 0 1 0 0 11.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
  <path d="M16.9 6.4 19.3 12l-2.4 5.6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="17" cy="6.3" r="1.45" fill="currentColor"/>
  <circle cx="19.3" cy="12" r="1.45" fill="currentColor"/>
  <circle cx="17" cy="17.7" r="1.45" fill="currentColor"/>
 </svg>
}
