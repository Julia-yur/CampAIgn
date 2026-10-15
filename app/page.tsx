'use client';

import {useState} from 'react';
import Image from 'next/image';
import {ArrowRight,ArrowUpRight,Check,FileSearch,GitBranch,Menu,Quote,ShieldCheck,Sparkles,X} from 'lucide-react';
import Workspace from '../components/workspace';
import CampaignMark from '../components/campaign-mark';

const features=[
 {number:'01',title:'Audit the claim',copy:'CampAIgn challenges reported wins, surfaces confounders, and separates correlation from evidence of impact.',icon:FileSearch},
 {number:'02',title:'Keep the source attached',copy:'Every extracted metric and claim stays connected to a page, section, or verbatim source excerpt.',icon:Quote},
 {number:'03',title:'See what shaped the idea',copy:'Weighted links show exactly which past campaigns informed each proposed experiment.',icon:GitBranch},
 {number:'04',title:'Design for measurement',copy:'Recommendations arrive with a test design, audience, and primary metric—not just another creative concept.',icon:Sparkles},
];

const companies=['Northstar','Halcyon','Meridian','Kite','Luma','Commonfield','Vela','Rook + River'];
const testimonials=[
 {quote:'The useful part was seeing exactly which assumptions we still needed to test—not another list of campaign ideas.',name:'Maya Chen',role:'VP Marketing, Northstar Goods',image:'/testimonials/maya-chen.jpg'},
 {quote:'CampAIgn turned our campaign recap into a plan the growth and finance teams could inspect together.',name:'Jonas Reed',role:'Growth Lead, Kite Studio',image:'/testimonials/jonas-reed.jpg'},
 {quote:'When the source does not support a claim, the board says so. That changed the quality of our briefs.',name:'Amari Okafor',role:'Head of Brand, Commonfield',image:'/testimonials/amari-okafor.jpg'},
];

export default function Home(){
 const [workspace,setWorkspace]=useState(false),[startUpload,setStartUpload]=useState(false),[menu,setMenu]=useState(false);
 function enter(upload=false){setStartUpload(upload);setWorkspace(true);window.scrollTo(0,0)}
 if(workspace)return <Workspace startWithUpload={startUpload} onBack={()=>{setWorkspace(false);setStartUpload(false)}}/>;
 return <div className="landing-shell">
  <header className="landing-nav">
   <button className="landing-brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="CampAIgn home"><span><CampaignMark size={21}/></span>CampAIgn</button>
   <nav className={menu?'landing-links open':'landing-links'} aria-label="Primary navigation">
    <a href="#product" onClick={()=>setMenu(false)}>Product</a><a href="#method" onClick={()=>setMenu(false)}>How it works</a><a href="#principles" onClick={()=>setMenu(false)}>Principles</a>
   </nav>
   <div className="landing-actions"><button className="nav-cta" onClick={()=>enter(false)}>Open workspace <ArrowUpRight size={14}/></button><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></div>
  </header>

  <div className="landing-banner"><Sparkles size={14}/><span>Campaign strategy that starts with evidence, not instinct.</span><button onClick={()=>enter(false)}>Explore the example <ArrowRight size={13}/></button></div>

  <section className="landing-hero">
   <h1>Turn campaign history into<br/><em>your next measurable move.</em></h1>
   <p>Upload what you tried. CampAIgn audits the evidence, challenges the success story, and connects it to experiments you can actually measure.</p>
   <div className="hero-actions"><button className="hero-primary" onClick={()=>enter(true)}>Analyze a campaign</button><button className="hero-secondary" onClick={()=>enter(false)}>Explore a board</button></div>
  </section>

  <section className="landing-proof" aria-label="Product facts">
   <div><strong>01</strong><span>Source-grounded<br/>analysis</span></div><div><strong>02</strong><span>Correlation vs.<br/>causation audit</span></div><div><strong>03</strong><span>Weighted evidence<br/>connections</span></div><div><strong>04</strong><span>Trackable next<br/>experiments</span></div>
  </section>

  <section className="company-train" aria-label="Illustrative company marks">
   <p>Built for teams that would rather test than guess.</p>
   <div className="company-track"><div className="company-loop">{[...companies,...companies].map((company,i)=><span className="company-name" key={`${company}-${i}`}>{company}</span>)}</div></div>
  </section>

  <section className="product-window" id="product" aria-label="CampAIgn strategy board preview">
   <div className="window-bar"><div className="window-brand"><GitBranch size={15}/> Strategy map</div><div className="window-legend"><span/> stronger line, greater influence</div><div className="window-dots"><i/><i/><i/></div></div>
   <div className="window-stage">
    <div className="window-label foundation"><span>01</span><div><strong>The foundations</strong><small>WHAT YOU’VE ALREADY TRIED</small></div></div>
    <div className="window-label moves"><span>02</span><div><strong>The next moves</strong><small>WHAT THE EVIDENCE POINTS TO</small></div></div>
    <svg viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true"><path d="M345 145 C490 145 510 135 655 135"/><path className="heavy" d="M345 145 C510 145 490 310 655 310"/><path d="M345 320 C490 320 510 135 655 135"/><path className="heavy" d="M345 320 C500 320 510 310 655 310"/></svg>
    <article className="mini-card past one"><span>PRINT · MAR 2025</span><h3>Neighborhood Flyer Campaign</h3><p>+24% reported foot traffic</p><small>Low attribution confidence</small></article>
    <article className="mini-card past two"><span>EMAIL · APR 2025</span><h3>Customer Reactivation Email Campaign</h3><p>42 tracked redemptions</p><small>Moderate attribution confidence</small></article>
    <article className="mini-card future one"><span>PROPOSED EXPERIMENT</span><h3>Trackable Neighborhood Flyer Campaign</h3><p>Matched neighborhoods, unique QR links, and a holdout.</p><small>Informed by 2 campaigns <ArrowRight size={12}/></small></article>
    <article className="mini-card future two"><span>PROPOSED EXPERIMENT</span><h3>Email Reactivation Holdout Campaign</h3><p>Measure the lift against a randomized no-email group.</p><small>Informed by 2 campaigns <ArrowRight size={12}/></small></article>
   </div>
   <div className="window-note" aria-hidden="true"/>
  </section>

  <section className="landing-section" id="principles">
   <div className="section-heading"><div><h2>Better questions make<br/>better campaigns.</h2></div><p>Most campaign reports tell you what happened after launch. CampAIgn asks the harder question: what evidence says the campaign caused it?</p></div>
   <div className="feature-grid">{features.map(({number,title,copy,icon:Icon},i)=><article className={`feature-card feature-${i+1}`} key={title}><div><span>{number}</span><Icon size={21}/></div><h3>{title}</h3><p>{copy}</p>{i===0&&<div className="claim-check"><span>Reported</span><strong>“Foot traffic increased 24%”</strong><span className="claim-answer"><X size={13}/> No QR code · festival confounder</span></div>}{i===2&&<div className="weight-demo"><span><i style={{width:'88%'}}/>Flyer attribution</span><span><i style={{width:'42%'}}/>Social reach</span></div>}</article>)}</div>
  </section>

  <section className="method-section" id="method">
   <div className="section-heading"><div><h2>Evidence in.<br/>Experiments out.</h2></div><p>A focused workflow from messy campaign history to a strategy board your team can inspect, edit, and challenge.</p></div>
   <div className="method-grid"><article><span>1</span><h3>Bring the history</h3><p>Drop a PDF, text file, or campaign notes. CampAIgn reads metrics, claims, tables, and visual evidence.</p><div className="method-visual upload-visual"><FileSearch size={24}/><strong>campaign-report.pdf</strong><small>Ready to audit</small></div></article><article><span>2</span><h3>Pressure-test the story</h3><p>Missing attribution, confounders, and unsupported causal claims become visible—not quietly filled in.</p><div className="method-visual audit-visual"><Check size={15}/><span>Metric extracted</span><X size={15}/><span>Attribution missing</span></div></article><article><span>3</span><h3>Choose a measurable move</h3><p>Explore recommendations, their evidence weights, and the experiment needed to learn what works.</p><div className="method-visual result-visual"><span>Experiment ready</span><ArrowUpRight size={16}/></div></article></div>
  </section>

  <section className="testimonial-section" aria-labelledby="testimonial-title">
   <div className="testimonial-heading"><h2 id="testimonial-title">Strategy people<br/>can defend.</h2><div><p>What evidence-led planning should feel like inside a marketing team.</p></div></div>
   <div className="testimonial-grid">{testimonials.map(item=><article className="testimonial-card" key={item.name}><Quote size={20}/><blockquote>“{item.quote}”</blockquote><div><Image src={item.image} alt={`Portrait of ${item.name}`} width={52} height={52}/><span><strong>{item.name}</strong><small>{item.role}</small></span></div></article>)}</div>
  </section>

  <section className="trust-strip"><ShieldCheck size={22}/><div><strong>Private by design, honest by default.</strong><span>Files stay in the current browser session. Missing facts remain “Not provided in source.”</span></div><button onClick={()=>enter(false)}>See how CampAIgn works <ArrowRight size={15}/></button></section>

  <section className="landing-cta"><h2>Make the next campaign<br/><em>easier to believe.</em></h2><p>Start with an example board or bring your own campaign evidence.</p><div className="hero-actions"><button className="hero-primary" onClick={()=>enter(true)}>Analyze a campaign</button><button className="hero-secondary" onClick={()=>enter(false)}>Explore a board</button></div></section>

  <footer className="landing-footer"><button className="landing-brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><span><CampaignMark size={21}/></span>CampAIgn</button><p>Evidence into direction.</p><div><a href="#product">Product</a><a href="#method">How it works</a><button onClick={()=>enter(false)}>Workspace</button></div></footer>
 </div>
}
