"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, ArrowRight, Loader2, Sparkles, Lock, Terminal, CheckCircle2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

interface EngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultantName: string;
}

export function EngagementModal({ isOpen, onClose, consultantName }: EngagementModalProps) {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const steps = [
    { label: "Vetting Identity...", icon: ShieldCheck },
    { label: "Generating RSA-4096 Key...", icon: Lock },
    { label: "Establishing Secure Tunnel...", icon: Terminal },
    { label: "Handshake Complete. Redirecting...", icon: CheckCircle2 }
  ];

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setLoadingStep(0);
  };

  useEffect(() => {
    if (isTransmitting && loadingStep < steps.length) {
      const timer = setTimeout(() => {
        if (loadingStep === steps.length - 1) {
          onClose();
          router.push("/messages");
          // Reset for next time
          setTimeout(() => {
            setIsTransmitting(false);
            setLoadingStep(0);
          }, 500);
        } else {
          setLoadingStep(prev => prev + 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransmitting, loadingStep, onClose, router]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-jet-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] border border-white/20"
          >
            {/* Header */}
            <div className="px-8 md:px-12 py-10 border-b border-jet-black/5 flex justify-between items-center bg-soft-gray/30 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-lime via-emerald-lime/20 to-transparent"></div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-lime/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-lime/10 text-emerald-lime rounded text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-emerald-lime/20">
                   <ShieldCheck className="w-3.5 h-3.5" /> High-Encryption Channel
                 </div>
                 <h2 className="text-3xl font-heading font-black text-jet-black tracking-tighter">Initiate Direct Connect</h2>
               </div>
               
               <button 
                 onClick={onClose}
                 className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-jet-black/5 hover:bg-jet-black hover:text-white transition-all duration-500 shadow-sm relative z-10"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar relative">
              <AnimatePresence mode="wait">
                {isTransmitting ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-12 text-center space-y-10"
                  >
                    <div className="relative w-24 h-24">
                       <div className="absolute inset-0 border-4 border-emerald-lime/10 rounded-full"></div>
                       <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-t-emerald-lime border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_20px_rgba(110,231,183,0.3)]"
                       ></motion.div>
                       <div className="absolute inset-0 flex items-center justify-center text-emerald-lime">
                          <motion.div
                            key={loadingStep}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            {React.createElement(steps[loadingStep].icon, { className: "w-8 h-8" })}
                          </motion.div>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <motion.h3 
                         key={steps[loadingStep].label}
                         initial={{ y: 10, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         className="text-xl font-heading font-black text-jet-black tracking-tight"
                       >
                         {steps[loadingStep].label}
                       </motion.h3>
                       <p className="text-xs font-bold text-slate-gray uppercase tracking-[0.3em] animate-pulse">Establishing Secure Handshake</p>
                    </div>

                    <div className="w-full max-w-sm h-1.5 bg-soft-gray rounded-full overflow-hidden">
                       <motion.div 
                          className="h-full bg-emerald-lime"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(loadingStep + 1) * 25}%` }}
                          transition={{ duration: 0.8 }}
                       ></motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 md:p-12 space-y-10"
                  >
                    <div className="bg-soft-gray/5 border border-jet-black/5 p-6 rounded-3xl flex items-start gap-5 relative overflow-hidden group hover:border-emerald-lime/20 transition-colors">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-lime/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-14 h-14 bg-jet-black text-white rounded-2xl flex items-center justify-center font-heading font-black text-xl flex-shrink-0 shadow-lg group-hover:bg-emerald-lime transition-colors duration-500">
                        {consultantName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-jet-black mb-1">Direct connect with {consultantName}</h3>
                        <p className="text-[15px] font-light text-slate-gray leading-relaxed">Requested institutional channel requires preliminary context for high-tier authentication.</p>
                      </div>
                    </div>

                    <form onSubmit={handleInitiate} className="space-y-8">
                       <div className="space-y-6">
                          <Input 
                            id="project-name"
                            label="Engagement Title"
                            placeholder="e.g. Q3 Liquidity Audit"
                            required
                            className="rounded-2xl border-soft-gray focus:border-jet-black transition-all bg-soft-gray/30"
                          />
                          
                          <div className="space-y-2">
                             <label className="block text-[10px] font-black text-slate-gray uppercase tracking-[0.2em] mb-2">Scope Blueprint</label>
                             <textarea 
                               className="w-full h-32 px-5 py-4 rounded-2xl border border-soft-gray bg-soft-gray/30 text-jet-black font-medium focus:outline-none focus:border-jet-black focus:bg-white transition-all resize-none shadow-sm placeholder:text-slate-gray/50"
                               placeholder="Briefly define your technical or strategic requirements..."
                               required
                             ></textarea>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <Input 
                              id="timeline"
                              label="Authorized Timeline"
                              placeholder="e.g. 1-3 Months"
                              required
                              className="rounded-2xl border-soft-gray bg-soft-gray/30"
                            />
                            <Input 
                              id="budget"
                              label="Capital Alloc. Estimate"
                              placeholder="e.g. $100k - $250k"
                              required
                              className="rounded-2xl border-soft-gray bg-soft-gray/30"
                            />
                          </div>
                       </div>

                       <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4 border-t border-soft-gray">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onClose} 
                            className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-soft-gray hover:bg-soft-gray/20 transition-all font-bold flex-1 sm:flex-none"
                          >
                            Cancel Protocol
                          </Button>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            className="px-12 py-4 rounded-2xl bg-jet-black text-white hover:bg-jet-black/90 shadow-2xl shadow-emerald-lime/10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] flex-1 sm:flex-none group"
                          >
                            Transmit Proposal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
