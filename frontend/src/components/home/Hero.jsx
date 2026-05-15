import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    title1: "Find Your",
    title2: "Inner Peace",
    sub: "A calm space to talk, breathe, heal, and reconnect with yourself through guided emotional support.",
    glow: "99,102,241",
  },
  {
    img: "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?q=80&w=661&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title1: "Breathe Into",
    title2: "Better Days",
    sub: "Feel lighter with mindfulness exercises, relaxing conversations, and emotional wellness tools.",
    glow: "129,140,248",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    title1: "Your Safe",
    title2: "Healing Space",
    sub: "Private support, peaceful experiences, and mental wellness designed for your everyday life.",
    glow: "165,180,252",
  },
];

export default function HeroSection({
  scrollToSection,
}) {
  const [idx, setIdx] = useState(0);
  

  const current = HERO_SLIDES[idx];

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

   const navigate = useNavigate();

  
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current.img}
          src={current.img}
          alt=""
          initial={{
            opacity: 0,
            scale: 1.12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60 z-10" />

      {/* LIGHT FOG */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[2px] z-10" />

      {/* MOUNTAIN FADE */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/70 to-transparent z-10" />

      {/* CONTENT */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-6 py-28 text-center">
        <motion.div
          key={idx}
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="max-w-5xl"
        >
          {/* TOP TAG */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
           

          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="text-white leading-[0.92] font-semibold"
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
              fontSize:
                "clamp(56px,9vw,120px)",
            }}
          >
            {current.title1}

            <br />

            <span
              className="italic"
              style={{
                color: `rgba(${current.glow},1)`,
                textShadow: `0 0 35px rgba(${current.glow},0.35)`,
              }}
            >
              {current.title2}
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
            }}
            className="mt-8 mx-auto max-w-2xl text-white/70 leading-relaxed text-[17px] md:text-[20px]"
            style={{
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            {current.sub}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
            }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <button
              onClick={() =>
                navigate("/chat")
              }
              className="group px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-2xl"
            >
              Start Talking

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button
              onClick={() =>
                scrollToSection("resources")
              }
              className="px-8 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Resources
            </button>
          </motion.div>

          {/* TRUST TEXT */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="mt-16"
          >
            <p className="text-white/40 text-sm tracking-[0.25em] uppercase">
              Safe • Calm • Anonymous • Supportive
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM FADE LANDSCAPE */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="h-44 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* SLIDER INDICATORS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-500 ${
              idx === i
                ? "w-12 h-2 bg-white"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}