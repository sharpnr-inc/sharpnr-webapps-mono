import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { HeroVisual } from "./HeroVisual";
import { useHeroAnimation } from "./animations/useHeroAnimation";

/*
 * Scene 01 — Hero.
 * "What is Sharpnr?" Introduce a premium business platform and earn the
 * scroll. Desktop: two columns, typography left / supporting motion right,
 * 45–55. Heading is extra bold and never exceeds two lines. Uses the global
 * background — no hero-specific background, no frames, no cards, no badges.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
    const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    sectionRef, copyRef, ctaRef, visualRef });

  return (
    <section ref={sectionRef} className="relative">
      {/* One soft pool of light behind the opening */}
      <div
        aria-hidden="true"
        className="hero-bloom pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[38rem] max-w-[90vw] -translate-x-1/2"
      />
      <div className="hp-hero mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 items-center gap-x-12 gap-y-12 px-5 md:px-8 lg:grid-cols-2 xl:grid-cols-[45fr_55fr]">
        {/* Typography — the message loads first */}
        <div className="lg:pr-6">
          <h1
            className="hp-hero-title font-extrabold text-white"
          >
            <span className="hero-line-1 block whitespace-nowrap">
              <Words text="One Platform." />
            </span>
            <span className="hero-line-2 block whitespace-nowrap text-twilight">
              <Words text="Every Business." />
            </span>
          </h1>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Replace disconnected software with one platform built to run your
            entire business.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              href={config.authAppUrl + "/signup"}
              arrow
            >
              Get Started
            </Button>
            <Button variant="secondary" to="/platform">
              Explore Platform
            </Button>
          </div>
        </div>

        {/* Supporting motion — begins only after the text has appeared */}
        <div ref={visualRef} className="w-full">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
