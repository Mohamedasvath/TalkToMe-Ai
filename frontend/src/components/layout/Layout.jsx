import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Wind,
  BookOpen,
  Users,
  User,
  ShieldAlert,
} from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const isChat = location.pathname === "/chat";

  // const navItems = [
  //   { path: "/", label: "Home", icon: <Home size={20} /> },
  //   { path: "/chat", label: "Chat", icon: <MessageSquare size={20} /> },
  //   { path: "/relax", label: "Relax", icon: <Wind size={20} /> },
  //   { path: "/journal", label: "Journal", icon: <BookOpen size={20} /> },
  //   { path: "/community", label: "Community", icon: <Users size={20} /> },
  //   { path: "/profile", label: "Profile", icon: <User size={20} /> },
  // ];

  return (
    <div className="h-screen bg-[#050607] text-white selection:bg-blue-500/30 font-sans overflow-hidden">
      
      {/* 🌌 ENHANCED AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[50%] bg-blue-600/[0.08] blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/[0.08] blur-[140px] rounded-full" />
      </div>

      {/* --- DESKTOP ISLAND NAV --- */}
      {/* Increased z-index to 150 to stay above Chat header */}
      {/* <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 w-fit min-w-[500px] z-[150] px-8 py-3 backdrop-blur-3xl bg-black/60 border border-white/10 rounded-full items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 text-sm font-bold tracking-tighter mr-8">
          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center italic text-xs">T</div>
          TalkToMe
        </div>

        <div className="flex gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="relative py-1 group">
                <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  active ? "text-blue-400" : "text-gray-500 group-hover:text-white"
                }`}>
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <button className="ml-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500 transition-all duration-300 text-[10px] font-black text-red-500 hover:text-white">
          <ShieldAlert size={14} />
          SOS
        </button>
      </nav> */}

      {/* --- CONTENT WRAPPER --- */}
      {/* 
          If it's the chat page, we remove padding because the Chat component 
          is already h-screen and has its own header.
      */}
      <main className={`relative z-10 h-full ${isChat ? 'pt-0' : 'pt-24 md:pt-32'} overflow-y-auto no-scrollbar`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- MOBILE APP DOCK --- */}
      {/* 
          Hidden when keyboard is likely open or based on page preference.
          Added pointer-events-auto to ensure buttons work.
      */}
      {/* <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-[150] pointer-events-auto">
        <div className="bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 flex justify-around items-center shadow-2xl">
          {navItems.slice(0, 5).map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path} className="relative py-2 px-4">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center justify-center transition-all duration-300 ${
                    active ? "text-blue-400" : "text-gray-500"
                  }`}
                >
                  <div className="relative">
                    {item.icon}
                    {active && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full"
                      />
                    )}
                  </div>
                  <span className="text-[9px] mt-1 font-bold uppercase tracking-tighter">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav> */}
    </div>
  );
};

export default Layout;