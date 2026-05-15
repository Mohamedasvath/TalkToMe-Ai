import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, Wind, ShieldCheck, MessageCircle, ArrowUpRight, Zap } from "lucide-react";

// Components (Ensure these paths match your project structure)
import BottomBar from "../components/bottombar/BottomBar";
import StickyNavbar from "../components/navbar/Navbar";
import HeroSection from "../components/home/Hero";
import FeaturesSection from "../components/home/Features";

/* ═══════════════════════════════════════════════════════════
   UTILITIES & HELPER FUNCTIONS (The Missing Parts)
═══════════════════════════════════════════════════════════ */

function FontInjector() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return null;
}

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold, margin: "0px 0px -100px 0px" });
  return [ref, inView];
};

function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 1: SCROLLING MARQUEE
═══════════════════════════════════════════════════════════ */
function ScrollingText() {
  return (
    <div className="py-20 bg-white/5 border-y border-white/5 overflow-hidden flex whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 items-center"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-20 items-center">
            <span className="text-6xl md:text-8xl font-bold text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>PEACE</span>
            <span className="text-6xl md:text-8xl font-bold text-white">SAFE</span>
            <span className="text-6xl md:text-8xl font-bold text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>SEQURE</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 2: BENTO GRID
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   NEW SECTION 3: BREATHING SYNC
═══════════════════════════════════════════════════════════ */
function BreathingSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 bg-[#04050a]">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2000" className="w-full h-full object-cover opacity-10" alt="Mist" />
      </div>
      <div className="relative z-10 text-center">
        <Reveal><h2 className="text-4xl md:text-6xl text-white font-serif italic mb-20">Take a moment to breathe</h2></Reveal>
        <div className="relative flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-indigo-500/30 blur-3xl absolute" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="w-48 h-48 md:w-72 md:h-72 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <span className="text-white tracking-widest uppercase text-xs">Breathe</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 4: PARALLAX IMAGE MASK
═══════════════════════════════════════════════════════════ */
function VibeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  return (
    <section ref={ref} className="px-6 md:px-14 py-28">
      <motion.div style={{ scale }} className="relative h-[60vh] md:h-[80vh] rounded-[48px] overflow-hidden">
        <img src="https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Calm" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
           <h2 className="text-5xl md:text-8xl text-white font-serif italic">Your journey, <br/> at your pace.</h2>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW SECTION 5: EXPERT LIST
═══════════════════════════════════════════════════════════ */
function ExpertSection() {
  return (
    <section className="px-6 md:px-14 py-28 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl text-white font-serif leading-tight">Backed by <br/> Science.</h2>
          <p className="mt-6 text-white/50 text-lg">Combining psychology with empathetic technology.</p>
        </Reveal>
        <div className="space-y-4">
          {["CBT Frameworks", "Mindfulness Techniques", "Crisis Intervention", "Anxiety Management"].map((text, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all cursor-pointer">
                <span className="text-xl text-white/70 group-hover:text-white">{text}</span>
                <ArrowUpRight className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXISTING SECTIONS (Chat, Stories, FinalCTA)
═══════════════════════════════════════════════════════════ */

function ChatSection() {
  return (
    <section className="px-6 md:px-14 py-28">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <p className="uppercase tracking-[0.35em] text-indigo-300 text-xs mb-5">AI Companion</p>
            <h2 className="text-5xl md:text-7xl text-white leading-[0.95] font-serif">Someone who <br /> always listens.</h2>
            <p className="mt-7 text-white/60 text-lg max-w-xl">A safe place for anxiety, loneliness, and difficult moments.</p>
            <button onClick={() => scrollToSection("cta")} className="mt-10 px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold">Start Conversation</button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="bg-indigo-500/20 text-indigo-100 p-5 rounded-3xl rounded-tl-md max-w-sm">Hey 💙 I'm here with you.</div>
              <div className="bg-white/10 text-white p-5 rounded-3xl rounded-tr-md ml-auto max-w-sm">I feel lost lately...</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="px-6 md:px-14 py-28">
      <Reveal><div className="text-center mb-20"><h2 className="text-5xl md:text-7xl text-white font-serif">Real stories. Real healing.</h2></div></Reveal>
      <div className="grid md:grid-cols-2 gap-7">
        {[1, 2].map((item) => (
          <Reveal key={item} delay={item * 0.1}>
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10">
              <p className="text-white/75 text-xl italic">“TalkToMe helped me through my darkest nights. I finally felt heard.”</p>
              <div className="mt-8 text-white/40 text-sm uppercase tracking-widest">— Anonymous User</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 md:px-14 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600/20 to-pink-600/10 p-10 md:p-20 text-center border border-white/10">
          <h2 className="text-5xl md:text-8xl text-white font-serif italic">Your story <br /> isn't over.</h2>
          <button className="mt-10 px-10 py-4 rounded-full bg-white text-black hover:scale-105 transition-all font-semibold">Start Healing Today</button>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <FontInjector />
      <div className="bg-[#04050a] text-white overflow-x-hidden font-sans">
        <StickyNavbar />
        <div id="home"><HeroSection scrollToSection={scrollToSection} /></div>
        
        <ScrollingText />
       
        <BreathingSection />
        
        <div id="features"><FeaturesSection /></div>
        
        <VibeSection />
        {/* <ExpertSection /> */}
        
        <div id="chat"><ChatSection /></div>
        {/* <div id="stories"><StoriesSection /></div> */}
        <div id="cta"><FinalCTA /></div>
        
        <BottomBar />
      </div>
    </>
  );
}