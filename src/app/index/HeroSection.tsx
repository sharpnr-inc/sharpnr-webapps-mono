import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/animations/gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSectionBackground } from "./HerosectionBackground";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const split = SplitText.create(headlineRef.current, {
        type: "lines,words,chars",
      });

      // ── Intro timeline only — no scroll triggers ──
      const tl = gsap.timeline({
        onComplete: () => split.revert(),
      });

      tl.from(split.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          subtextRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
    },

    { scope: sectionRef },
  );

  return (
    // min-h-screen on <section> so the next section's ScrollTrigger
    // can correctly measure where this ends

    <section ref={sectionRef} className="relative w-full min-h-screen">
      {/* overflow-hidden isolated here, not on <section> */}

      <div className="absolute inset-0 overflow-hidden">
        <HeroSectionBackground src="bg_video.mp4" poster="/hero-poster.jpg" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 flex flex-col justify-end min-h-screen pb-20">
        <div className="max-w-7xl">
          <h1
            ref={headlineRef}
            className="text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.0] tracking-tight mb-6 text-white"
          >
            <div>One Platform</div>
            <div>Every Business</div>
          </h1>

          <p
            ref={subtextRef}
            className="text-[0.9375rem] leading-relaxed text-slate-400 mb-9 max-w-[480px]"
          >
            Replace fragmented tools with Sharpnr&apos;s unified OS for
            business. Deeply integrated CRM, HRMS, and Accounting software
            designed for organizations that demand precision.
          </p>

          <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
            <motion.button
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 cursor-pointer"
            >
              Get Started Free
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              onClick={() => navigate({ to: "/products" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.12] cursor-pointer transition-all"
            >
              Explore Products
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
