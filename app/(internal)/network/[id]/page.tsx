"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, Star, ShieldCheck, Mail, MapPin, Building2, Briefcase, Award, ArrowRight, Zap, Target, MoreHorizontal, Link as LinkIcon, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { useParams, useRouter } from "next/navigation";
import { EngagementModal } from "../../../components/EngagementModal";
import { consultants } from "../../../data/platformData";
import { HoverAuraCard } from "../../../components/HoverAuraCard";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 15 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "e-winters";
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const c = consultants.find(item => item.id === id) || consultants[0];

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-7xl mx-auto pb-24 space-y-12">
      
      {/* Navigation Layer */}
      <motion.div variants={fadeUp}>
        <Link href="/network" className="inline-flex items-center gap-2 text-slate-gray hover:text-jet-black transition-colors font-black text-[9px] uppercase tracking-[0.2em] group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-all" /> Professional Directory
        </Link>
      </motion.div>

      {/* Profile Header - Integrated Institutional Feel */}
      <motion.div variants={fadeUp}>
        <HoverAuraCard className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-jet-black/5 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-lime/[0.03] blur-[120px] rounded-full pointer-events-none hidden sm:block"></div>

          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-jet-black text-white rounded-2xl sm:rounded-[2.5rem] flex-shrink-0 flex items-center justify-center font-heading font-black text-3xl sm:text-5xl shadow-2xl relative z-10 border border-white/10 group overflow-hidden">
            <div className="absolute inset-0 bg-emerald-lime opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-700">{c.name.charAt(0)}{c.name.split(' ').pop()?.charAt(0)}</span>
          </div>

          <div className="flex-1 w-full relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 mb-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter text-jet-black leading-[1.1]">{c.name}</h1>
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-lime/10 text-emerald-lime rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-lime/20">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Verified
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                   <div className="flex items-center gap-2.5 text-[9px] sm:text-[10px] font-black text-slate-gray uppercase tracking-[0.2em]"><Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-lime" /> {c.expertise}</div>
                   <Link href={`/organizations/${c.firmId}`} className="flex items-center gap-2.5 text-[9px] sm:text-[10px] font-black text-slate-gray hover:text-emerald-lime transition-all uppercase tracking-[0.2em] group">
                     <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-lime group-hover:scale-110 transition-transform" /> {c.firm}
                   </Link>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-72">
                <Button 
                  variant="primary" 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-lime/20 rounded-[1.25rem] bg-jet-black text-white hover:bg-jet-black/90 group"
                >
                  Initiate Secure Channel <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/messages?contactId=${c.firmId}`)}
                  className="w-full py-4.5 bg-white rounded-[1.25rem] border-soft-gray text-[10px] font-black uppercase tracking-[0.2em] hover:bg-jet-black hover:text-white transition-all"
                >
                  Institutional Message
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 sm:gap-10 pt-6 sm:pt-10 border-t border-soft-gray/30 items-center justify-between">
               <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                 <div className="flex items-center gap-3">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.2em]">Authority</p>
                    <div className="flex text-emerald-lime animate-pulse"><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-lime"/><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-lime"/><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-lime"/><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-lime"/><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-lime"/></div>
                 </div>
                 <div className="flex items-center gap-3">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.2em]">Status</p>
                    <div className={`px-2.5 py-1 rounded-full text-[8.5px] sm:text-[9px] font-black uppercase tracking-[0.2em] border flex items-center gap-1.5 ${c.available ? 'bg-emerald-lime/10 text-emerald-lime border-emerald-lime/20 shadow-[0_0_15px_rgba(110,231,183,0.1)]' : 'bg-soft-gray text-slate-gray border-soft-gray'}`}>
                      <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${c.available ? 'bg-emerald-lime animate-ping' : 'bg-slate-gray'}`}></div>
                      {c.available ? 'Ready' : 'Engaged'}
                    </div>
                 </div>
               </div>
               
               <div className="flex gap-3 sm:gap-4">
                  <button className="p-2 sm:p-3 bg-soft-gray/30 rounded-lg sm:rounded-xl hover:bg-jet-black hover:text-white transition-all shadow-sm"><Share2 className="w-4 h-4" /></button>
                  <button className="p-2 sm:p-3 bg-soft-gray/30 rounded-lg sm:rounded-xl hover:bg-jet-black hover:text-white transition-all shadow-sm"><MoreHorizontal className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        </HoverAuraCard>
      </motion.div>

      {/* Profile Details - Two Column Layout */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Biography & Reviews */}
        <div className="lg:col-span-8 space-y-12">
          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-white p-6 sm:p-10 lg:p-14 rounded-2xl sm:rounded-[2.5rem] border border-jet-black/5 shadow-sm space-y-8 sm:space-y-10">
              <h2 className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] text-jet-black flex items-center gap-3 uppercase">
                 <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-lime" /> Strategic Directives
              </h2>
              <p className="text-slate-gray text-lg sm:text-xl font-light leading-relaxed font-body">
                Expert consultant specializing in <span className="text-jet-black font-black">{c.expertise}</span>. With extensive tenure as a {c.role} at <span className="text-jet-black font-black underline decoration-emerald-lime decoration-2 underline-offset-4">{c.firm}</span>.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 pt-8 sm:pt-12 border-t border-soft-gray/30">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.3em] mb-1 sm:mb-2 font-heading">Tier</p>
                  <p className="text-3xl sm:text-4xl font-heading font-black text-jet-black tracking-tighter">{c.rate}<span className="text-xs font-medium text-slate-gray/50 ml-1 uppercase tracking-widest font-body">/hr</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.3em] mb-3 sm:mb-4 font-heading">Vetting</p>
                  <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-soft-gray/20 rounded-xl sm:rounded-2xl border border-jet-black/5">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-lime flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-jet-black leading-relaxed">
                      Passed 42-point security audit.
                    </p>
                  </div>
                </div>
              </div>
            </HoverAuraCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-jet-black/5 shadow-sm space-y-12">
              <h2 className="text-[11px] font-black tracking-[0.3em] text-jet-black flex items-center gap-3 uppercase">
                <Star className="w-5 h-5 text-emerald-lime" /> Operational Success History
              </h2>
              <div className="space-y-14">
                <div className="border-l-4 border-emerald-lime/30 pl-10 relative group">
                  <div className="absolute top-0 -left-[6px] w-3 h-3 rounded-full bg-emerald-lime shadow-[0_0_10px_rgba(110,231,183,0.5)] group-hover:scale-125 transition-transform"></div>
                  <h4 className="font-heading font-black text-2xl text-jet-black mb-3 tracking-tight">Cross-Border Compliance Architecture</h4>
                  <p className="text-slate-gray font-light text-lg mb-4 leading-relaxed">Designed and deployed a unified 42-country data residency framework for a global logistics provider, resulting in a 14% reduction in legal operational friction.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-soft-gray rounded text-[9px] font-black text-jet-black uppercase tracking-widest">
                    Fiscal Quarter 2025 • Verified Outcome
                  </div>
                </div>
                <div className="border-l-4 border-soft-gray pl-10 relative group opacity-60 hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 -left-[6px] w-3 h-3 rounded-full bg-soft-gray group-hover:bg-jet-black transition-colors"></div>
                  <h4 className="font-heading font-black text-2xl text-jet-black mb-3 tracking-tight">HFT Risk Disclosure Standardization</h4>
                  <p className="text-slate-gray font-light text-lg mb-4 leading-relaxed">Systematized high-frequency trading risk disclosures for the top 5 global quant desks during the 2024 regulatory structural shifts.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-soft-gray rounded text-[9px] font-black text-jet-black uppercase tracking-widest">
                    Fiscal Quarter 2024 • Verified Outcome
                  </div>
                </div>
              </div>
            </HoverAuraCard>
          </motion.div>
        </div>

        {/* Right: Actions & Metadata */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-jet-black text-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-lime/20 rounded-full blur-[100px] group-hover:bg-emerald-lime/30 transition-all duration-700 hidden sm:block"></div>
               <h3 className="text-[10px] font-black mb-6 sm:mb-10 relative z-10 tracking-[0.3em] uppercase flex items-center gap-3 text-emerald-lime">
                  <Target className="w-5 h-5" /> Engagement Matrix
               </h3>
               <div className="space-y-6 sm:space-y-8 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
                    <span className="text-white/40 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Trust Index</span>
                    <span className="font-heading font-black flex items-center gap-2 text-2xl sm:text-3xl font-bold text-emerald-lime tracking-tighter">5.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Missions</span>
                    <span className="font-heading font-black text-white text-2xl sm:text-3xl tracking-tighter">142</span>
                  </div>
               </div>
               
               <div className="pt-8 sm:pt-10 space-y-4">
                  <Button 
                    variant="primary" 
                    className="bg-emerald-lime text-jet-black w-full py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-jet-black transition-colors shadow-none rounded-xl sm:rounded-2xl group" 
                    onClick={() => setIsModalOpen(true)}
                  >
                    Direct Connect Portfolio <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                  </Button>
               </div>
             </HoverAuraCard>
           </motion.div>

           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-white p-10 rounded-[2.5rem] border border-jet-black/5 shadow-sm text-center space-y-5 group">
                <div className="w-16 h-16 bg-soft-gray rounded-3xl mx-auto flex items-center justify-center text-jet-black group-hover:bg-jet-black group-hover:text-white transition-all duration-500 shadow-inner">
                   <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-gray/40 uppercase tracking-[0.3em]">Institutional Anchor</p>
                   <h4 className="font-heading font-black text-2xl text-jet-black tracking-tight">{c.firm}</h4>
                </div>
                <Link href={`/organizations/${c.firmId}`} className="text-emerald-lime text-[10px] font-black uppercase tracking-[0.2em] hover:translate-x-2 transition-transform inline-flex items-center gap-2 group">
                   Browse Firm Intelligence <ArrowRight className="w-4 h-4" />
                </Link>
             </HoverAuraCard>
           </motion.div>

           <motion.div variants={fadeUp} className="bg-soft-gray/30 p-8 rounded-[2rem] border border-dashed border-soft-gray/50">
              <p className="text-[9px] font-black text-slate-gray/50 uppercase tracking-[0.3em] mb-4 text-center">Encryption Status</p>
              <div className="flex justify-center gap-1.5">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="w-2 h-2 bg-emerald-lime/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>

      <EngagementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        consultantName={c.name}
      />
    </motion.div>
  );
}
