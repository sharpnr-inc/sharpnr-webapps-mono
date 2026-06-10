// components/HeroSection.tsx
import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/animations/gsap";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const TRUST_STATS = [
  { value: "12+", label: "Products" },
  { value: "3", label: "Verticals" },
  { value: "1", label: "Platform" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

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
        ignore: ".headline-accent",
      });

      const master = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── 1. Eyebrow ───────────────────────────────────────────────
      master.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
        0,
      );

      // ── 2. Headline chars ────────────────────────────────────────
      master.from(
        split.chars,
        {
          y: 64,
          opacity: 0,
          stagger: 0.016,
          duration: 0.8,
          onComplete: () => split.revert(),
        },
        0.15,
      );

      // ── 3. Subtext ───────────────────────────────────────────────
      master.from(
        subtextRef.current,
        { y: 18, opacity: 0, duration: 0.6 },
        "-=0.45",
      );

      // ── 4. CTA ───────────────────────────────────────────────────
      master.from(
        ctaRef.current,
        { y: 12, opacity: 0, duration: 0.5 },
        "-=0.38",
      );

      // ── 5. Trust strip ───────────────────────────────────────────
      master.from(
        trustRef.current,
        { y: 8, opacity: 0, duration: 0.4 },
        "-=0.3",
      );

      // ── Primary button hover ─────────────────────────────────────
      const primary = primaryBtnRef.current;
      const arrow = primaryArrowRef.current;
      const shine = primaryShineRef.current;

      if (primary && arrow && shine) {
        const onEnter = () => {
          gsap.to(primary, { scale: 1.04, duration: 0.3, ease: "power2.out" });
          gsap.fromTo(
            arrow,
            { x: 0 },
            { x: 5, duration: 0.3, ease: "power2.out" },
          );
          gsap.fromTo(
            shine,
            { x: "-110%", opacity: 0.6 },
            { x: "110%", opacity: 0, duration: 0.5, ease: "power1.inOut" },
          );
          gsap.to(primary, {
            boxShadow: "0 0 28px 4px rgba(255,255,255,0.1)",
            duration: 0.3,
          });
        };
        const onLeave = () => {
          gsap.to(primary, {
            scale: 1,
            boxShadow: "0 0 0px 0px rgba(255,255,255,0)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        };
        const onClick = () =>
          gsap.fromTo(
            primary,
            { scale: 0.96 },
            { scale: 1.04, duration: 0.2, ease: "power2.out" },
          );

        primary.addEventListener("mouseenter", onEnter);
        primary.addEventListener("mouseleave", onLeave);
        primary.addEventListener("mousedown", onClick);
      }

      // ── Secondary button hover ────────────────────────────────────
      const secondary = secondaryBtnRef.current;
      const secText = secondaryTextRef.current;

      if (secondary && secText) {
        const onEnter = () => {
          gsap.to(secondary, {
            scale: 1.04,
            borderColor: "rgba(255,255,255,0.32)",
            backgroundColor: "rgba(255,255,255,0.06)",
            duration: 0.28,
            ease: "power2.out",
          });
          gsap.to(secText, {
            color: "#ffffff",
            x: 3,
            duration: 0.28,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(secondary, {
            scale: 1,
            borderColor: "rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0)",
            duration: 0.32,
            ease: "power2.out",
          });
          gsap.to(secText, {
            color: "#94a3b8",
            x: 0,
            duration: 0.28,
            ease: "power2.out",
          });
        };
        const onClick = () =>
          gsap.fromTo(
            secondary,
            { scale: 0.96 },
            { scale: 1, duration: 0.2, ease: "power2.out" },
          );

        secondary.addEventListener("mouseenter", onEnter);
        secondary.addEventListener("mouseleave", onLeave);
        secondary.addEventListener("mousedown", onClick);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full px-4 py-4 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden bg-primary rounded-2xl
                   min-h-[calc(100svh-4.5rem)]
                   flex items-center justify-center"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.022] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient glow — bottom left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[360px] -translate-x-1/4 translate-y-1/4 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

        {/* Ambient glow — top right */}
        <div className="absolute top-0 right-0 w-[380px] h-[280px] translate-x-1/4 -translate-y-1/4 rounded-full bg-indigo-600/8 blur-[80px] pointer-events-none" />

        {/* Content — centred column */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl gap-6 px-6 py-16 mx-auto text-center sm:gap-7 sm:px-10 lg:px-16 sm:py-20 lg:py-24">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-2.5"
            style={{ opacity: 0 }}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-violet-400 opacity-60" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-violet-400" />
            </span>
            <span className="text-[0.7rem] tracking-[0.16em] uppercase font-medium text-slate-500 font-mono">
              Enterprise Suite · Now in Preview
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-sora font-bold leading-[1.06] tracking-tight text-white
                       text-[2.75rem] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.5rem]"
          >
            <span className="block">One Platform.</span>
            <span className="block">Every Business</span>
            <span className="block headline-accent text-violet-400">
              Needs.
            </span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-slate-400 leading-relaxed max-w-[48ch]
                       text-[0.9375rem] sm:text-base lg:text-[1.0625rem]"
            style={{ opacity: 0 }}
          >
            Replace fragmented tools with Sharpnr's unified OS for business —
            deeply integrated CRM, HRMS, Accounting, and more, built for
            organizations that demand precision.
          </p>

          {/* CTA row */}
          <div
            ref={ctaRef}
            className="flex flex-col items-stretch w-full gap-3 sm:flex-row sm:items-center sm:w-auto"
            style={{ opacity: 0 }}
          >
            <button
              ref={primaryBtnRef}
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              className="relative overflow-hidden flex items-center justify-center gap-2
                         px-7 py-3.5 rounded-xl text-sm font-semibold
                         text-slate-900 bg-white cursor-pointer will-change-transform
                         w-full sm:w-auto"
            >
              <span
                ref={primaryShineRef}
                className="absolute inset-0 -translate-x-full -skew-x-12 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden
              />
              Get Started Free
              <span ref={primaryArrowRef} className="inline-flex items-center">
                <ArrowRight size={14} strokeWidth={2.5} />
              </span>
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={() => navigate({ to: "/products" })}
              className="relative flex items-center justify-center gap-2
                         px-7 py-3.5 rounded-xl text-sm font-semibold
                         cursor-pointer border border-white/[0.12] will-change-transform
                         w-full sm:w-auto bg-transparent"
            >
              <span ref={secondaryTextRef} className="text-slate-400">
                Explore Products
              </span>
            </button>
          </div>

          {/* Trust strip */}
          <div
            ref={trustRef}
            className="flex items-center gap-0 pt-2"
            style={{ opacity: 0 }}
          >
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i !== 0 && (
                  <span className="mx-5 text-sm select-none text-slate-700">
                    ·
                  </span>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold leading-none text-white font-sora">
                    {stat.value}
                  </span>
                  <span className="text-slate-600 text-[0.73rem] tracking-wide uppercase font-medium">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
