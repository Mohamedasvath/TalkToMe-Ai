import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PeaceSection({ scrollToSection }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Mouse Spotlight Effect Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Parallax Logic for the Background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  const stats = [
    { number: "24/7", label: "Always Listening", desc: "Support that never sleeps." },
    { number: "100%", label: "Encrypted Peace", desc: "Your secrets are safe here." },
    { number: "Safe", label: "Zero Judgment", desc: "A space to be truly you." },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-6 bg-[#020617]"
    >
      {/* ─── MOUSE SPOTLIGHT (Premium Feel) ─── */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-50"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 80%)`
        }}
      />

      {/* ─── PARALLAX BACKGROUND LAYER ─── */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
          alt="Peaceful Mountains"
          className="w-full h-full object-cover opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </motion.div>

      {/* ─── FLOATING ENERGY ORBS ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-500/20 blur-[140px] rounded-full" 
        />
      </div>

      {/* ─── CONTENT ─── */}
      <motion.div style={{ y: contentY }} className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-24">
          
          {/* Animated Heading (Word by Word) */}
          <h2 className="overflow-hidden text-5xl md:text-8xl text-white font-light tracking-tight leading-[1.1]">
            {"Exhale the stress.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="italic font-serif text-emerald-300/80 block mt-2"
            >
              Inhale the peace.
            </motion.span>
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Healing isn't a race. It's a journey that begins with a single, 
            quiet conversation in a space that truly understands you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 mt-14"
          >
            <button 
              onClick={() => scrollToSection?.("chat")}
              className="relative group px-12 py-5 rounded-full bg-emerald-500 text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10 text-black">Start My Journey</span>
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"
              />
            </button>
            <button 
              onClick={() => scrollToSection?.("features")}
              className="px-12 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all active:scale-95"
            >
              How it works
            </button>
          </motion.div>
        </div>

        {/* ─── STAGGERED CARDS ─── */}
        <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-white/5">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 + (i * 0.2) }}
              whileHover={{ y: -10 }}
              className="relative group p-10 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden"
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/[0.03] transition-colors duration-500" />
              
              <h3 className="text-5xl text-white font-serif mb-3">{stat.number}</h3>
              <p className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase mb-2">{stat.label}</p>
              <p className="text-slate-500 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}