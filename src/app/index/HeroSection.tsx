"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { AppGridBackground } from "./AppGridBackground";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          headlineRef.current,
          {
            y: 40,
            opacity: 0,
            skewY: 2,
            stagger: 0.1,
          },
          "-=0.6",
        )
        .from(
          subtextRef.current,
          {
            y: 20,
            opacity: 0,
          },
          "-=0.8",
        )
        .from(
          ctaRef.current?.children || [],
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
          },
          "-=0.8",
        );

      // Spotlight Mouse Movement
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = clientX;
        const y = clientY;

        gsap.to(spotlightRef.current, {
          x: x - 400,
          y: y - 400,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Button Logic
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center "
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AppGridBackground />
      </div>

      {/* Spotlight Effect */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen z-0"
      />

      <div className="relative z-10 px-8 md:px-20 py-20 max-w-4xl pointer-events-none">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-widest">
            Sharpnr Engine V1.0 • Now Public
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-6xl md:text-[84px] font-bold leading-[1.02] tracking-tight text-white mb-8"
        >
          One Platform.
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
            Every Business.
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-lg md:text-xl leading-relaxed text-slate-400 max-w-xl mb-12"
        >
          Replace your fragmented tech stack with a unified OS for business.
          Deeply integrated operations for organizations that demand precision.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-5 pointer-events-auto">
          <button
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="group relative px-8 py-4 bg-indigo-600 text-white text-[15px] font-semibold rounded-xl transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.6)]"
          >
            Start your transformation
          </button>
          <button
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 text-[15px] font-medium rounded-xl transition-all"
          >
            See how it works →
          </button>
        </div>
      </div>

      {/* Side Visual Decoration */}
      <div className="absolute bottom-0 right-0 p-10 hidden xl:block pointer-events-none opacity-50">
        <div className="text-[10px] font-mono text-slate-600 rotate-90 origin-right translate-y-[-100%] uppercase tracking-[0.5em]">
          Connectivity • Automation • Scalability
        </div>
      </div>
    </section>
  );
}
