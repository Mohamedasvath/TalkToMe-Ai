// src/pages/relax/Sleep.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Volume2, VolumeX, RotateCcw } from "lucide-react";

export default function Sleep() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const tickAudio = useRef(null);

  useEffect(() => {
    // Using a reliable public sample of a clock tick
    tickAudio.current = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_24917992a0.mp3"); 
    tickAudio.current.loop = true;
    tickAudio.current.volume = 0.5;

    return () => {
      if (tickAudio.current) {
        tickAudio.current.pause();
        tickAudio.current = null;
      }
    };
  }, []);

  // Control audio playback based on state
  useEffect(() => {
    if (!tickAudio.current) return;

    if (isSleeping && !isMuted) {
      const playPromise = tickAudio.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback prevented. Interaction required:", error);
        });
      }
    } else {
      tickAudio.current.pause();
    }
  }, [isSleeping, isMuted]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isSleeping) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSleeping]);

  const resetSleep = () => {
    setIsSleeping(false);
    setTimer(0);
  };

  return (
    <div className="relative min-h-screen bg-[#050510] text-indigo-100 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: Math.random() * 5 + 2, repeat: Infinity }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + "px", height: Math.random() * 2 + "px",
              top: Math.random() * 100 + "%", left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Sleeping Cat Visual */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          
          {/* Floating Zzz Animation */}
          <AnimatePresence>
            {isSleeping && (
              <>
                {[1, 2, 3].map((id) => (
                  <motion.span
                    key={id}
                    initial={{ opacity: 0, scale: 0.5, y: 0, x: 20 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.8, 1.2, 1.5], 
                      y: -120, x: [20, 40, 30] 
                    }}
                    transition={{ 
                      duration: 4, repeat: Infinity, 
                      delay: id * 1.3, ease: "easeOut"
                    }}
                    className="absolute text-indigo-300 font-bold text-3xl select-none"
                    style={{ top: "20%", right: "15%" }}
                  >
                    Z
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Cat Body */}
          <motion.div 
            animate={isSleeping ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-56 h-36 bg-indigo-300/90 rounded-full shadow-2xl flex flex-col items-center justify-center"
            style={{ borderRadius: "60% 60% 40% 40% / 80% 80% 40% 40%" }}
          >
            {/* Ears */}
            <div className="absolute -top-3 left-8 w-10 h-10 bg-indigo-300 rotate-[-15deg]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <div className="absolute -top-3 right-8 w-10 h-10 bg-indigo-300 rotate-[15deg]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />

            {/* Face */}
            <div className="flex gap-10 mt-4">
              <motion.div 
                animate={isSleeping ? { height: 2 } : { height: 10 }}
                className="w-8 bg-indigo-900 rounded-full" 
              />
              <motion.div 
                animate={isSleeping ? { height: 2 } : { height: 10 }}
                className="w-8 bg-indigo-900 rounded-full" 
              />
            </div>
            <div className="w-2 h-1 bg-pink-400/60 rounded-full mt-2" />
          </motion.div>
        </div>

        {/* Timer Display */}
        <div className="text-center -mt-10 mb-12">
          <p className="text-5xl font-light font-mono text-indigo-200/80">
            {new Date(timer * 1000).toISOString().substr(14, 5)}
          </p>
          <span className="text-[10px] tracking-[0.4em] uppercase text-indigo-500">Night Mode</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMuted(!isMuted)} className="p-4 rounded-full bg-white/5 border border-white/10 text-indigo-400">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={() => setIsSleeping(!isSleeping)}
            className={`px-12 py-4 rounded-2xl font-bold tracking-widest transition-all ${
              isSleeping 
              ? "bg-transparent border border-indigo-500 text-indigo-500" 
              : "bg-indigo-600 text-white"
            }`}
          >
            {isSleeping ? "WAKE UP" : "SLEEP NOW"}
          </button>

          <button onClick={resetSleep} className="p-4 rounded-full bg-white/5 border border-white/10 text-indigo-400">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}