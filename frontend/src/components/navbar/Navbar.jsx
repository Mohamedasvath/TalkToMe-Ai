// src/components/navbar/StickyNavbar.jsx

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

/* FONT ONLY FOR LOGO */
function FontInjector() {
  useEffect(() => {
    const link = document.createElement("link");

    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap";

    link.rel = "stylesheet";

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
}

export default function StickyNavbar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Chat", path: "/chat" },
    { label: "Relax", path: "/relax" },
    { label: "Journal", path: "/journal" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <>
      <FontInjector />

      <header className="fixed top-0 left-0 w-full z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div
            className="
              backdrop-blur-2xl
              bg-black/30
              border border-white/10
              rounded-3xl
              px-5 py-4
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between">
              
              {/* LOGO */}
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                  💙
                </div>

                <div className="text-left">
                  <h1
                    className="text-white text-lg font-bold leading-none"
                    style={{
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    TalkToMe
                  </h1>

                  <p className="text-white/40 text-xs mt-1">
                    Healing Space
                  </p>
                </div>
              </Link>

              {/* DESKTOP NAV */}
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item, i) => {
                  const isActive =
                    location.pathname === item.path;

                  return (
                    <Link
                      key={i}
                      to={item.path}
                      className={`
                        px-5 py-2.5 rounded-full
                        text-sm transition-all duration-300
                        ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {/* CTA BUTTON */}
                <Link
                  to="/chat"
                  className="
                    ml-2 px-6 py-3 rounded-full
                    bg-indigo-500 hover:bg-indigo-600
                    transition-all duration-300
                    text-white font-semibold
                    hover:scale-105
                  "
                  style={{
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  Talk
                </Link>
              </div>

              {/* MOBILE BUTTON */}
              <Link
                to="/chat"
                className="
                  lg:hidden
                  px-5 py-2.5 rounded-full
                  bg-indigo-500
                  text-white text-sm font-semibold
                "
              >
                Talk
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}