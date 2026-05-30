"use client";

import { AppGridBackground } from "./AppGridBackground";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">
      <AppGridBackground />

      <div className="relative z-10 px-14 py-20 max-w-xl pointer-events-none">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] mb-7">
          <span className="relative flex h-[5px] w-[5px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-[5px] w-[5px] bg-green-400" />
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.18em]">
            Sharpnr-Engine V1.0 Live
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[58px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-50 mb-4">
          One Platform.
          <br />
          <span className="text-indigo-400">Every Business.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[15px] leading-[1.7] text-slate-500 max-w-sm mb-9">
          Deeply integrated operations for organizations that refuse to stitch
          together disconnected tools.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 pointer-events-auto">
          <button className="px-6 py-[11px] bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-medium rounded-lg transition-colors">
            Get started
          </button>
          <button className="px-6 py-[11px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-500 hover:text-slate-300 text-[13px] rounded-lg transition-colors">
            Explore products →
          </button>
        </div>
      </div>
    </section>
  );
}
