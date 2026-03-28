"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Briefcase, Heart, MessageSquare, Share2, TrendingUp, MoreHorizontal, Image as ImageIcon, Link as LinkIcon, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { useState } from "react";
import { platformPosts, organizations } from "../../data/platformData";
import { HoverAuraCard } from "../../components/HoverAuraCard";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("All Insights");
  const [posts, setPosts] = useState(platformPosts.map(p => ({ ...p, isLiked: false, localLikes: p.likes })));
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          localLikes: p.isLiked ? p.localLikes - 1 : p.localLikes + 1
        };
      }
      return p;
    }));
  };

  const filteredPosts = posts.filter(p => {
    if (activeTab === "All Insights") return true;
    if (activeTab === "Following") return p.firmId === "goldman" || p.firmId === "skadden";
    if (activeTab === "Trending") return p.localLikes > 150;
    return true;
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-10 max-w-6xl mx-auto">
      {/* Platform Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-jet-black/5 pb-6 sm:pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tighter text-jet-black leading-tight">Intelligence Feed</h1>
          <p className="text-slate-gray/50 text-[10px] font-black uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
             <ShieldCheck className="w-3.5 h-3.5 text-emerald-lime" /> Platform Sync: Verified Network Active
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link href="/network">
            <Button variant="outline" className="py-2.5 sm:py-3 px-4 sm:px-6 font-black bg-white text-[10px] uppercase tracking-[0.2em] rounded-2xl border-soft-gray hover:border-jet-black transition-all">
              Authority Directory
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="primary" className="py-2.5 sm:py-3 px-4 sm:px-6 shadow-2xl shadow-emerald-lime/20 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl bg-jet-black text-white hover:bg-jet-black/95 transition-all">
              Secure Box
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Feed Section */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Create Post Proxy */}
          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-jet-black/5 shadow-sm flex gap-3 sm:gap-5 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-jet-black text-white flex-shrink-0 flex items-center justify-center font-heading font-black text-[10px] sm:text-xs">DC</div>
              <input 
                placeholder="Share an update..." 
                className="flex-1 bg-soft-gray/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 text-jet-black text-xs sm:text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-lime/5 transition-all placeholder:text-slate-gray/40"
              />
              <div className="flex gap-1 sm:gap-3 text-slate-gray/40">
                <button title="Attach Media" className="p-2 sm:p-3 hover:bg-soft-gray hover:text-jet-black rounded-xl transition-all"><ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              </div>
            </HoverAuraCard>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-gray border-b border-soft-gray/30 mb-10 overflow-x-auto no-scrollbar pt-4">
             {["All Insights", "Following", "Trending"].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`pb-5 px-1 transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-jet-black' : 'text-slate-gray/50 hover:text-jet-black'}`}
               >
                 {tab}
                 {activeTab === tab && (
                   <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-lime rounded-full" />
                 )}
               </button>
             ))}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              const firm = organizations.find(o => o.id === post.firmId);
              return (
                <motion.div 
                  key={post.id} 
                  variants={fadeUp}
                  layout 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <HoverAuraCard className="bg-white rounded-[2.5rem] border border-jet-black/5 shadow-sm hover:border-emerald-lime/20 transition-all duration-500 overflow-hidden">
                    {/* Post Header */}
                    <div className="p-4 sm:p-8 pb-3 sm:pb-4 flex justify-between items-start">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Link href={`/organizations/${post.firmId}`} className="w-10 h-10 sm:w-12 sm:h-12 bg-jet-black text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-heading font-black text-[10px] sm:text-xs hover:bg-emerald-lime transition-all duration-700 shadow-xl group">
                          <span className="group-hover:scale-110 transition-transform">{firm?.initials}</span>
                        </Link>
                        <div>
                          <Link href={`/organizations/${post.firmId}`} className="font-heading font-black text-jet-black hover:text-emerald-lime transition-colors block leading-none text-base sm:text-lg tracking-tight">{firm?.name}</Link>
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-gray/40 uppercase tracking-[0.2em] flex items-center gap-2 mt-1 sm:mt-1.5">
                            {post.timestamp} <span className="w-1 h-1 bg-soft-gray rounded-full"></span> <span className="text-emerald-lime">{post.category}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
                          className="p-3 text-slate-gray/40 hover:text-jet-black hover:bg-soft-gray rounded-xl transition-all"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        <AnimatePresence>
                          {openMenu === post.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              className="absolute right-0 top-14 w-56 bg-white border border-jet-black/5 rounded-[1.5rem] shadow-2xl z-50 p-3 overflow-hidden backdrop-blur-xl"
                            >
                               <button onClick={() => setOpenMenu(null)} className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-xl transition-all flex items-center gap-3">
                                  <LinkIcon className="w-4 h-4 text-emerald-lime" /> Direct Resource Link
                               </button>
                               <button onClick={() => setOpenMenu(null)} className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-xl transition-all flex items-center gap-3">
                                  <ShieldCheck className="w-4 h-4 text-emerald-lime" /> Trust Verification
                               </button>
                               <div className="my-2 border-t border-soft-gray/50"></div>
                               <button onClick={() => setOpenMenu(null)} className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3">
                                  Archive Insight
                               </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 sm:px-8 pb-4 sm:pb-8 space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl font-heading font-black text-jet-black tracking-tighter leading-[1.1]">{post.title}</h3>
                      <p className="text-base sm:text-lg text-slate-gray/70 leading-relaxed font-light">{post.content}</p>
                    </div>

                    {/* Social Actions */}
                    <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-soft-gray/30 flex flex-col sm:flex-row sm:items-center justify-between bg-soft-gray/10 gap-4 group/actions">
                      <div className="flex items-center gap-5 sm:gap-10 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all group shrink-0 ${post.isLiked ? 'text-emerald-lime' : 'text-slate-gray/40 hover:text-jet-black'}`}
                        >
                          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 group-active:scale-125 transition-all ${post.isLiked ? 'fill-emerald-lime' : ''}`} /> {post.localLikes} <span className="hidden xs:inline">Insights</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-gray/40 hover:text-jet-black text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all group shrink-0">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current" /> 12 Discussion
                        </button>
                        <button className="flex items-center gap-2 text-slate-gray/40 hover:text-jet-black text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all group shrink-0">
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current" /> 5 Shares
                        </button>
                      </div>
                      <Link href={`/organizations/${post.firmId}`} className="text-[9px] sm:text-[10px] font-black text-emerald-lime uppercase tracking-[0.25em] hover:translate-x-2 transition-transform inline-flex items-center gap-2 sm:gap-3 group/link">
                         ANALYTICS <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </HoverAuraCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Sidebar Widgets — hidden on mobile */}
        <div className="hidden lg:block lg:col-span-4 space-y-10">
          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-white p-8 rounded-[2.5rem] border border-jet-black/5 shadow-sm">
              <h2 className="text-[11px] font-black text-jet-black mb-10 uppercase tracking-[0.4em] flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-lime" /> Institutional Trends
              </h2>
              <div className="space-y-10">
                <div className="group cursor-pointer">
                  <p className="text-[10px] font-black text-emerald-lime uppercase tracking-[0.3em] mb-2">M&A Strategy</p>
                  <h4 className="text-lg font-black text-jet-black group-hover:text-emerald-lime transition-colors leading-[1.1] tracking-tighter">Global capital flow shifts reaching record highs in Q2</h4>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="w-1.5 h-1.5 bg-emerald-lime rounded-full animate-ping"></div>
                     <p className="text-[10px] text-slate-gray/40 font-black uppercase tracking-[0.2em]">112 FIRMS DIRECTING</p>
                  </div>
                </div>
                <div className="group cursor-pointer pt-10 border-t border-soft-gray/30">
                  <p className="text-[10px] font-black text-slate-gray/30 uppercase tracking-[0.3em] mb-2">Regulation</p>
                  <h4 className="text-lg font-black text-jet-black group-hover:text-emerald-lime transition-colors leading-[1.1] tracking-tighter">New ESG compliance frameworks enforced for Tier 1 institutions</h4>
                  <div className="flex items-center gap-2 mt-4">
                     <p className="text-[10px] text-slate-gray/40 font-black uppercase tracking-[0.2em]">45 UPDATES PUBLISHED</p>
                  </div>
                </div>
              </div>
              <Link href="/network">
                <Button variant="ghost" className="w-full mt-12 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-lime border-2 border-emerald-lime/20 rounded-2xl hover:bg-emerald-lime/5 transition-all">
                  Browse All Expertise <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>
            </HoverAuraCard>
          </motion.div>

          {/* Active Channels Card - Interactive */}
          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-jet-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-lime/10 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:bg-emerald-lime/20 transition-all duration-700"></div>
               <h3 className="text-[11px] font-black mb-10 uppercase tracking-[0.4em] flex items-center gap-3 relative z-10 text-emerald-lime">
                 <Briefcase className="w-5 h-5" /> Active Channels
               </h3>
               <div className="space-y-5 relative z-10">
                  <div className="p-6 bg-white/5 border border-white/5 rounded-[1.75rem] hover:bg-white/10 transition-all cursor-pointer border-l-4 border-l-emerald-lime group/ch hover:scale-[1.02]">
                     <p className="text-[10px] font-black text-emerald-lime uppercase tracking-[0.3em] mb-2 font-heading">Priority Engagement</p>
                     <h4 className="text-lg font-black leading-none tracking-tighter flex items-center justify-between">
                        Q2 M&A Due Diligence
                        <div className="w-2 h-2 bg-emerald-lime rounded-full animate-ping"></div>
                     </h4>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 rounded-[1.75rem] hover:bg-white/10 transition-all cursor-pointer group/ch hover:scale-[1.02]">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 font-heading">Standard Advisory</p>
                     <h4 className="text-lg font-black leading-none tracking-tighter">Tax Strategy Audit</h4>
                  </div>
               </div>
            </HoverAuraCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-white p-8 rounded-[2.5rem] border border-jet-black/5 shadow-sm text-center">
              <h2 className="text-[11px] font-black text-jet-black mb-10 uppercase tracking-[0.4em] flex items-center gap-3 justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-lime" /> Verification Tier
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] mb-3">
                   <span className="text-slate-gray/40">Tier Status</span>
                   <span className="text-jet-black">Institutional Elite</span>
                </div>
                <div className="w-full h-2 bg-soft-gray rounded-full overflow-hidden">
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-lime shadow-[0_0_15px_rgba(110,231,183,0.3)]" 
                   />
                </div>
                <p className="text-[10px] text-slate-gray/50 mt-6 font-black uppercase tracking-[0.2em] leading-relaxed">System scan complete. Your institutional quota resets in 4 days.</p>
              </div>
            </HoverAuraCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
