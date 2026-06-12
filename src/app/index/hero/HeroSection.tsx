import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { config } from "@/configs/env";
import { useDevice } from "@/hooks/useDevice";
import { ScrollSmoother } from "@/configs/gsap";
import { IsometricPlatform } from "./IsometricPlatform";
import { MobilePlatform } from "./MobilePlatform";
import { HeroAmbientCanvas } from "./HeroAmbientCanvas";
import { useHeroAnimation } from "./animations/useHeroAnimation";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  const { isMobile } = useDevice();

  useHeroAnimation({
    sectionRef,
    badgeRef,
    badgeTextRef,
    titleRef,
    subtitleRef,
    ctaRef,
    trustRef,
  });

  const scrollToArchitecture = () => {
    const target = document.getElementById("architecture");
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, "top 80px");
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 md:pt-36"
    >
      {/* Blueprint grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.045)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      {/* Atmosphere: accent glow behind the graphic + drifting motes */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-12%] top-[55%] h-[26rem] w-[26rem] rounded-full bg-primary/5 blur-3xl" />
      <HeroAmbientCanvas />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-8 lg:pb-24">
        {/* ── Copy column ─────────────────────────────────────── */}
        <div className="max-w-xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-strong" />
            </span>
            <span
              ref={badgeTextRef}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted"
            >
              Early Access · Alpha
            </span>
          </div>

          <h1
            ref={titleRef}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight text-text-dark sm:text-5xl xl:text-[3.5rem]"
          >
            One Platform. Every Industry. Zero Compromise.
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Sharpnr is an ever-evolving ecosystem for business operations —
            accounting, HR, CRM, communications, and industry apps, unified
            across every organization you run.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={config.authAppUrl + "/signup"}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-text-light shadow-md transition-colors duration-200 hover:bg-primary-hover"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={scrollToArchitecture}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-dark transition-colors duration-200 hover:border-text-muted"
            >
              See How It Works
            </button>
          </div>

          <p ref={trustRef} className="mt-6 text-sm text-text-faint">
            Free during early access · Built for organizations of any size
          </p>
        </div>

        {/* ── Signature graphic ───────────────────────────────── */}
        <div className="w-full">
          {isMobile ? <MobilePlatform /> : <IsometricPlatform />}
        </div>
      </div>
    </section>
  );
}
