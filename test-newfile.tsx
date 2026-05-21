import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Repositories", path: "/repositories" },
    { name: "Active Repositories", path: "/active-repos" },
    { name: "Configuration Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#0f172a] text-slate-200 overflow-hidden">

      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#0f172a] border-b border-white/10 flex items-center justify-between px-4 py-3">
        <p className="text-sm sm:text-base font-semibold text-white">
          AI Documentation Engine
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50
          w-[75%] sm:w-[260px] md:w-[260px]
          bg-white/[0.03] backdrop-blur-xl border-r border-white/10
          flex flex-col justify-between
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Top Section */}
        <div>

          {/* Logo */}
          <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-white/10">
            <p className="text-base sm:text-lg md:text-xl font-bold text-white break-words leading-tight">
              AI Documentation Engine
            </p>
          </div>

          {/* Navigation */}
          <div className="px-2 sm:px-4 py-4 sm:py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full
                    px-3 sm:px-4 
                    py-2.5 sm:py-3 
                    rounded-lg sm:rounded-xl
                    text-sm sm:text-base
                    cursor-pointer
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-600/20 text-white border border-blue-500/30"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 text-[10px] sm:text-xs text-slate-500">
          v1.0 • Dashboard
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 min-w-0 relative overflow-x-hidden pt-14 md:pt-0">

        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/10 blur-[120px] sm:blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/10 blur-[120px] sm:blur-[140px] rounded-full pointer-events-none" />

        {/* Page Content */}
        <main className="relative w-full min-w-0 p-3 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
