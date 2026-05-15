import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Music2,
  Wind,
  Moon,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function Relax() {
  // Smooth animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white selection:bg-cyan-500/30">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover"
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/20 via-[#02040a]/80 to-[#02040a]" />
      </div>

      {/* 2. DYNAMIC AMBIENT GLOWS */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 blur-[140px] rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        
        {/* 3. HERO CONTENT */}
        <div className="text-center mb-20">
        

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-[clamp(48px,8vw,100px)] leading-[1.1] font-light tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Exhale the old, <br />
            <span className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-purple-200">
              Inhale the new.
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-2xl mx-auto text-white/40 text-lg md:text-xl font-light leading-relaxed"
          >
            A curated space for mental clarity. Choose your path to tranquility through sound, breath, or guided AI support.
          </motion.p>
        </div>

        {/* 4. PREMIUM BUTTON GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* MUSIC CARD */}
          <RelaxButton 
            to="/relax/music"
            icon={<Music2 size={28} />}
            title="Mindful Audio"
            label="Calm Music"
            color="cyan"
            delay={0.5}
          />

          {/* SLEEP CARD */}
          <RelaxButton 
            to="/relax/sleep"
            icon={<Moon size={28} />}
            title="Night Fall"
            label="Sleep Timer"
            color="indigo"
            delay={0.6}
          />

          {/* BREATHING CARD */}
          <RelaxButton 
            to="/relax/breathing"
            icon={<Wind size={28} />}
            title="Rhythmic Air"
            label="Breathing"
            color="purple"
            delay={0.7}
          />

          {/* AI CHAT CARD */}
          <RelaxButton 
            to="/chat"
            icon={<MessageCircle size={28} />}
            title="Inner Voice"
            label="Talk to AI"
            color="emerald"
            delay={0.8}
          />

        </div>

      </div>
    </div>
  );
}

// Custom Premium Button Component
function RelaxButton({ to, icon, title, label, color, delay }) {
  const colorMap = {
    cyan: "group-hover:text-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] border-cyan-500/10",
    indigo: "group-hover:text-indigo-400 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] border-indigo-500/10",
    purple: "group-hover:text-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] border-purple-500/10",
    emerald: "group-hover:text-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] border-emerald-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
    >
      <Link to={to} className="group relative block p-8 rounded-[32px] border bg-white/[0.02] backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.06] overflow-hidden">
        {/* Glow Effect on Hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent`} />
        
        <div className={`mb-12 p-4 inline-flex rounded-2xl bg-white/5 transition-all duration-500 ${colorMap[color]}`}>
          {icon}
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium tracking-tight">{label}</span>
            <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}