import type { Metadata } from 'next';
import './globals.css';
import './landing-responsive.css';
import './landing-social.css';
export const metadata:Metadata={title:'CampAIgn — Evidence into direction',description:'A thoughtful workspace for grounded campaign strategy.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
