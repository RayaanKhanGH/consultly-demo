"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User, Settings, Shield, LogOut, Info, ChevronDown, CheckCircle2 } from "lucide-react";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Feed", path: "/dashboard" },
    { name: "Expert Directory", path: "/network" },
    { name: "Organisations", path: "/organizations" },
    { name: "Portal Inbox", path: "/messages" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-soft-gray font-body flex flex-col overflow-x-hidden">
      {/* Internal Navigation */}
      <nav className="sticky top-0 w-full bg-white z-[100] border-b border-jet-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-12">
            <Link href="/" className="text-lg sm:text-x font-heading font-black tracking-tighter hover:text-emerald-lime transition-all duration-500">
              Consultly
            </Link>
            
            <div className="hidden lg:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/dashboard");
                return (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    className={`text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-5 mt-5 ${isActive ? "text-jet-black" : "text-slate-gray/60 hover:text-jet-black"}`}
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
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2 sm:gap-4 p-1 rounded-2xl transition-all border border-transparent"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-black text-jet-black leading-tight uppercase tracking-widest flex items-center gap-1 justify-end">
                    demo@consult.ly <CheckCircle2 className="w-3 h-3 text-emerald-lime" />
                  </div>
                  <div className="text-[8px] text-slate-gray/60 uppercase tracking-[0.3em] font-black mt-0.5">ELITE TIER</div>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-jet-black text-white flex items-center justify-center font-heading font-black text-xs shadow-lg overflow-hidden">
                   DC
                </div>
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAccountOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 top-[3.5rem] w-64 sm:w-72 bg-white border border-jet-black/5 rounded-3xl shadow-2xl z-50 p-3"
                    >
                       <div className="px-5 py-4 bg-soft-gray/30 rounded-2xl mb-2 flex items-center gap-4">
                          <div className="w-10 h-10 bg-jet-black text-white rounded-xl flex items-center justify-center font-heading font-black">DC</div>
                          <div className="min-w-0">
                             <h4 className="text-[10px] sm:text-xs font-black text-jet-black uppercase tracking-widest truncate">Demo Client</h4>
                             <p className="text-[8px] font-black text-emerald-lime uppercase tracking-[0.2em] mt-0.5">Institutional Node</p>
                          </div>
                       </div>
                       <div className="space-y-0.5">
                          <button className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-xl transition-all flex items-center gap-3">
                             <User className="w-4 h-4" /> Profile
                          </button>
                          <button className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-gray hover:bg-soft-gray hover:text-jet-black rounded-xl transition-all flex items-center gap-3">
                             <Shield className="w-4 h-4" /> Auth
                          </button>
                          <Link href="/" className="block pt-2">
                            <button className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3">
                               <LogOut className="w-4 h-4" /> Logout
                            </button>
                          </Link>
                       </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`w-5 h-0.5 bg-jet-black transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
              <div className={`w-5 h-0.5 bg-jet-black transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
              <div className={`w-5 h-0.5 bg-jet-black transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Mesh */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-soft-gray overflow-hidden"
            >
               <div className="flex flex-col p-6 gap-2">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-jet-black hover:bg-soft-gray rounded-2xl transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 relative">
        {children}
      </main>
    </div>
  );
}
