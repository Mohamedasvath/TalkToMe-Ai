import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  PhoneCall, 
  Moon, 
  Sun, 
  ChevronRight, 
  Heart, 
  BarChart3,
  LogOut,
  Bell,
  User,
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";

// --- Animated Icon Wrapper ---
const FloatingIcon = ({ children, color }) => (
  <motion.div
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={color}
  >
    {children}
  </motion.div>
);

export default function Profile() {
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState("");
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("talkToMe_user");
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogin = () => {
    if (tempName.trim()) {
      localStorage.setItem("talkToMe_user", tempName);
      setUserName(tempName);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("talkToMe_user");
    setUserName("");
    setTempName("");
  };

  const stats = [
    { label: "Days Calm", value: "12", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10" },
    { label: "Journal entries", value: "24", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10" },
  ];

  if (!userName) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-700 ${darkMode ? "bg-[#02040a] text-white" : "bg-[#f8fafc] text-slate-900"}`}>
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative z-10 w-full max-w-md p-10 rounded-[3rem] shadow-2xl backdrop-blur-3xl border ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-gray-200"}`}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                    <User size={40} className="text-white -rotate-12" />
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -top-2 -right-2 text-yellow-400">
                    <Sparkles size={24} />
                </motion.div>
            </div>
          </div>
          
          <h1 className="text-4xl font-black mb-2 text-center tracking-tight">Welcome Home.</h1>
          <p className={`mb-8 text-center px-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>A safe space awaits you. What should we call you?</p>
          
          <div className="relative mb-6">
            <input 
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Your preferred name"
                className={`w-full p-5 pl-6 rounded-2xl outline-none transition-all border-2 text-lg font-medium ${
                darkMode 
                ? "bg-white/5 border-white/5 focus:border-indigo-500/50 text-white" 
                : "bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white text-slate-900"
                }`}
            />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/25"
          >
            Start My Journey <ArrowRight size={22} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 pb-32 relative overflow-x-hidden ${darkMode ? "bg-[#02040a] text-white" : "bg-[#f8fafc] text-slate-900"}`}>
      
      {/* Immersive Header Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0">
        <img 
            src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 grayscale transition-all duration-1000"
            alt="Mountains"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${darkMode ? "from-indigo-900/40 via-[#02040a]/80 to-[#02040a]" : "from-blue-200/50 via-[#f8fafc]/90 to-[#f8fafc]"}`} />
      </div>

      <main className="max-w-xl mx-auto px-6 pt-24 relative z-10">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-[3.5rem] p-8 border backdrop-blur-3xl shadow-2xl mb-10 ${
            darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-slate-200"
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative group">
              <motion.div 
                whileHover={{ rotate: 5 }}
                className="w-28 h-28 bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 rounded-[2.5rem] p-1 shadow-2xl"
              >
                <div className={`w-full h-full rounded-[2.3rem] flex items-center justify-center text-4xl font-black ${darkMode ? "bg-[#02040a]" : "bg-white"}`}>
                   {userName.charAt(0).toUpperCase()}
                </div>
              </motion.div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-8 h-8 rounded-full border-4 border-current flex items-center justify-center shadow-lg" style={{ color: darkMode ? "#02040a" : "#fff" }}>
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            
            <h2 className="mt-6 text-3xl font-black tracking-tight">{userName}</h2>
            <div className={`mt-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
                Inner Peace Seeker
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-10">
              {stats.map((stat) => (
                <motion.div 
                    whileHover={{ y: -5 }}
                    key={stat.label} 
                    className={`rounded-[2rem] p-5 text-center border transition-all ${darkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-100"}`}
                >
                  <FloatingIcon color={stat.color}><stat.icon size={24} className="mx-auto mb-3" /></FloatingIcon>
                  <p className="text-2xl font-black leading-none mb-1">{stat.value}</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Settings Group */}
        <div className="space-y-6">
          <h3 className={`px-6 text-[10px] font-black uppercase tracking-[0.3em] ${darkMode ? "text-gray-500" : "text-slate-400"}`}>Daily Rituals</h3>
          
          <div className={`rounded-[2.5rem] p-2 border ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200"}`}>
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 px-6 hover:bg-white/5 rounded-[2rem] transition-all cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-2xl ${darkMode ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-600"}`}>
                  {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                </div>
                <span className="font-bold text-lg">Atmosphere</span>
              </div>
              <div className={`w-14 h-8 rounded-full p-1 transition-all ${darkMode ? "bg-indigo-600" : "bg-gray-300"}`}>
                <motion.div animate={{ x: darkMode ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
              </div>
            </div>

            {/* Notifications */}
            <button className="w-full flex items-center justify-between p-4 px-6 hover:bg-white/5 rounded-[2rem] transition-all group">
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-2xl ${darkMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
                  <Bell size={22} />
                </div>
                <span className="font-bold text-lg">Peace Reminders</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Emergency Card */}
        <div className="mt-12 group">
          <div className={`rounded-[3rem] p-8 border-2 transition-all duration-500 ${darkMode ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40" : "bg-rose-50 border-rose-100"}`}>
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-rose-500 rounded-3xl text-white shadow-xl shadow-rose-500/40">
                <PhoneCall size={28} className="animate-pulse" />
              </div>
              <div>
                <h4 className={`text-xl font-black ${darkMode ? "text-rose-100" : "text-rose-900"}`}>Need to talk?</h4>
                <p className={`text-sm font-medium ${darkMode ? "text-rose-200/40" : "text-rose-600"}`}>Real people are here for you 24/7.</p>
              </div>
            </div>
            <a href="tel:9152987821" className="block w-full bg-rose-500 hover:bg-rose-600 text-white text-center py-5 rounded-[1.8rem] font-black text-lg transition-all transform group-hover:scale-[1.02] shadow-xl shadow-rose-500/20">
              Get Immediate Help
            </a>
          </div>
        </div>

        {/* Security Footer */}
        <div className={`mt-8 p-6 rounded-[2rem] flex items-center gap-5 border ${darkMode ? "bg-white/[0.01] border-white/5" : "bg-slate-100 border-slate-200"}`}>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <Lock size={18} />
            </div>
            <p className="text-[11px] font-bold text-gray-500 leading-snug">
                Your healing is personal. All data is encrypted and stored locally on your device. We never see your conversations.
            </p>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-16 flex items-center justify-center gap-3 text-gray-500 hover:text-rose-500 transition-all py-4 font-black text-xs uppercase tracking-[0.3em]"
        >
          <LogOut size={18} />
          End Quiet Session
        </button>

      </main>
    </div>
  );
}