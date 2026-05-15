// src/pages/relax/Breath.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Play, Pause, RotateCcw, Activity } from "lucide-react";

// Professional 4-7-8 Breathing Rhythm
const phases = [
  { name: "Inhale", duration: 4, lungScale: 1.2, color: "#22d3ee", instruction: "Deeply through the nose", flow: "in" },
  { name: "Hold", duration: 7, lungScale: 1.2, color: "#8b5cf6", instruction: "Maintain the stillness", flow: "none" },
  { name: "Exhale", duration: 8, lungScale: 0.8, color: "#0ea5e9", instruction: "Slowly through the mouth", flow: "out" },
];

export default function Breath() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [seconds, setSeconds] = useState(phases[0].duration);
  const [cycles, setCycles] = useState(0);

  const current = phases[phaseIndex];

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) return prev - 1;
          const nextIndex = (phaseIndex + 1) % phases.length;
          if (nextIndex === 0) setCycles((c) => c + 1);
          setPhaseIndex(nextIndex);
          return phases[nextIndex].duration;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, phaseIndex]);

  const resetSession = () => {
    setRunning(false);
    setPhaseIndex(0);
    setSeconds(phases[0].duration);
    setCycles(0);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center overflow-hidden">
      
      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
        
        {/* Animated Air Particles */}
        {running && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: current.flow === 'in' ? [1.5, 0] : [0, 1.5],
              x: current.flow === 'in' ? [Math.random() * 600 - 300, 0] : [0, Math.random() * 600 - 300],
              y: current.flow === 'in' ? [Math.random() * 600 - 300, 0] : [0, Math.random() * 600 - 300],
            }}
            transition={{ duration: current.duration, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-cyan-300 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        
        {/* MINIMAL HUD */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Wind size={20} className="text-cyan-400" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold">Vagal Tone Activation</span>
          </div>
          <h1 className="text-5xl font-extralight tracking-tight">The Breath</h1>
        </motion.div>

        {/* LUNGS ANIMATION AREA */}
        <div className="relative w-80 h-96 flex items-center justify-center">
          
          {/* Ribcage / Breath Container Ring */}
          <div className="absolute inset-0 rounded-[40%] border border-white/5 bg-white/[0.02] backdrop-blur-3xl" />

          {/* Lungs Visualizer */}
          <div className="relative flex gap-4">
            {[ 'left', 'right' ].map((side) => (
              <motion.div
                key={side}
                animate={{ 
                  scale: current.lungScale,
                  backgroundColor: current.color,
                  borderRadius: side === 'left' ? "100px 40px 100px 60px" : "40px 100px 60px 100px",
                  boxShadow: running ? `0 0 50px ${current.color}33` : "0 0 0px transparent"
                }}
                transition={{ duration: current.duration, ease: "easeInOut" }}
                className="w-24 h-48 opacity-80"
              />
            ))}
            
            {/* Center Phase Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                >
                  <p className="text-sm font-bold uppercase tracking-widest">{current.name}</p>
                  <p className="text-3xl font-light">{seconds}s</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Instruction Label */}
          <motion.p 
            key={current.instruction}
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            className="absolute -bottom-10 text-cyan-100 text-sm italic tracking-wide"
          >
            {current.instruction}
          </motion.p>
        </div>

        {/* CONTROLS */}
        <div className="mt-24 flex items-center gap-12">
          <button onClick={resetSession} className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 transition-all">
            <RotateCcw size={22} />
          </button>

          <button
            onClick={() => setRunning(!running)}
            className="w-24 h-24 rounded-full bg-cyan-400 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] group"
          >
            {running ? 
              <Pause size={36} className="text-slate-950 fill-current" /> : 
              <Play size={36} className="text-slate-950 fill-current translate-x-1" />
            }
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Cycles</span>
            <span className="text-2xl font-light">{cycles}</span>
          </div>
        </div>

        {/* SESSION INFO */}
     
           
      </div>
    </div>
  );
}