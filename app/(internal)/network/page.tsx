"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, Filter, Star, MapPin, MoreHorizontal, ArrowRight, UserPlus, Zap, TrendingUp, Sparkles, MessageSquare, ChevronRight, Share2, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { useState } from "react";
import { consultants, categories } from "../../data/platformData";
import { HoverAuraCard } from "../../components/HoverAuraCard";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 15 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};

export default function NetworkPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("AI Recommended");

  const filteredConsultants = consultants.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || 
                        c.role.toLowerCase().includes(query.toLowerCase());
    if (activeCategory === "AI Recommended") return matchesQuery;
    return matchesQuery && c.category === activeCategory;
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Header & Search */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-soft-gray/30 pb-6 sm:pb-10">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tighter text-jet-black leading-none">Authority Directory</h1>
          <p className="text-slate-gray/70 text-[10px] sm:text-sm font-medium uppercase tracking-widest mt-2 flex items-center gap-2">
             <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-lime" /> Fully Vetted Institutional Experts
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-gray group-focus-within:text-emerald-lime transition-colors" />
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by expertise, name, or firm..." 
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-soft-gray/50 rounded-2xl text-[10px] uppercase font-black tracking-widest focus:outline-none focus:border-emerald-lime focus:ring-4 focus:ring-emerald-lime/5 transition-all shadow-sm" 
            />
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
           {/* Recommendation Banner */}
           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-jet-black text-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-lime/10 rounded-full blur-[100px] -mr-40 -mt-20 group-hover:bg-emerald-lime/20 transition-all duration-700 hidden sm:block"></div>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-2 px-2.5 sm:px-4 py-1.5 bg-emerald-lime/10 text-emerald-lime rounded text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-8 border border-emerald-lime/20">
                    <Sparkles className="w-3 sn:w-4 h-3 sm:h-4 fill-current animate-pulse" /> Synthesis Intelligence
                  </div>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter mb-4 sm:mb-6 leading-tight break-words">Strategic Priority: EMEA Compliance Management</h2>
                  <p className="text-white/50 text-[15px] sm:text-xl font-light max-w-2xl leading-relaxed italic">
                    "Identified top-tier specialists for cross-border audits."
                  </p>
                  <p className="text-white/20 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.4em] mt-8 sm:mt-10 border-t border-white/5 pt-5 sm:pt-6 inline-block">Institutional Data Sync: Active</p>
                </div>
             </HoverAuraCard>
           </motion.div>

           {/* Category Filters */}
           <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-4 no-scrollbar border-b border-soft-gray/20 sticky top-0 bg-soft-gray/5 z-20 backdrop-blur-md">
              {["AI Recommended", ...categories].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 ${activeCategory === cat ? 'bg-jet-black text-white border-jet-black shadow-xl' : 'bg-white text-slate-gray border-soft-gray hover:border-jet-black'}`}
                >
                  {cat}
                </button>
              ))}
           </div>

           {/* Results Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {filteredConsultants.map((c) => (
                <motion.div key={c.id} variants={fadeUp} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link href={`/network/${c.id}`} className="block h-full transition-transform active:scale-[0.98] group">
                    <HoverAuraCard className="bg-white border border-jet-black/5 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 h-full flex flex-col justify-between hover:shadow-2xl hover:border-emerald-lime/20 transition-all duration-500">
                      <div className="flex justify-between items-start mb-6 sm:mb-8">
                        <div className="flex gap-4 sm:gap-5">
                          <div className="relative">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-soft-gray/50 rounded-xl sm:rounded-2xl flex items-center justify-center font-heading font-black text-lg sm:text-xl text-jet-black shadow-inner border border-jet-black/5 group-hover:bg-jet-black group-hover:text-white transition-all duration-500">
                              {c.name.charAt(0)}{c.name.split(' ').pop()?.charAt(0)}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-lime border-4 border-white rounded-full shadow-lg shadow-emerald-lime/30 animate-pulse"></div>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-heading font-black text-jet-black tracking-tight group-hover:text-emerald-lime transition-colors leading-tight">{c.name}</h3>
                            <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.2em] mt-1">{c.role}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                         <div className="flex flex-wrap gap-2.5">
                            {c.skills.slice(0, 3).map((s, i) => (
                              <span key={i} className="px-3 py-1 bg-soft-gray rounded-lg text-[9px] font-black text-jet-black uppercase tracking-widest group-hover:bg-soft-gray/80 transition-colors"># {s}</span>
                            ))}
                         </div>
                         
                         <div className="flex items-center justify-between pt-6 border-t border-soft-gray/30">
                            <div className="flex items-center gap-2">
                               <Star className="w-4 h-4 text-emerald-lime fill-emerald-lime animate-pulse" />
                               <span className="text-sm font-black text-jet-black">{c.rating}</span>
                               <span className="text-[10px] text-slate-gray/40 font-black uppercase tracking-widest ml-1">• Verified</span>
                            </div>
                            <div className="text-[9px] font-black text-emerald-lime uppercase tracking-[0.20em] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                               Active Line <div className="w-1.5 h-1.5 bg-emerald-lime rounded-full animate-ping"></div>
                            </div>
                         </div>
                      </div>
                    </HoverAuraCard>
                  </Link>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Network Intelligence Sidebar — hidden on mobile */}
        <div className="hidden lg:block lg:col-span-4 space-y-10">
           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-white border border-jet-black/5 rounded-[2.5rem] p-8 shadow-sm">
                <h2 className="text-[10px] font-black text-jet-black mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-lime" /> Institutional Sentiment
                </h2>
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] font-heading">
                         <span className="text-slate-gray/60">Litigation Demand</span>
                         <span className="text-emerald-lime">85% Elevated</span>
                      </div>
                      <div className="w-full h-1.5 bg-soft-gray rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: "85%" }} 
                           transition={{ duration: 1.5, ease: "easeOut" }} 
                           className="h-full bg-emerald-lime shadow-[0_0_10px_rgba(110,231,183,0.3)]" 
                         />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] font-heading">
                         <span className="text-slate-gray/60">M&A Liquidity</span>
                         <span className="text-jet-black">45% Neutral</span>
                      </div>
                      <div className="w-full h-1.5 bg-soft-gray rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: "45%" }} 
                           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} 
                           className="h-full bg-jet-black" 
                         />
                      </div>
                   </div>
                </div>
             </HoverAuraCard>
           </motion.div>

           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-white border border-jet-black/5 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-lime/5 rounded-full blur-3xl group-hover:bg-emerald-lime/10 transition-all"></div>
                <h2 className="text-[10px] font-black text-jet-black mb-6 sm:mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-lime" /> Risk Index
                </h2>
                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                   <div className="text-4xl sm:text-5xl font-heading font-black text-jet-black tracking-tighter">98.2<span className="text-emerald-lime text-2xl sm:text-3xl font-light">/100</span></div>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-gray/50 uppercase tracking-[0.2em] mb-8 sm:mb-10 leading-relaxed italic">
                   System-wide protocol active.
                </p>
                <Button variant="outline" className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border-soft-gray text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-jet-black hover:text-white transition-all shadow-sm">
                   Full Methodology
                </Button>
             </HoverAuraCard>
           </motion.div>

           <motion.div variants={fadeUp}>
             <HoverAuraCard className="bg-jet-black text-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]"></div>
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-lime mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <h3 className="text-xl sm:text-2xl font-heading font-black tracking-tight mb-4 flex items-center justify-between">
                   Synthesis Upload
                   <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </h3>
                <p className="text-white/40 text-[13px] sm:text-sm font-light leading-relaxed mb-8 sm:mb-10 italic">Upload your project scope.</p>
                <Button variant="primary" className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-jet-black font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-lime hover:text-white transition-all shadow-none">
                   Start Upload
                </Button>
             </HoverAuraCard>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
