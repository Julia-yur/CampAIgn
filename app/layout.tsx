import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Trace — Evidence into direction',description:'A thoughtful workspace for grounded campaign strategy.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
