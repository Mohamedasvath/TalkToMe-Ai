import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Bookmark, 
  History, 
  Sparkles,
  Search,
  StickyNote
} from "lucide-react";

export default function NotepadJournal() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journal_v2")) || [];
    setEntries(saved);
  }, []);

  const saveEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      id: Date.now(),
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' })
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journal_v2", JSON.stringify(updated));
    setText("");
  };

  const deleteEntry = (id) => {
    const filtered = entries.filter((e) => e.id !== id);
    setEntries(filtered);
    localStorage.setItem("journal_v2", JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-slate-200 font-sans">
      
      {/* 🌌 Atmospheric Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-24 pb-40 relative z-10">
        
        {/* TOP NAVIGATION / HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-serif italic font-medium">Daily Reflections</h1>
            <p className="text-slate-500 text-sm mt-1">Capture your soul's whispers</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition">
              <History size={20} className="text-slate-400" />
            </button>
            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition">
              <Search size={20} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* 🗒️ THE PHYSICAL NOTEPAD INPUT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#111214] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Notepad Red Margin Line */}
          <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-red-900/40 z-20" />
          
          {/* Notepad Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="p-8 pl-16 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-blue-400/60">
                <Bookmark size={16} fill="currentColor" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">New Entry</span>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing..."
              className="w-full h-48 bg-transparent outline-none text-lg md:text-xl leading-[2rem] placeholder:text-slate-700 resize-none font-medium"
              style={{
                backgroundImage: 'linear-gradient(transparent, transparent 31px, rgba(255,255,255,0.03) 31px)',
                backgroundSize: '100% 32px'
              }}
            />

            <div className="mt-8 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={saveEntry}
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20"
              >
                Close Page
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 📚 SAVED PAGES (THE ARCHIVE) */}
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <h2 className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold">Archives</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group"
                >
                  <div className="flex gap-6">
                    {/* Date Sidebar */}
                    <div className="w-12 pt-1 flex flex-col items-center">
                      <span className="text-xl font-bold text-slate-200 leading-none">{entry.date.split(' ')[0]}</span>
                      <span className="text-[10px] uppercase text-slate-600 mt-1">{entry.date.split(' ')[1]}</span>
                      <div className="w-[2px] flex-1 bg-white/5 my-4" />
                    </div>

                    {/* Entry Card */}
                    <div className="flex-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-[2rem] p-8 transition-all group-hover:border-white/10 shadow-sm hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-mono text-blue-400/50 uppercase tracking-widest">{entry.weekday} • {entry.time}</span>
                        <button 
                          onClick={() => deleteEntry(entry.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-full text-red-500/50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-lg font-light italic italic-none tracking-tight">
                        "{entry.content}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {entries.length === 0 && (
              <div className="text-center py-20 opacity-20">
                <StickyNote size={48} className="mx-auto mb-4" />
                <p className="text-sm tracking-widest uppercase">The diary is empty</p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* 🪄 BOTTOM INFO BIT */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 text-[10px] text-slate-700 tracking-[0.4em] uppercase pointer-events-none">
        End of Journal • Stay Mindful
      </div>
    </div>
  );
}