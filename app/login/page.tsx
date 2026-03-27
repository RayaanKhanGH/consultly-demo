"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, Lock, Fingerprint, Network, Terminal, Building2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";

export default function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const router = useRouter();

  const loadingSequence = [
    { label: "Identity Vetting...", icon: Fingerprint, color: "text-emerald-lime" },
    { label: "RSA Key Generation...", icon: Lock, color: "text-emerald-lime" },
    { label: "Tunnel Establishment...", icon: Network, color: "text-emerald-lime" },
    { label: "Handshake Complete.", icon: CheckCircle2, color: "text-emerald-lime" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      if (loadingStep < loadingSequence.length) {
        const timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const redirectTimer = setTimeout(() => {
          router.push("/dashboard");
        }, 600);
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [isLoading, loadingStep, router]);

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-emerald-lime selection:text-jet-black font-body">
      {/* Left Column - Institutional Branding */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-jet-black text-white relative overflow-hidden">
        {/* Animated Background Aura */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-full h-full bg-emerald-lime rounded-full blur-[150px] pointer-events-none"
        />
        
        <div className="relative z-10">
          <Link href="/" className="text-3xl font-heading font-black tracking-tighter text-white hover:text-emerald-lime transition-colors">
            Consultly.
          </Link>
        </div>

        <div className="relative z-10 max-w-xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="space-y-8"
           >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-lime">
                <Terminal className="w-4 h-4" /> Secure Enterprise Access
              </div>
              <h1 className="text-6xl font-heading font-black tracking-tighter leading-[0.9]">
                The standard <br/>for institutional <br/>authorities.
              </h1>
              <p className="text-xl text-white/40 font-light leading-relaxed font-body">
                Authorized entry point for the world's premier strategic, legal, and financial talent pools.
              </p>
           </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-12 pt-10 border-t border-white/10">
           <div className="space-y-1">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Institutional Verification</p>
              <p className="text-3xl font-heading font-black text-emerald-lime">Tier 1 Elite</p>
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Data Compliance</p>
              <p className="text-3xl font-heading font-black text-white flex items-center gap-2">AES-256 <ShieldCheck className="w-6 h-6 text-emerald-lime" /></p>
           </div>
        </div>
      </div>

      {/* Right Column - Login Portal */}
      <div className="relative flex items-center justify-center p-8 bg-soft-gray/30">
        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-jet-black/5"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-black text-jet-black tracking-tight mb-2">Institutional Login</h2>
                <p className="text-slate-gray/50 text-[10px] font-black uppercase tracking-[0.25em]">Authorized Global Partners Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-jet-black uppercase tracking-[0.3em] font-heading ml-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="demo@consult.ly"
                    className="w-full px-6 py-4 bg-soft-gray/50 border border-jet-black/5 rounded-2xl text-[13px] font-bold focus:outline-none focus:border-emerald-lime focus:ring-4 focus:ring-emerald-lime/5 transition-all"
                  />
                </div>
                <div className="space-y-2 pb-4">
                  <label className="text-[9px] font-black text-jet-black uppercase tracking-[0.3em] font-heading ml-2">Secure Password</label>
                  <input 
                    type="password" 
                    defaultValue="••••••••"
                    className="w-full px-6 py-4 bg-soft-gray/50 border border-jet-black/5 rounded-2xl text-[13px] font-bold focus:outline-none focus:border-emerald-lime focus:ring-4 focus:ring-emerald-lime/5 transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-5 rounded-2xl bg-jet-black text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-lime/10 group overflow-hidden relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div 
                    animate={{ transform: isHovered ? "translateX(4px)" : "translateX(0px)" }}
                    className="flex items-center justify-center gap-2 relative z-10"
                  >
                    Authenticate Entry <ArrowRight className="w-4 h-4" />
                  </motion.div>
                  <div className="absolute inset-0 bg-emerald-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </form>

              <div className="mt-10 pt-8 border-t border-soft-gray flex flex-col items-center gap-4">
                 <p className="text-[9px] font-black text-slate-gray/40 uppercase tracking-[0.2em] mb-2 text-center leading-relaxed">External Identity Providers</p>
                 <div className="grid grid-cols-2 gap-4 w-full">
                    <button type="button" className="flex items-center justify-center gap-3 py-3 px-6 bg-white border border-jet-black/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:border-jet-black transition-all">
                       <Building2 className="w-4 h-4" /> Microsoft 365
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 py-3 px-6 bg-white border border-jet-black/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:border-jet-black transition-all">
                       <Fingerprint className="w-4 h-4" /> Biometric
                    </button>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="loading-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-sm text-center space-y-12"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-3xl bg-jet-black flex items-center justify-center shadow-2xl relative z-10">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-2 border-2 border-emerald-lime/20 border-t-emerald-lime rounded-2xl"
                   />
                   <ShieldCheck className="w-12 h-12 text-emerald-lime animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-emerald-lime/20 blur-3xl opacity-50"></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-black text-jet-black tracking-tight">{loadingSequence[loadingStep === loadingSequence.length ? loadingStep - 1 : loadingStep].label}</h3>
                <div className="flex justify-center gap-2">
                   {loadingSequence.map((step, i) => (
                     <div 
                       key={i} 
                       className={`h-1.5 rounded-full transition-all duration-700 ${i <= loadingStep ? 'w-8 bg-emerald-lime shadow-[0_0_10px_rgba(0,200,150,0.5)]' : 'w-4 bg-soft-gray'}`} 
                     />
                   ))}
                </div>
              </div>

              <div className="bg-jet-black text-white p-6 rounded-[2rem] border border-white/5 text-left font-mono text-[10px] space-y-1.5 opacity-80 backdrop-blur-md">
                 <p className="text-emerald-lime">-- ACCESS_LOG --</p>
                 <p className="text-white/40">[{new Date().toLocaleTimeString()}] Handshaking node: LONDON_SECURE_TOWER</p>
                 <p className="text-white/40">[{new Date().toLocaleTimeString()}] Authenticating certificate ID: P-42881-A</p>
                 <p className={loadingStep >= 1 ? "text-white" : "text-white/20"}>RSA KEY GENERATION COMPLETE (4096-bit)</p>
                 <p className={loadingStep >= 2 ? "text-white" : "text-white/20"}>SECURE TUNNEL ESTABLISHED: AES-256-GCM</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// Helper to make the Logo Link work
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
   return <a href={href} className={className}>{children}</a>;
}
