import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { useHeroAnimation } from "./animations/useHeroAnimation";

/**
 * Opening experience — deep navy, typography first.
 *
 * States the real promise (stop integrating your business by hand)
 * and previews its structure: two kinds of work — your industry and
 * your organization — held together by one platform. No node-graph:
 * the same picture is drawn, labelled, in the sections below.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const halvesRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({ sectionRef, copyRef, halvesRef, cueRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy">
      {/* Subtle layered lighting — depth without gradients taking over */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-144 rounded-full bg-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-120 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pb-20 pt-32 md:px-8 md:pt-36">
        <div ref={copyRef} className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <span className="size-1.5 rounded-full bg-cyan" />
            Early Access — free while in alpha
          </p>

          <h1 className="mt-7 text-display-md font-extrabold tracking-tight text-white md:text-display-lg xl:text-display-xl">
            Stop wiring your business
            <br />
            together <span className="text-cyan">by hand.</span>
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-white/70">
            Most companies run on a dozen tools that don&rsquo;t talk to each
            other — so people spend their days moving data between them. Sharpnr
            runs the whole business on one platform, and that busywork simply
            disappears.
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

        {/* The two halves of every business — one platform between them.
            Typographic, not a diagram; the graph versions live below. */}
        <div
          ref={halvesRef}
          className="mt-14 border-t border-white/10 pt-9 md:mt-20 md:pt-11"
        >
          <div className="flex flex-col gap-9 md:flex-row md:items-center md:gap-6">
            <div className="hero-half flex-1">
              <h2 className="text-title-lg font-semibold text-white md:text-heading-sm">
                Run your industry
              </h2>
              <p className="mt-1.5 text-sm text-white/55">
                Operations built for how your work actually happens.
              </p>
            </div>

            <div className="hero-half flex shrink-0 flex-col items-center gap-2.5 md:flex-1 md:px-2">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/40">
                Connected out of the box
              </span>
              <span className="relative block h-px w-28 bg-white/15 md:w-full">
                <span className="hero-connector-line absolute inset-0 origin-center bg-white/25" />
                <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan" />
              </span>
            </div>

            <div className="hero-half flex-1 md:text-right">
              <h2 className="text-title-lg font-semibold text-white md:text-heading-sm">
                Run your organization
              </h2>
              <p className="mt-1.5 text-sm text-white/55">
                The finance, people and knowledge every company needs anyway.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue — quiet invitation to continue */}
        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 lg:flex"
          aria-hidden="true"
        >
          <span className="hero-cue-line block h-6 w-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
