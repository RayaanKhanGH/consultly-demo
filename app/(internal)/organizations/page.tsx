"use client";

import { motion, Variants } from "framer-motion";
import { Search, Building2, ChevronRight, Globe, ShieldCheck, ArrowRight, UserPlus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { useState } from "react";
import { organizations } from "../../data/platformData";

const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 15 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};

export default function OrganizationsPage() {
  const [query, setQuery] = useState("");
  const filteredOrgs = organizations.filter(o => 
    o.name.toLowerCase().includes(query.toLowerCase()) || 
    o.domain.toLowerCase().includes(query.toLowerCase()) ||
    o.hq.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12 max-w-7xl mx-auto">
      {/* Header & Search */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-jet-black/5 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-jet-black">Institutions</h1>
          <p className="text-slate-gray text-xs sm:text-sm mt-1">Directory of premier global advisory and legal firms.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-gray" />
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by firm or domain..." 
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-jet-black/10 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-lime transition-all" 
            />
          </div>
        </div>
      </motion.div>

      {/* Grid - Refined Profile Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrgs.length > 0 ? filteredOrgs.map((org) => (
          <motion.div 
            key={org.id} 
            variants={fadeUp} 
            className="bg-white border border-jet-black/5 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-lime/20 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="h-20 sm:h-24 bg-soft-gray relative overflow-hidden">
               <div className="absolute inset-0 bg-emerald-lime opacity-5"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
               <div className="absolute -bottom-5 sm:-bottom-6 left-5 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 bg-jet-black text-white rounded-xl flex items-center justify-center font-heading font-black text-lg sm:text-xl shadow-xl group-hover:bg-emerald-lime transition-colors duration-500">
                  {org.initials}
               </div>
            </div>
            
            <div className="p-6 sm:p-8 pt-8 sm:pt-10 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-heading font-black text-jet-black group-hover:text-emerald-lime transition-all leading-tight">{org.name}</h3>
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-soft-gray text-[8px] font-black uppercase tracking-widest text-slate-gray rounded-sm border border-jet-black/5">
                    {org.tier}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <p className="text-[8.5px] sm:text-[9px] font-black text-slate-gray/70 uppercase tracking-[0.15em] flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> {org.hq}
                </p>
                <p className="text-[8.5px] sm:text-[9px] font-black text-emerald-lime uppercase tracking-[0.15em] flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" /> {org.domain}
                </p>
              </div>
              
              <div className="space-y-2 border-t border-soft-gray/50 pt-5 mt-auto">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-gray font-medium">Verified Roster</span>
                  <span className="font-heading font-black text-jet-black">{org.consultants}+ Specialists</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-gray font-medium">Followers</span>
                  <span className="font-bold text-jet-black">{org.followers} Institutional Users</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
               <Link href={`/organizations/${org.id}`}>
                 <Button variant="outline" className="w-full py-3 rounded-xl group-hover:bg-jet-black group-hover:text-white group-hover:border-jet-black transition-all font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-soft-gray">
                   View Intelligence Profile <ArrowRight className="w-3.5 h-3.5 ml-2" />
                 </Button>
               </Link>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-24 text-center text-slate-gray font-medium italic text-lg opacity-50">
            No organizations matching "{query}"
          </div>
        )}
      </div>
    </motion.div>
  );
}
