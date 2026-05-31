import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { AppGridBackground } from "./AppGridBackground";
import { AIChatOverlay } from "@/components/AIChat";
import { AIQuestionReel } from "./AIQuestionReel";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState("");

  const openChat = (context: string) => {
    setChatContext(context);
    setChatOpen(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.8 })
        .from(headlineRef.current, { y: 44, opacity: 0, skewY: 2 }, "-=0.6")
        .from(subtextRef.current, { y: 20, opacity: 0 }, "-=0.8")
        .from(
          ctaRef.current?.children || [],
          { y: 20, opacity: 0, stagger: 0.1 },
          "-=0.8",
        )
        .from(
          rightColRef.current,
          { x: 60, opacity: 0, duration: 1.1 },
          "-=1.0",
        );

      const onMouseMove = (e: MouseEvent) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX - 400,
          y: e.clientY - 400,
          duration: 1.5,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
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
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen overflow-hidden flex items-center"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <AppGridBackground />
        </div>

        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen z-0"
        />

        {/* Two-column layout */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-20 py-20 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 ">
          {/* ── Left col: Copy ─────────────────────────────────────────── */}
          <div className="flex-1 max-w-[560px]">
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

            <h1
              ref={headlineRef}
              className="text-5xl md:text-[76px] font-bold leading-[1.02] tracking-tight text-white mb-8"
            >
              One Platform.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
                Every Business.
              </span>
            </h1>

            <p
              ref={subtextRef}
              className="text-lg md:text-xl leading-relaxed text-slate-400 max-w-xl mb-12"
            >
              Replace your fragmented tech stack with a unified OS for business.
              Deeply integrated operations for organizations that demand
              precision.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-5">
              <button
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                className="px-8 py-4 bg-indigo-600 text-white text-[15px] font-semibold rounded-xl transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.6)]"
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

          {/* ── Right col: Question Reel ─────────────────────────────── */}
          <div
            ref={rightColRef}
            className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 lg:max-w-[720px]"
          >
            <AIQuestionReel onOpen={openChat} />
          </div>
        </div>

        {/* Side decoration */}
        <div className="absolute bottom-0 right-0 p-10 hidden xl:block pointer-events-none opacity-40">
          <div className="text-[10px] font-mono text-slate-600 rotate-90 origin-right translate-y-[-100%] uppercase tracking-[0.5em]">
            Connectivity • Automation • Scalability
          </div>
        </div>
      </section>

      {/* Overlay — outside section so overflow:hidden never clips it */}
      <AIChatOverlay
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialContext={chatContext}
      />
    </>
  );
}
