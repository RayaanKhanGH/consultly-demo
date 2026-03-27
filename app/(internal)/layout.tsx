"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User, Settings, Shield, LogOut, Info, ChevronDown, CheckCircle2 } from "lucide-react";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const navItems = [
    { name: "Feed", path: "/dashboard" },
    { name: "Expert Directory", path: "/network" },
    { name: "Organisations", path: "/organizations" },
    { name: "Portal Inbox", path: "/messages" },
  ];

  return (
    <div className="min-h-screen bg-soft-gray font-body flex flex-col">
      {/* Internal Navigation */}
      <nav className="sticky top-0 w-full bg-white z-[100] border-b border-jet-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-heading font-black tracking-tighter hover:text-emerald-lime transition-all duration-500 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-jet-black text-white rounded-lg flex items-center justify-center text-xs group-hover:bg-emerald-lime transition-colors">C.</div>
              Consultly
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/dashboard");
                return (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-5 mt-5 ${isActive ? "text-jet-black" : "text-slate-gray/60 hover:text-jet-black"}`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-emerald-lime"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-4 cursor-pointer group hover:bg-soft-gray/50 p-1.5 px-3 rounded-2xl transition-all border border-transparent hover:border-jet-black/5"
            >
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-jet-black leading-tight uppercase tracking-widest flex items-center gap-1 justify-end">
                  demo@consult.ly <CheckCircle2 className="w-3 h-3 text-emerald-lime" />
                </div>
                <div className="text-[8px] text-slate-gray/60 uppercase tracking-[0.3em] font-black mt-0.5">ELITE TIER</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-jet-black text-white flex items-center justify-center font-heading font-black text-xs shadow-lg group-hover:bg-emerald-lime transition-all duration-500 overflow-hidden relative">
                 <div className="absolute inset-0 bg-emerald-lime opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="relative z-10">DC</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-gray transition-transform duration-500 ${isAccountOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isAccountOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsAccountOpen(false)}></div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-[4.5rem] w-72 bg-white border border-jet-black/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 p-3 overflow-hidden"
                  >
                     <div className="px-5 py-4 bg-soft-gray/30 rounded-2xl mb-2 flex items-center gap-4 border border-jet-black/5">
                        <div className="w-12 h-12 bg-jet-black text-white rounded-xl flex items-center justify-center font-heading font-black text-lg">DC</div>
                        <div className="min-w-0">
                           <h4 className="text-xs font-black text-jet-black uppercase tracking-widest truncate">Demo Client</h4>
                           <p className="text-[8px] font-black text-emerald-lime uppercase tracking-[0.2em] mt-1">Verified Institution</p>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <button onClick={() => setIsAccountOpen(false)} className="w-full text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-2xl transition-all flex items-center gap-3 group">
                           <User className="w-4 h-4 text-emerald-lime group-hover:scale-110 transition-transform" /> Institutional Profile
                        </button>
                        <button onClick={() => setIsAccountOpen(false)} className="w-full text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-2xl transition-all flex items-center gap-3 group">
                           <Shield className="w-4 h-4 text-emerald-lime group-hover:scale-110 transition-transform" /> Access & Tiers
                        </button>
                        <button onClick={() => setIsAccountOpen(false)} className="w-full text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-2xl transition-all flex items-center gap-3 group">
                           <Settings className="w-4 h-4 text-emerald-lime group-hover:scale-110 transition-transform" /> General Settings
                        </button>
                        <button onClick={() => setIsAccountOpen(false)} className="w-full text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-2xl transition-all flex items-center gap-3 group">
                           <Info className="w-4 h-4 text-emerald-lime group-hover:scale-110 transition-transform" /> Support & Info
                        </button>
                        <div className="my-2 border-t border-soft-gray/50"></div>
                        <Link href="/" className="block">
                          <button className="w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center gap-3 group">
                             <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Secure Logout
                          </button>
                        </Link>
                     </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 relative">
        {children}
      </main>
    </div>
  );
}
