import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/animations/gsap";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Logo animation ref
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  // Button refs
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const primaryArrowRef = useRef<HTMLSpanElement>(null);
  const primaryShineRef = useRef<HTMLSpanElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      const split = SplitText.create(headlineRef.current, {
        type: "lines,words,chars",
      });

      // ── Master timeline ──────────────────────────────────────────
      const master = gsap.timeline();

      // ── 1. Logo: zoom out from full-screen fill → right-side position ──
      // Start: logo fills the whole viewport, centred, full opacity
      // End:   logo sits right-anchored, huge, partially clipped
      master.fromTo(
        logoImgRef.current,
        {
          scale: 6,
          x: "-8vw",
          y: "5vh",
          opacity: 0.18,
          filter: "blur(0px)",
        },
        {
          scale: 1,
          x: "0vw",
          y: "0vh",
          opacity: 0.07,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "expo.out",
        },
        0,
      );

      // Subtle fade-in of the wrapper so the very first frame isn't jarring
      master.fromTo(
        logoWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "none" },
        0,
      );

      // ── 2. Headline chars fly in ─────────────────────────────────
      master.from(
        split.chars,
        {
          y: 80,
          opacity: 0,
          stagger: 0.018,
          duration: 0.9,
          ease: "power3.out",
          onComplete: () => split.revert(),
        },
        0.5, // starts while logo is still zooming
      );

      // ── 3. Subtext ───────────────────────────────────────────────
      master.from(
        subtextRef.current,
        { y: 24, opacity: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4",
      );

      // ── 4. CTA ───────────────────────────────────────────────────
      master.from(
        ctaRef.current,
        { y: 16, opacity: 0, duration: 0.55, ease: "power3.out" },
        "-=0.35",
      );

      // ── Primary button hover ─────────────────────────────────────
      const primary = primaryBtnRef.current;
      const arrow = primaryArrowRef.current;
      const shine = primaryShineRef.current;

      if (primary && arrow && shine) {
        const enterPrimary = () => {
          gsap.to(primary, { scale: 1.04, duration: 0.35, ease: "power2.out" });
          gsap.fromTo(
            arrow,
            { x: 0 },
            { x: 5, duration: 0.35, ease: "power2.out" },
          );
          gsap.fromTo(
            shine,
            { x: "-110%", opacity: 0.6 },
            { x: "110%", opacity: 0, duration: 0.55, ease: "power1.inOut" },
          );
          gsap.to(primary, {
            boxShadow: "0 0 28px 4px rgba(255,255,255,0.12)",
            duration: 0.35,
          });
        };
        const leavePrimary = () => {
          gsap.to(primary, {
            scale: 1,
            boxShadow: "0 0 0px 0px rgba(255,255,255,0)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        };
        const clickPrimary = () => {
          gsap.fromTo(
            primary,
            { scale: 0.96 },
            { scale: 1.04, duration: 0.25, ease: "power2.out" },
          );
        };
        primary.addEventListener("mouseenter", enterPrimary);
        primary.addEventListener("mouseleave", leavePrimary);
        primary.addEventListener("mousedown", clickPrimary);
      }

      // ── Secondary button hover ────────────────────────────────────
      const secondary = secondaryBtnRef.current;
      const secText = secondaryTextRef.current;

      if (secondary && secText) {
        const enterSecondary = () => {
          gsap.to(secondary, {
            scale: 1.04,
            borderColor: "rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.07)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(secText, {
            color: "#ffffff",
            x: 3,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const leaveSecondary = () => {
          gsap.to(secondary, {
            scale: 1,
            borderColor: "rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0)",
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(secText, {
            color: "#94a3b8",
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const clickSecondary = () => {
          gsap.fromTo(
            secondary,
            { scale: 0.96 },
            { scale: 1, duration: 0.25, ease: "power2.out" },
          );
        };
        secondary.addEventListener("mouseenter", enterSecondary);
        secondary.addEventListener("mouseleave", leaveSecondary);
        secondary.addEventListener("mousedown", clickSecondary);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden mx-auto">
      <div className="w-full mx-auto px-8 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-28">
        {/* ── Left: Copy + CTA ── */}
        <div className="flex flex-col relative z-10">
          <h1 ref={headlineRef} className="text-4xl font-bold">
            <div>One Platform</div>
            <div>Every Business</div>
          </h1>

          <p
            ref={subtextRef}
            className="text-[0.9375rem] leading-relaxed mb-9 max-w-[480px]"
          >
            Replace fragmented tools with Sharpnr&apos;s unified OS for
            business. Deeply integrated CRM, HRMS, and Accounting software
            designed for organizations that demand precision.
          </p>

          <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
            {/* Primary */}
            <button
              ref={primaryBtnRef}
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-900 bg-white cursor-pointer will-change-transform"
              style={{ isolation: "isolate" }}
            >
              <span
                ref={primaryShineRef}
                className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                aria-hidden
              />
              Get Started Free
              <span ref={primaryArrowRef} className="inline-flex items-center">
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </button>

            {/* Secondary */}
            <button
              ref={secondaryBtnRef}
              onClick={() => navigate({ to: "/products" })}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border border-white/[0.12] will-change-transform"
              style={{
                backgroundColor: "rgba(255,255,255,0)",
                isolation: "isolate",
              }}
            >
              <span ref={secondaryTextRef} className="text-slate-400">
                Explore Products
              </span>
            </button>
          </div>
        </div>

        {/* ── Right: Logo (zoom-out bg element) ── */}
        {/*
          The wrapper is positioned absolute, anchored to the right edge,
          and intentionally overflows — the section's overflow-hidden clips it.
          Width is large (90vw) so the logo is huge but mostly off-screen right.
        */}
        <div
          ref={logoWrapRef}
          className="absolute right-0 top-0 h-full flex items-center"
          style={{
            width: "72vw",
            pointerEvents: "none",
            // push it so only ~60% is visible
            transform: "translateX(18%)",
          }}
        >
          <img
            ref={logoImgRef}
            src="/sharpnr_w.svg"
            alt=""
            aria-hidden
            className="w-full h-auto object-contain will-change-transform"
            style={{ transformOrigin: "center center" }}
          />
        </div>
      </div>
    </section>
  );
}
