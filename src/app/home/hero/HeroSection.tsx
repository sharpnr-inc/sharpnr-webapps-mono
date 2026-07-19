import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { HeroEcosystem } from "./HeroEcosystem";
import { useHeroAnimation } from "./animations/useHeroAnimation";

/**
 * Opening experience — deep navy, two columns, typography first.
 * Introduces Sharpnr without naming a single product or industry.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({ sectionRef, copyRef, cueRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy"
    >
      {/* Subtle layered lighting — depth without gradients taking over */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-144 rounded-full bg-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-120 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          {/* Message before visual */}
          <div ref={copyRef} className="max-w-xl">
            <h1 className="text-display-md font-extrabold text-white md:text-display-lg xl:text-display-xl">
              One Platform.
              <br />
              Every Business.
            </h1>
            <p className="mt-6 max-w-lg text-body-lg text-white/70">
              Run operations, finance, people, communication and business
              networks from one connected platform built to grow with your
              organization.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CtaLink
                tone="navy"
                variant="primary"
                href={config.authAppUrl + "/signup"}
                arrow
              >
                Get Started
              </CtaLink>
              <CtaLink tone="navy" variant="secondary" to="/platform">
                Explore Platform
              </CtaLink>
            </div>
          </div>

          {/* The living ecosystem */}
          <div className="flex justify-center lg:justify-end">
            <HeroEcosystem />
          </div>
        </div>

        {/* Scroll cue — quiet invitation to continue */}
        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 md:flex"
          aria-hidden="true"
        >
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            Scroll to explore
          </span>
          <span className="hero-cue-line block h-6 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
