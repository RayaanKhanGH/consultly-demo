"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, Building2, ShieldCheck, Heart, UserPlus, Star, ChevronRight, TrendingUp, MessageSquare, Share2, MapPin, MoreHorizontal, LinkIcon, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { organizations, platformPosts, consultants } from "../../../data/platformData";
import { HoverAuraCard } from "../../../components/HoverAuraCard";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 15 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};

export default function FirmDetailPage() {
  const { id } = useParams();
  const org = organizations.find(o => o.id === id);

  const [isFollowing, setIsFollowing] = useState(false);
  const [localFollowers, setLocalFollowers] = useState(org?.followers || 0);
  const [localLikes, setLocalLikes] = useState(org?.likes || 0);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  
  const [posts, setPosts] = useState(
    platformPosts
      .filter(p => p.firmId === id)
      .map(p => ({ ...p, isLiked: false, localLikes: p.likes }))
  );

  const firmConsultants = consultants.filter(c => c.firmId === id);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setLocalFollowers(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const togglePostLike = (postId: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newIsLiked = !p.isLiked;
        setLocalLikes(l => newIsLiked ? l + 1 : l - 1);
        return {
          ...p,
          isLiked: newIsLiked,
          localLikes: newIsLiked ? p.localLikes + 1 : p.localLikes - 1
        };
      }
      return p;
    }));
  };

  if (!org) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-20 text-center">
      <h1 className="text-2xl font-heading font-black text-jet-black mb-6 tracking-tight">Firm Intelligence Not Found</h1>
      <Link href="/organizations">
        <Button variant="primary" className="py-2.5 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest bg-jet-black text-white">Back to Directory</Button>
      </Link>
    </div>
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-10 pb-20 max-w-7xl mx-auto">
      <motion.div variants={fadeUp}>
        <Link href="/organizations" className="inline-flex items-center gap-2 text-slate-gray hover:text-jet-black transition-colors mb-4 font-black text-[9px] uppercase tracking-[0.2em] group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Institutions Directory
        </Link>
      </motion.div>

      {/* Profile Header - Professional Institutional Layout */}
      <motion.div variants={fadeUp}>
        <HoverAuraCard className="bg-white border border-jet-black/5 rounded-[2.5rem] overflow-hidden shadow-sm shadow-emerald-lime/5">
          <div className="h-48 bg-jet-black relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-lime opacity-10 blur-3xl rounded-full -mr-40 -mt-20"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-12 relative">
            <div className="flex flex-col md:flex-row gap-8 items-end -mt-20 mb-10">
              <div className="w-32 h-32 md:w-36 md:h-36 bg-jet-black text-white rounded-[2.5rem] border-4 border-white flex items-center justify-center font-heading font-black text-4xl shadow-2xl relative z-10 group overflow-hidden">
                 <div className="absolute inset-0 bg-emerald-lime opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <span className="relative z-10 group-hover:scale-110 transition-transform duration-700">{org.initials}</span>
              </div>
              
              <div className="flex-1 space-y-2 mb-2">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tighter text-jet-black leading-none">{org.name}</h1>
                  <div className="px-3 py-1 bg-emerald-lime/10 text-emerald-lime rounded text-[9px] font-black uppercase tracking-widest border border-emerald-lime/20">
                    Institutional {org.tier}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-8 pt-3">
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-gray uppercase tracking-[0.2em]"><Building2 className="w-4 h-4 text-emerald-lime" /> {org.domain}</div>
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-gray uppercase tracking-[0.2em]"><MapPin className="w-4 h-4 text-emerald-lime" /> {org.hq}</div>
                </div>
              </div>

              <div className="flex gap-4 pb-2 w-full md:w-auto">
                <Button 
                  onClick={handleFollow}
                  variant={isFollowing ? "outline" : "primary"}
                  className={`flex-1 md:flex-none px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isFollowing ? 'border-emerald-lime text-emerald-lime bg-emerald-lime/5' : 'bg-jet-black text-white hover:bg-jet-black/90 shadow-2xl shadow-emerald-lime/10'}`}
                >
                  {isFollowing ? "Following Channel" : "Follow Institutional Feed"}
                </Button>
                <Link href={`/messages?contactId=${org.id}`} className="flex-1 md:flex-none">
                  <Button variant="outline" className="w-full h-full px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-soft-gray bg-white hover:bg-jet-black hover:text-white transition-all group">
                    Secure Line <MessageSquare className="w-3.5 h-3.5 ml-2 group-hover:fill-current" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-12 py-10 border-y border-soft-gray/30">
               {[
                 { label: "Verified Followers", value: localFollowers, color: "text-jet-black" },
                 { label: "Direct Engagements", value: localLikes, color: "text-jet-black" },
                 { label: "Senior Counsel", value: `${org.consultants}+`, color: "text-jet-black" },
                 { label: "Compliance Score", value: "99.8", color: "text-emerald-lime", icon: ShieldCheck }
               ].map((stat, i) => (
                 <div key={i} className="space-y-1">
                    <p className="text-[9px] font-black text-slate-gray/60 uppercase tracking-[0.3em] font-heading">{stat.label}</p>
                    <p className={`text-3xl font-heading font-black tracking-tighter ${stat.color} flex items-center gap-2`}>
                      {stat.value} {stat.icon && <stat.icon className="w-5 h-5" />}
                    </p>
                 </div>
               ))}
            </div>

            <div className="mt-10">
               <p className="text-xl text-slate-gray font-light max-w-5xl leading-relaxed italic border-l-4 border-emerald-lime/30 pl-8 py-4 bg-soft-gray/20 rounded-r-3xl">
                   {org.description}
               </p>
            </div>
          </div>
        </HoverAuraCard>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 pt-10">
        {/* Left Column - Social Activity */}
        <div className="lg:col-span-8 space-y-8">
          <motion.h2 variants={fadeUp} className="text-[10px] font-black text-jet-black uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-lime" /> Institutional Performance Feed
          </motion.h2>

          <AnimatePresence mode="popLayout">
            {posts.length > 0 ? posts.map((post) => (
              <motion.div 
                key={post.id} 
                variants={fadeUp} 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <HoverAuraCard className="bg-white rounded-[2.5rem] border border-jet-black/5 shadow-sm hover:border-emerald-lime/20 transition-all duration-300">
                  <div className="p-8 md:p-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-jet-black text-white rounded-xl flex items-center justify-center text-[10px] font-heading font-black shadow-lg">
                            {org.initials}
                         </div>
                         <div>
                            <h4 className="text-[10px] font-black text-emerald-lime uppercase tracking-[0.2em] mb-0.5">{post.category}</h4>
                            <p className="text-[10px] font-bold text-slate-gray/50 uppercase tracking-widest">{post.timestamp}</p>
                         </div>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
                          className="text-slate-gray hover:text-jet-black p-2.5 hover:bg-soft-gray rounded-xl transition-all"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <AnimatePresence>
                          {openMenu === post.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              className="absolute right-0 top-12 w-48 bg-white border border-jet-black/5 rounded-2xl shadow-2xl z-50 p-3"
                            >
                               <button onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-xl transition-colors flex items-center gap-2.5">
                                  <LinkIcon className="w-4 h-4" /> Copy Intelligence Link
                               </button>
                               <button onClick={() => setOpenMenu(null)} className="w-full text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2.5">
                                  Archive Update
                               </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <h4 className="text-3xl font-heading font-black text-jet-black tracking-tighter leading-[0.9]">{post.title}</h4>
                      <p className="text-slate-gray text-lg font-light leading-relaxed font-body">{post.content}</p>
                    </div>

                    <div className="flex items-center gap-10 pt-8 border-t border-soft-gray/30">
                      <button 
                        onClick={() => togglePostLike(post.id)}
                        className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${post.isLiked ? 'text-emerald-lime' : 'text-slate-gray hover:text-jet-black'}`}
                      >
                        <Heart className={`w-5 h-5 transition-transform group-active:scale-125 ${post.isLiked ? 'fill-emerald-lime' : ''}`} /> {post.localLikes} Institutional Likes
                      </button>
                      <button className="flex items-center gap-2.5 text-slate-gray hover:text-jet-black text-[10px] font-black uppercase tracking-[0.2em] transition-all group">
                        <MessageSquare className="w-5 h-5 group-hover:fill-current shadow-sm" /> 12 Consultations
                      </button>
                      <button className="flex items-center gap-2.5 text-slate-gray hover:text-jet-black text-[10px] font-black uppercase tracking-[0.2em] transition-all group">
                        <Share2 className="w-5 h-5 group-hover:fill-current" /> Internal Distribution
                      </button>
                    </div>
                  </div>
                </HoverAuraCard>
              </motion.div>
            )) : (
              <div className="py-24 text-center text-slate-gray font-light text-xl bg-white rounded-[2.5rem] border border-dashed border-soft-gray shadow-sm">
                No recent institutional updates.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar - Roster & Verification */}
        <div className="lg:col-span-4 space-y-10">
          <motion.h2 variants={fadeUp} className="text-[10px] font-black text-jet-black uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-emerald-lime" /> Platform Senior Leadership
          </motion.h2>
          
          <div className="space-y-5">
            {firmConsultants.length > 0 ? firmConsultants.map((c) => (
              <motion.div key={c.id} variants={fadeUp}>
                <HoverAuraCard className="bg-white border border-jet-black/5 p-6 rounded-[2rem] hover:shadow-2xl transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-soft-gray/50 rounded-2xl flex items-center justify-center font-heading font-black text-jet-black text-sm group-hover:bg-jet-black group-hover:text-white transition-all duration-500 shadow-sm">
                      {c.name.charAt(0)}{c.name.split(' ').pop()?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-black text-lg text-jet-black tracking-tight group-hover:text-emerald-lime transition-colors">{c.name}</h4>
                      <p className="text-[10px] font-black text-slate-gray/50 uppercase tracking-[0.2em] truncate">{c.expertise}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-5 border-t border-soft-gray/30">
                    <span className="text-[11px] font-black text-jet-black flex items-center gap-1.5 uppercase tracking-widest">
                       <Star className="w-4 h-4 fill-emerald-lime text-emerald-lime" /> {c.rating.toFixed(1)} 
                       <span className="text-slate-gray/40 ml-1 font-bold italic">• Verified</span>
                    </span>
                    <Link href={`/network/${c.id}`} className="p-2.5 bg-soft-gray/50 rounded-xl hover:bg-jet-black hover:text-white transition-all">
                       <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </HoverAuraCard>
              </motion.div>
            )) : (
               <div className="p-12 text-center text-slate-gray border border-dashed border-soft-gray rounded-[2rem] text-sm font-medium italic">
                  Roster currently restricted to enterprise partners.
               </div>
            )}
            <Link href="/network">
              <Button variant="ghost" className="w-full mt-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray border border-soft-gray rounded-2xl hover:bg-jet-black hover:text-white transition-all">
                 Browse Global Leadership Roster
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Sidebar */}
          <motion.div variants={fadeUp}>
            <HoverAuraCard className="bg-jet-black text-white p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-lime/20 rounded-full blur-[80px] -mr-16 -mb-16"></div>
               <h3 className="text-[10px] font-black text-emerald-lime uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Verification Tier
               </h3>
               <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                     <span className="text-white/40">Status</span>
                     <span>Institutional Elite</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-emerald-lime" 
                     />
                  </div>
               </div>
            </HoverAuraCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
