import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MessageCircle,
  Wind,
  PenTool,
  User,
  Sparkles,
} from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/chat", icon: MessageCircle, label: "Chat" },
  { path: "/relax", icon: Wind, label: "Relax" },
  { path: "/journal", icon: PenTool, label: "Journal" },
  { path: "/profile", icon: User, label: "Me" },
];

export default function BottomBar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      {/* 
        Container with padding for the 'Home Indicator' on iPhone/Modern Android 
        The 'pb-safe' or manual padding ensures the bar doesn't sit too low.
      */}
      <div className="max-w-lg mx-auto px-4 pb-6 pt-2 md:pb-8 pointer-events-auto">
        
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative flex items-center justify-between gap-1
                     bg-[#0f1115]/80 backdrop-blur-3xl 
                     border border-white/[0.08] ring-1 ring-black/50
                     rounded-[2.5rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          
          {/* Main Navigation Group */}
          <div className="flex flex-1 items-center justify-around px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group flex flex-col items-center justify-center py-2 min-w-[50px] transition-all"
                >
                  {/* Indicator Pill for Active State */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute -top-1 w-8 h-[2px] bg-blue-400 rounded-full"
                        style={{
                          boxShadow: "0px 0px 12px #60a5fa",
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon Container */}
                  <motion.div
                    animate={{
                      y: isActive ? -4 : 0,
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>

                  {/* Label - Shows only on mobile or adapts for professional look */}
                  <span
                    className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${
                      isActive ? "text-white opacity-100" : "text-gray-500 opacity-60"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Background Bubble */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-x-0 inset-y-1 bg-gradient-to-b from-white/[0.08] to-transparent rounded-3xl -z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider with subtle gradient */}
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-1" />

          {/* SOS / AI Feature Button - Floating Style */}
         
        </motion.div>
      </div>
    </nav>
  );
}