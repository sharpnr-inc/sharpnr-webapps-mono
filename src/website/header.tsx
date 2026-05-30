"use client";

import { useState } from "react";

const navItems = [
  { label: "Product", badge: null },
  { label: "Storage", badge: null },
  { label: "Databases", badge: "New" },
  { label: "Security", badge: null },
  { label: "Pricing", badge: null },
  { label: "Docs", badge: null },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Product");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Ticker */}
      <div className="bg-cyan-500/5 border-b border-cyan-500/10 py-1.5 px-4 text-center text-[11px] tracking-widest text-cyan-400/50 font-mono">
        SILO v2.4 — NATIVE POSTGRES 16 &amp; MARIADB 11
        SUPPORT&nbsp;&nbsp;·&nbsp;&nbsp;
        <span className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors">
          READ RELEASE NOTES →
        </span>
      </div>

      {/* Nav bar */}
      <header className="bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/[0.08]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <svg
              width="28"
              height="28"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="24"
                height="24"
                rx="4"
                stroke="rgba(0,210,255,0.3)"
                strokeWidth="1"
              />
              <rect
                x="7"
                y="7"
                width="16"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.15)"
                stroke="rgba(0,210,255,0.4)"
                strokeWidth="0.75"
              />
              <rect
                x="7"
                y="13"
                width="16"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.1)"
                stroke="rgba(0,210,255,0.3)"
                strokeWidth="0.75"
              />
              <rect
                x="7"
                y="19"
                width="10"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.06)"
                stroke="rgba(0,210,255,0.2)"
                strokeWidth="0.75"
              />
              <circle cx="24" cy="21" r="3" fill="#00D2FF" opacity="0.9" />
            </svg>
            <div className="flex flex-col gap-px">
              <span className="font-display text-[17px] font-extrabold tracking-[0.12em] text-slate-100 uppercase leading-none">
                Silo
              </span>
              <span className="font-mono text-[10px] text-cyan-400/50 tracking-widest leading-none">
                by SharpNR
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center flex-1 justify-center">
            {navItems.map(({ label, badge }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap
                  ${
                    activeNav === label
                      ? "text-slate-100 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-px after:bg-cyan-400 after:shadow-[0_0_8px_rgba(0,210,255,0.7)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                {label}
                {badge && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 bg-cyan-400/10 border border-cyan-400/25 rounded text-cyan-400 tracking-wider">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/5 border border-emerald-400/15 font-mono text-[10px] text-emerald-400/70 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
              All systems operational
            </div>
            <div className="w-px h-5 bg-slate-700/50" />
            <button className="px-4 py-2 text-[13px] font-medium text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600 rounded-md transition-all">
              Sign in
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all hover:shadow-[0_0_20px_rgba(0,210,255,0.35)] hover:-translate-y-px">
              Deploy Silo <span className="text-[11px]">→</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block h-px w-5 bg-slate-400 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-px w-3.5 bg-slate-400 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4.5 bg-slate-400 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-cyan-500/[0.08] px-6 pb-5">
          {navItems.map(({ label, badge }) => (
            <button
              key={label}
              onClick={() => {
                setActiveNav(label);
                setMenuOpen(false);
              }}
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-slate-400 hover:text-slate-200 border-b border-slate-800/60 transition-colors"
            >
              {label}
              {badge && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-cyan-400/10 border border-cyan-400/25 rounded text-cyan-400">
                  {badge}
                </span>
              )}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2 text-sm text-slate-400 border border-slate-700 rounded-md">
              Sign in
            </button>
            <button className="flex-1 py-2 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-md">
              Deploy Silo →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
