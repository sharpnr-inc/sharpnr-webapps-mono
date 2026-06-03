import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSectionBackground } from "./components/HerosectionBackground";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";

export function HeroSection() {
  const navigate = useNavigate();

  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.1 },
        delay: 0.15,
      });

      tl.from(badgeRef.current, { y: 18, opacity: 0, duration: 0.75 })
        .from(headlineRef.current, { y: 48, opacity: 0, skewY: 1.5 }, "-=0.55")
        .from(subtextRef.current, { y: 20, opacity: 0 }, "-=0.75")
        .from(
          ctaRef.current?.children ?? [],
          { y: 18, opacity: 0, stagger: 0.1 },
          "-=0.7",
        )
        .from(metaRef.current, { y: 14, opacity: 0 }, "-=0.6");

      const onMouseMove = (e: MouseEvent) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX - 300,
          y: e.clientY - 300,
          duration: 1.8,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
      <div
        className="relative z-10 w-full max-w-7xl mx-auto
                   px-8 md:px-16 lg:px-20
                   flex flex-col justify-end
                   min-h-screen pb-20 pt-28"
      >
        <div className="max-w-[640px]">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span
              className="text-[11px] font-semibold text-indigo-300
                             uppercase tracking-widest"
            >
              Sharpnr Engine V1.0 · Now Public
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-[3.2rem] md:text-[4rem] lg:text-[4.5rem]
                       font-bold leading-[1.0] font-inter tracking-tight text-white mb-6"
          >
            One Platform
            <br />
            <span className="bg-clip-text text-transparent font-inter bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
              Every Business
            </span>
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
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                         text-sm font-semibold text-slate-300
                         hover:text-white hover:bg-white/[0.07]
                         bg-transparent border border-white/[0.12]
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
