// src/pages/relax/Music.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, ListMusic, Heart } from "lucide-react";

const PLAYLIST = [
  {
    id: 1,
    title: "fire ",
    artist: "Deep Relax",
    url: "/music/campfire.mp3",
    cover:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000",
  },

  {
    id: 2,
    title: "Nature",
    artist: "Nature Calm",
    url: "/music/nature.mp3",
    cover:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000",
  },

  {
    id: 3,
    title: "Ocean Waves",
    artist: "Sleep Therapy",
    url: "/music/waves.mp3",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
  },

  {
    id: 4,
    title: "Deep Meditation",
    artist: "Zen Space",
    url: "/music/rain medium.mp3",
    cover:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  },

  {
    id: 5,
    title: "bird music",
    artist: "Peaceful Mind",
    url: "/music/nature.mp3",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
  },
];

export default function MusicPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  
  const currentTrack = PLAYLIST[currentIdx];

  // FIX 1: Robust Audio Control
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Browsers require a promise check for .play()
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIdx]);

  // FIX 2: Reset progress when changing track
  useEffect(() => {
    setProgress(0);
  }, [currentIdx]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) setProgress((current / duration) * 100);
    }
  };

  const nextTrack = () => {
    setCurrentIdx((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true); // Auto-play next
  };

  const prevTrack = () => {
    setCurrentIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  // Seek Functionality
  const handleSeek = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* BACKGROUND BLUR */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img src={currentTrack.cover} className="w-full h-full object-cover blur-[100px]" alt="" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mt-15 z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ALBUM ART */}
        <div className="flex justify-center mt-5">
          <motion.div 
            key={currentTrack.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            {/* Pulsing Visualizer Ring */}
            <motion.div 
              animate={isPlaying ? { scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-6 rounded-full border-2 border-cyan-500/30 blur-sm"
            />
            <img src={currentTrack.cover} className="w-full h-full object-cover rounded-[40px] shadow-2xl border border-white/10" alt="" />
          </motion.div>
        </div>

        {/* INFO & CONTROLS */}
        <div className="flex flex-col">
          <h2 className="text-5xl font-light mb-2 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {currentTrack.title}
          </h2>
          <p className="text-cyan-400 text-xs tracking-[0.4em] uppercase mb-12 opacity-70">{currentTrack.artist}</p>

          {/* CUSTOM PROGRESS BAR */}
          <div 
            className="w-full h-1.5 bg-white/10 rounded-full mb-10 cursor-pointer relative"
            onClick={handleSeek}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button onClick={prevTrack} className="hover:text-cyan-400 transition-colors"><SkipBack size={32} /></button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-xl"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </motion.button>
            <button onClick={nextTrack} className="hover:text-cyan-400 transition-colors"><SkipForward size={32} /></button>
          </div>

          {/* PLAYLIST SECTION */}
          <div className="mt-12 space-y-2">
            {PLAYLIST.map((t, i) => (
              <button 
                key={t.id}
                onClick={() => { setCurrentIdx(i); setIsPlaying(true); }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${i === currentIdx ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <span className="text-xs opacity-30">{i + 1}</span>
                <span className={`text-sm ${i === currentIdx ? 'text-cyan-400 font-bold' : 'text-white/70'}`}>{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <audio
  ref={audioRef}
  src={currentTrack.url}
  onTimeUpdate={handleTimeUpdate}
  onEnded={nextTrack}
  crossOrigin="anonymous"
  preload="auto"
/>
    </div>
  );
}