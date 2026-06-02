import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
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

  return (
    <>
      <section
        ref={sectionRef}
        className="flex justify-center w-full max-w-7xl mx-auto mt-14"
      >
        {/* Two-column layout */}
        <div className="z-10 w-full px-8 md:px-16 lg:px-20 py-20 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 ">
          {/* ── Left col: Copy start ─────────────────────────────────────────── */}
          <div className="flex-1 max-w-[560px]">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping  inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-widest">
                Sharpnr Engine V1.0 • Now Public
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-5xl font-bold leading-[1.02] tracking-tight text-white mb-8"
            >
              One Platform
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
                Every Business
              </span>
            </h1>

            <p ref={subtextRef} className=" text-blue-50 mb-12">
              Replace fragmented tools with Sharpnr's unified OS for business.
              Deeply integrated CRM, HRMS, and Accounting software designed for
              organizations that demand precision.
            </p>
          </div>
          {/* ── Left col: Copy ends ─────────────────────────────────────────── */}

          {/* ── Right col: Question Reel ─────────────────────────────── */}
          <div
            ref={rightColRef}
            className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 lg:max-w-[720px]"
          >
            <AIQuestionReel onOpen={openChat} />
          </div>
          {/* ── Right col: Question Reel ─────────────────────────────── */}
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
