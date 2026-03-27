"use client";

import React, { useRef } from "react";
import { Button } from "./components/Button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Users, MessageSquare, ArrowRight, Building2, Globe, TrendingUp } from "lucide-react";
import { organizations } from "./data/platformData";

// Typed variants for strictly typed framer-motion animations
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const spotlightRef = useRef<HTMLElement>(null);

  const scrollToSpotlight = () => {
    spotlightRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden font-body selection:bg-emerald-lime selection:text-jet-black">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4]"></div>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-lime/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-slate-gray/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-jet-black/5">
        <Link href="/" className="text-2xl font-heading font-black tracking-tighter text-jet-black hover:opacity-70 transition-opacity">
          Consultly.
        </Link>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <Link href="/login" className="hidden sm:block text-slate-gray/60 hover:text-jet-black transition-colors">
            Access Portal
          </Link>
          <Link href="/login">
            <Button variant="primary" className="rounded-full px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-lime/20 hover:shadow-emerald-lime/40 transition-all bg-jet-black text-white">
              Join Network
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 bg-jet-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl shadow-jet-black/30">
              <span className="w-2 h-2 rounded-full bg-emerald-lime animate-ping"></span>
              Elevated Advisory Network
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-heading font-black tracking-tighter text-jet-black mb-12 leading-[0.8] max-w-7xl">
              Clarity in <br/>
              <span className="text-slate-gray/10 italic font-medium">Complexity</span>.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-2xl md:text-4xl text-slate-gray/70 mb-20 max-w-4xl font-body leading-tight font-light">
              Converging the world's premier <span className="text-jet-black font-black">legal</span>, <span className="text-jet-black font-black">financial</span>, and <span className="text-jet-black font-black">strategic</span> authorities into a single direct connective tissue.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/login">
                <Button variant="primary" className="text-[11px] px-14 py-6 rounded-full w-full sm:w-auto group shadow-2xl shadow-emerald-lime/20 hover:scale-105 transition-all font-black uppercase tracking-[0.2em] bg-jet-black text-white">
                  Join The Intake Channel
                </Button>
              </Link>
              <Button 
                onClick={scrollToSpotlight}
                variant="outline" 
                className="text-[11px] px-14 py-6 rounded-full w-full sm:w-auto font-black uppercase tracking-[0.2em] border-jet-black/10 hover:bg-jet-black hover:text-white transition-all bg-white text-jet-black"
              >
                View Institutions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Scrolling Partners Marquee */}
      <section className="py-24 border-y border-soft-gray bg-white overflow-hidden flex flex-col items-center relative z-10">
        <p className="text-[10px] font-black text-slate-gray/40 uppercase tracking-[0.4em] mb-14 text-center w-full">Institutional Trust Core</p>
        <div className="flex w-full overflow-hidden group">
          <motion.div 
            className="flex whitespace-nowrap gap-32 px-16 items-center text-slate-gray/20 font-heading"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="font-black text-6xl tracking-tighter hover:text-jet-black transition-all duration-700 cursor-default">GOLDMAN</span>
                <span className="font-black text-6xl tracking-widest hover:text-jet-black transition-all duration-700 cursor-default">AURELIUS</span>
                <span className="font-serif italic text-6xl hover:text-jet-black transition-all duration-700 cursor-default">Vanguard</span>
                <span className="font-black text-6xl tracking-tight hover:text-jet-black transition-all duration-700 cursor-default">KPMG</span>
                <span className="font-black text-6xl tracking-wider hover:text-jet-black transition-all duration-700 cursor-default">SKADDEN</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Definition / What it is */}
      <section className="py-64 px-8 bg-white relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.p variants={fadeUp} className="text-[11px] font-black text-emerald-lime uppercase tracking-[0.4em]">The Platform Objective</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-jet-black leading-none">The new paradigm <br/>of institutional access.</motion.h2>
            <motion.p variants={fadeUp} className="text-2xl md:text-3xl text-slate-gray/70 leading-relaxed font-light md:text-center italic border-l-4 border-emerald-lime/20 pl-10 py-6 bg-soft-gray/30 rounded-r-[3rem]">
              Consultly operates beyond the limitations of traditional firm directories. It is an exclusive, strictly-vetted professional network engineered to dissolve the barriers between ambitious enterprises and elite strategic talent.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Institutions Spotlight Section - THE NEW TARGET */}
      <section ref={spotlightRef} className="py-64 px-8 bg-soft-gray/50 relative z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-lime/5 rounded-full blur-[150px] -mr-40 -mt-20"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-24"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="max-w-2xl space-y-6">
                <p className="text-[11px] font-black text-emerald-lime uppercase tracking-[0.4em]">Partner Ecosystem</p>
                <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-jet-black leading-none">Institutions in <br/>the network.</h2>
              </div>
              <div className="pb-4">
                 <Link href="/login">
                   <Button variant="outline" className="text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 rounded-2xl border-jet-black hover:bg-jet-black hover:text-white transition-all bg-white shadow-xl">
                      Access Full Roster <ArrowRight className="w-3.5 h-3.5 ml-2" />
                   </Button>
                 </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               {organizations.slice(0, 6).map((org, i) => (
                 <motion.div 
                    key={org.id} 
                    variants={fadeUp}
                    className="group relative"
                 >
                    <div className="absolute inset-0 bg-jet-black rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10 bg-emerald-lime/5"></div>
                    <div className="h-full bg-white border border-jet-black/5 rounded-[3rem] p-12 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:border-emerald-lime/20 flex flex-col justify-between">
                       <div className="space-y-8">
                          <div className="w-16 h-16 bg-jet-black text-white rounded-2xl flex items-center justify-center font-heading font-black text-2xl shadow-xl group-hover:bg-emerald-lime transition-all duration-700">
                             {org.initials}
                          </div>
                          <div>
                             <p className="text-[11px] font-black text-emerald-lime uppercase tracking-[0.3em] mb-3">{org.tier}</p>
                             <h4 className="text-3xl font-heading font-black text-jet-black tracking-tight">{org.name}</h4>
                             <p className="text-slate-gray/70 text-base font-light mt-4 leading-relaxed line-clamp-2">
                               {org.description}
                             </p>
                          </div>
                       </div>
                       
                       <div className="pt-10 mt-10 border-t border-soft-gray flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-gray/40 uppercase tracking-widest">
                             <Globe className="w-4 h-4" /> {org.hq}
                          </div>
                          <Link href="/login" className="text-emerald-lime font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                             Profile <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institutional Interconnectivity - The Flow */}
      <section className="py-64 px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-24 items-center"
          >
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-[11px] font-black text-emerald-lime uppercase tracking-[0.4em]">Direct Engagement</p>
                <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-jet-black leading-[0.9]">The standard <br/>of access.</h2>
              </div>
              <p className="text-2xl text-slate-gray/70 font-light leading-relaxed max-w-xl italic">
                 "Direct connective tissue between institutional authority and enterprise ambition, stripping away 40+ days of intake latency."
              </p>
              
              <div className="space-y-12 pt-8">
                 {[
                   { title: "Rigorous Vetting", desc: "Every partner undergoes an 8-point institutional verification protocol prior to network access.", icon: ShieldCheck },
                   { title: "Strategic Mapping", desc: "Neural matching identifies the precise senior partner for specific cross-border challenges.", icon: Users },
                   { title: "Direct Secure Box", desc: "Initiate AES-256 encrypted, direct channels in under 60 seconds with verified leads.", icon: MessageSquare }
                 ].map((item, i) => (
                   <motion.div key={i} variants={fadeUp} className="flex gap-8 group">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-soft-gray flex items-center justify-center flex-shrink-0 group-hover:bg-jet-black group-hover:text-white transition-all duration-700 shadow-sm">
                         <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                         <h4 className="text-2xl font-heading font-black text-jet-black mb-2 tracking-tight">{item.title}</h4>
                         <p className="text-slate-gray/70 text-lg font-light leading-relaxed">{item.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
            </div>

            <motion.div variants={fadeUp} className="relative group">
               <div className="absolute -inset-8 bg-emerald-lime/10 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="relative aspect-[4/5] bg-jet-black rounded-[4rem] p-16 overflow-hidden shadow-2xl flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-lime/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                  <div className="space-y-10 relative z-10">
                    <p className="text-emerald-lime font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-3">
                       <TrendingUp className="w-5 h-5" /> Institutional Pulse
                    </p>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tighter leading-[1.1]">"Mapping liquidity across 42 EMEA zones in under 24 hours."</h3>
                    <p className="text-white/40 text-base font-black uppercase tracking-[0.2em]">— MD, GOLDMAN STRATEGY GROUP</p>
                  </div>
                  
                  <div className="space-y-8 relative z-10 pt-16 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className="text-white/40">Verified Channels</span>
                      <span className="text-emerald-lime flex items-center gap-2">1,242 Active <div className="w-1.5 h-1.5 bg-emerald-lime rounded-full animate-ping"></div></span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className="text-white/40">Directed Assets</span>
                      <span className="text-white">$42.8B Unified</span>
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-72 px-8 bg-jet-black text-white text-center relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-lime/10 to-transparent opacity-50 z-0 blur-[100px]"></div>
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center space-y-16">
          <h2 className="text-7xl md:text-[10rem] leading-[0.8] font-heading font-black tracking-tighter">Ascend to <br/>the definitive tier.</h2>
          <p className="text-3xl text-slate-gray/60 font-light max-w-3xl leading-relaxed">Scale your institutional authority alongside the world's most verified specialized networks.</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/login">
              <Button variant="primary" className="text-[12px] px-20 py-7 rounded-full shadow-[0_20px_60px_rgba(0,200,150,0.15)] hover:scale-105 transition-all font-black uppercase tracking-[0.3em] bg-white text-jet-black hover:bg-emerald-lime">
                Join Network Intake
              </Button>
            </Link>
          </div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="py-16 px-8 bg-white relative z-10 border-t border-soft-gray">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-heading font-black tracking-tighter text-jet-black">Consultly.</div>
          <div className="text-slate-gray/40 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
            &copy; {new Date().getFullYear()} Consultly. Institutional Access Protocol.
          </div>
        </div>
      </footer>
    </main>
  );
}
