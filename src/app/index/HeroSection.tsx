import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSectionBackground } from "./HerosectionBackground";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { SplitText } from "gsap/SplitText";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: "lines,words,chars",
    });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
    });

    return () => {
      split.revert();
    };
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#02000d]"
    >
      {/* ── Full-bleed background (video/image/mograph goes here) ── */}
      <HeroSectionBackground src="bg_video.mp4" poster="/hero-poster.jpg" />

      {/* ── Mouse-tracked spotlight ── */}
      <div
        ref={spotlightRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Copy — bottom-left, Neon-style ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 flex flex-col justify-end min-h-screen pb-20 pt-28">
        <div className="max-w-7xl">
          {/* Headline */}
          <h1
            className="text-[3.2rem] md:text-[4rem] lg:text-[4.5rem]
             font-bold leading-[1.0] font-inter tracking-tight mb-6"
          >
            <div ref={headlineRef} className="text-white">
              One Platform
            </div>

            <div ref={headlineRef} className="font-inter">
              Every Business
            </div>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-[0.9375rem] leading-relaxed text-slate-400 mb-9 max-w-[480px]"
          >
            Replace fragmented tools with Sharpnr's unified OS for business.
            Deeply integrated CRM, HRMS, and Accounting software designed for
            organizations that demand precision.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-3 flex-wrap mb-12">
            <motion.button
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                         text-sm font-semibold text-slate-900 bg-white
                         hover:bg-slate-100 border-none cursor-pointer
                         transition-colors duration-150"
            >
              Get Started Free
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              onClick={() => navigate({ to: "/products" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                         text-sm font-semibold text-slate-300
                         hover:text-white hover:bg-white/[0.07]
                          border border-white/[0.12]
                         cursor-pointer transition-all duration-150"
            >
              Explore Products
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
