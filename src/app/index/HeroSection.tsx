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

  // Button refs
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const primaryArrowRef = useRef<HTMLSpanElement>(null);
  const primaryShineRef = useRef<HTMLSpanElement>(null);

  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // ── Page intro timeline ──────────────────────────────────────
      if (!headlineRef.current) return;

      const split = SplitText.create(headlineRef.current, {
        type: "lines,words,chars",
      });

      const tl = gsap.timeline({
        onComplete: () => split.revert(),
      });

      tl.from(split.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.inOut",
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

      // ── Primary button hover (Get Started Free) ──────────────────
      const primary = primaryBtnRef.current;
      const arrow = primaryArrowRef.current;
      const shine = primaryShineRef.current;

      if (primary && arrow && shine) {
        const enterPrimary = () => {
          gsap.to(primary, {
            scale: 1.04,
            duration: 0.35,
            ease: "power2.out",
          });
          // Arrow slides right then snaps back into new position
          gsap.fromTo(
            arrow,
            { x: 0 },
            { x: 5, duration: 0.35, ease: "power2.out" },
          );
          // Shine sweep across the button
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

      // ── Secondary button hover (Explore Products) ─────────────────
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
            color: "#94a3b8", // slate-400
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
    <section ref={sectionRef} className="">
      <div
        className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20
                      flex flex-col justify-center min-h-screen pb-20"
      >
        <h1
          ref={headlineRef}
          className="text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] font-bold
                     leading-[1.0] tracking-tight mb-6 text-white"
        >
          <div>One Platform</div>
          <div>Every Business</div>
        </h1>

        <p
          ref={subtextRef}
          className="text-[0.9375rem] leading-relaxed text-slate-400 mb-9 max-w-[480px]"
        >
          Replace fragmented tools with Sharpnr&apos;s unified OS for business.
          Deeply integrated CRM, HRMS, and Accounting software designed for
          organizations that demand precision.
        </p>

        <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
          {/* ── Primary: Get Started Free ── */}
          <button
            ref={primaryBtnRef}
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="relative overflow-hidden flex items-center gap-2
                       px-5 py-2.5 rounded-lg text-sm font-semibold
                       text-slate-900 bg-white cursor-pointer
                       will-change-transform"
            style={{ isolation: "isolate" }}
          >
            {/* Shine overlay — animated by GSAP */}
            <span
              ref={primaryShineRef}
              className="pointer-events-none absolute inset-0 -skew-x-12
                         bg-gradient-to-r from-transparent via-white/40 to-transparent
                         -translate-x-full"
              aria-hidden
            />
            Get Started Free
            <span ref={primaryArrowRef} className="inline-flex items-center">
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          </button>

          {/* ── Secondary: Explore Products ── */}
          <button
            ref={secondaryBtnRef}
            onClick={() => navigate({ to: "/products" })}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg
                       text-sm font-semibold cursor-pointer
                       border border-white/[0.12]
                       will-change-transform"
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
    </section>
  );
}
