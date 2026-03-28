"use client";

import { Search, Info, Paperclip, MoreVertical, Phone, Video, X, ShieldCheck, Mail, Globe, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Button } from "../../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

function MessagesContent() {
  const searchParams = useSearchParams();
  const contactIdParam = searchParams.get('contactId');
  
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [query, setQuery] = useState("");
  // Mobile UX: track which panel is visible on small screens
  const [mobileView, setMobileView] = useState<"contacts" | "chat">("contacts");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [contacts, setContacts] = useState([
    { id: "goldman", name: "Goldman Strategy Group", firm: "HQ Office • Wall St", location: "New York, USA", email: "hq@goldman.com", time: "Just Now", preview: "Waiting for connection...", lastMessageAt: Date.now() + 1000 },
    { id: "skadden", name: "Skadden LLP", firm: "Executive Office", location: "London, UK", email: "office@skadden.com", time: "9:15 AM", preview: "You: Received clearly.", lastMessageAt: new Date('2026-03-26T09:15:00').getTime() },
    { id: "bcg", name: "Boston Consulting Group", firm: "Innovation Hub", location: "Boston, USA", email: "innovate@bcg.com", time: "10:30 AM", preview: "New quantum risk study available.", lastMessageAt: new Date('2026-03-26T10:30:00').getTime() },
    { id: "bain", name: "Bain & Company", firm: "Strategic Ops Center", location: "Boston, USA", email: "ops@bain.com", time: "11:45 AM", preview: "Supply chain decoupling brief...", lastMessageAt: new Date('2026-03-26T11:45:00').getTime() },
    { id: "mcKinsey", name: "McKinsey & Partners", firm: "Global Strategy Lab", location: "Zurich, CH", email: "lab@mckinsey.com", time: "Yesterday", preview: "I have received the proposal...", lastMessageAt: new Date('2026-03-25T14:15:00').getTime() },
    { id: "aurelius", name: "Aurelius Capital", firm: "Private Equity Desk", location: "Zurich, CH", email: "desk@aurelius.capital", time: "Tuesday", preview: "New secure channel requested.", lastMessageAt: new Date('2026-03-24T10:00:00').getTime() },
  ]);

  const [activeContactId, setActiveContactId] = useState(contactIdParam || "goldman");

  useEffect(() => {
    if (contactIdParam && contacts.some(c => c.id === contactIdParam)) {
      setActiveContactId(contactIdParam);
      setMobileView("chat");
    }
  }, [contactIdParam]);

  const [chatHistories, setChatHistories] = useState<Record<string, any[]>>({
    "goldman": [
      { id: 1, sender: "GS", name: "Goldman Strategy Group", time: "9:00 AM", text: "Welcome to the corporate channel for Goldman Strategy Group. This channel is monitored by our senior executive staff. How can we assist your enterprise today?", isMe: false, attached: null }
    ],
    "skadden": [
      { id: 1, sender: "SK", name: "Skadden LLP", time: "9:00 AM", text: "I've reviewed the preliminary filings for the Q2 merger. The structural inefficiencies in the capital flow are evident. However, we have a clear path to minimize taxation overhead across EMEA zones.", isMe: false, attached: null },
      { id: 2, sender: "You", name: "You", time: "9:15 AM", text: "Received clearly. The executive board is eager to review this methodology. If everything checks out, we will initiate the electronic signatures by EOD. I will follow up shortly after the briefing.", isMe: true, attached: null }
    ],
    "mcKinsey": [
      { id: 1, sender: "MP", name: "McKinsey & Partners", time: "Yesterday, 2:00 PM", text: "Our global strategy lab is finalizing the resiliency report for your Q4 outlook.", isMe: false, attached: null },
      { id: 2, sender: "MP", name: "McKinsey & Partners", time: "Yesterday, 2:15 PM", text: "I have received the proposal. I will look at it and get back to you with my modifications by end of week.", isMe: false, attached: null }
    ],
    "aurelius": [
      { id: 1, sender: "AC", name: "Aurelius Capital", time: "Tuesday", text: "New secure channel requested by the management committee regarding distressed asset acquisition.", isMe: false, attached: null }
    ],
  });

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];
  const activeChats = chatHistories[activeContactId] || [];

  const sortedAndFilteredContacts = useMemo(() => {
    return [...contacts]
      .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
      .filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [contacts, query]);

  const handleSend = () => {
    if (!message.trim()) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestamp = now.getTime();
    const newChat = { id: Date.now(), sender: "You", name: "You", time: timeString, text: message, isMe: true, attached: null };
    setChatHistories(prev => ({ ...prev, [activeContactId]: [...(prev[activeContactId] || []), newChat] }));
    setContacts(prev => prev.map(c => c.id === activeContactId ? { ...c, lastMessageAt: timestamp, time: timeString, preview: `You: ${message}` } : c));
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChats]);

  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    setMobileView("chat");
  };

  return (
    <>
      {/* Height fills remaining viewport below sticky nav */}
      <div className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white border border-jet-black/10 shadow-sm flex flex-col md:flex-row font-body rounded-md overflow-hidden relative">
        
        {/* Sidebar - Contacts: full screen on mobile when mobileView==="contacts", hidden otherwise */}
        <div className={`
          w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-soft-gray flex flex-col bg-soft-gray/10 shrink-0
          md:flex
          ${mobileView === "contacts" ? "flex" : "hidden md:flex"}
          flex-col
        `}>
          <div className="p-3 sm:p-4 border-b border-soft-gray bg-white shrink-0">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg font-heading font-bold text-jet-black">Inbox</h2>
              <button className="text-slate-gray hover:text-jet-black p-1"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-gray" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 bg-soft-gray/50 border border-jet-black/10 rounded-md text-xs font-medium focus:outline-none focus:bg-white focus:border-emerald-lime transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {sortedAndFilteredContacts.map((c) => {
              const isActive = c.id === activeContactId;
              const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <motion.div
                  layout
                  key={c.id}
                  onClick={() => handleSelectContact(c.id)}
                  className={`p-3 border-l-[3px] flex gap-3 cursor-pointer items-start border-b border-soft-gray/50 transition-colors ${isActive ? 'border-l-emerald-lime bg-white shadow-sm z-10' : 'border-l-transparent hover:bg-white/50'}`}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs flex-shrink-0 ${isActive ? 'bg-jet-black text-white' : 'bg-soft-gray text-jet-black'}`}>
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className={`text-sm text-jet-black truncate ${isActive ? 'font-bold' : 'font-semibold'}`}>{c.name}</h3>
                      <span className={`text-[10px] shrink-0 ml-2 ${isActive ? 'text-emerald-lime font-bold' : 'text-slate-gray'}`}>{c.time}</span>
                    </div>
                    <p className="text-xs truncate text-slate-gray">{c.preview}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Chat Area: full screen on mobile when mobileView==="chat", hidden otherwise */}
        <div className={`
          flex-1 flex flex-col bg-white overflow-hidden relative
          ${mobileView === "chat" ? "flex" : "hidden md:flex"}
        `}>
          
          {/* Chat Header */}
          <div className="h-12 sm:h-14 border-b border-soft-gray px-3 sm:px-4 flex items-center justify-between flex-shrink-0 bg-white shadow-sm z-10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Mobile back button */}
              <button
                onClick={() => setMobileView("contacts")}
                className="md:hidden p-1.5 -ml-1 text-slate-gray hover:text-jet-black rounded-lg hover:bg-soft-gray transition-colors shrink-0"
                title="Back to contacts"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xs sm:text-sm font-bold text-jet-black truncate">{activeContact.name}</h2>
              <span className="px-1.5 py-0.5 bg-soft-gray rounded text-[9px] font-semibold text-slate-gray uppercase hidden xl:inline-block shrink-0">{activeContact.firm}</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-lime shrink-0" title="Online"></span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-slate-gray shrink-0">
              <button className="hover:text-jet-black p-1.5"><Phone className="w-3.5 h-3.5" /></button>
              <button className="hover:text-jet-black p-1.5"><Video className="w-3.5 h-3.5" /></button>
              <div className="w-px h-4 bg-soft-gray mx-0.5"></div>
              <button onClick={() => setShowDetails(true)} className="hover:text-jet-black p-1 flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase bg-soft-gray/50 px-2 sm:px-3 py-1.5 rounded-md">
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Details</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 flex flex-col">
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-soft-gray"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-gray bg-white px-2">Secure Institutional Channel</span>
              <div className="flex-1 h-px bg-soft-gray"></div>
            </div>

            {activeChats.map((chat) => (
              <div key={chat.id} className="flex gap-2 sm:gap-4 mt-3 sm:mt-6">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded flex-shrink-0 flex items-center justify-center font-bold text-[10px] sm:text-xs mt-0.5 ${chat.isMe ? 'bg-jet-black text-white' : 'bg-soft-gray text-jet-black'}`}>
                  {chat.sender}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                    <span className="font-bold text-xs sm:text-sm text-jet-black">{chat.name}</span>
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-gray uppercase bg-soft-gray/50 px-1.5 py-0.5 rounded-sm">{chat.time}</span>
                  </div>
                  <p className="text-[13px] sm:text-[15px] text-jet-black leading-relaxed whitespace-pre-wrap">
                    {chat.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white shrink-0">
            <div className="border border-jet-black/20 rounded focus-within:border-emerald-lime focus-within:ring-1 focus-within:ring-emerald-lime bg-white flex flex-col transition-all shadow-sm">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${activeContact.name}...`}
                className="w-full max-h-32 min-h-[3rem] px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-jet-black focus:outline-none resize-none bg-transparent"
                rows={1}
              />
              <div className="flex justify-between items-center px-1.5 py-1.5 bg-soft-gray/20 border-t border-soft-gray/50 rounded-b">
                <div className="flex flex-row gap-1">
                  <button className="p-1.5 text-slate-gray hover:text-jet-black hover:bg-soft-gray rounded transition-colors"><Paperclip className="w-4 h-4" /></button>
                </div>
                <Button
                  variant="primary"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="py-1.5 px-4 sm:px-6 text-xs rounded shadow-none bg-emerald-lime hover:bg-emerald-lime/90 text-white font-bold disabled:opacity-50 tracking-wide"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-xl border border-jet-black/5 w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 border-b border-soft-gray flex justify-between items-center bg-soft-gray/30">
                <h3 className="font-heading font-bold text-lg text-jet-black">Contact Details</h3>
                <button onClick={() => setShowDetails(false)} className="text-slate-gray hover:text-jet-black p-1 rounded-full hover:bg-white transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-soft-gray rounded-xl flex items-center justify-center font-heading font-bold text-2xl text-jet-black">
                    {activeContact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-jet-black text-lg leading-tight">{activeContact.name}</h4>
                    <p className="text-xs font-semibold text-emerald-lime uppercase tracking-widest mt-1">{activeContact.firm}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-soft-gray">
                  <div className="flex items-center gap-3 text-sm text-jet-black">
                    <ShieldCheck className="w-4 h-4 text-emerald-lime" />
                    <span className="font-medium">Verified Identity</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-jet-black">
                    <Globe className="w-4 h-4 text-slate-gray" />
                    <span className="font-medium">{activeContact.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-jet-black">
                    <Mail className="w-4 h-4 text-slate-gray" />
                    <span className="font-medium">{activeContact.email}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full py-2.5 rounded-lg text-sm" onClick={() => setShowDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading Secure Channels...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
