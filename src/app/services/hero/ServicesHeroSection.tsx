import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { scrollToId } from "@/app/home/shared/smoothScroll";
import { useServicesHeroAnimation } from "./animations/useServicesHeroAnimation";

const capabilities = [
  "Financial management",
  "People & workforce",
  "Customer relationships",
  "Communication & collaboration",
  "Identity & governance",
  "Knowledge & intelligence",
  "Business network",
] as const;

/*
 * Services hero.
 *
 * Centred on the dark canvas, matching Scene 01 on the homepage. No
 * background of its own — the canvas and the ink wash come from the root.
 *
 * The seven capabilities sit at the foot of the first screen as one
 * continuous chain rather than a grid of tiles: the hairline between each
 * pair is the whole point, and a grid would say they are seven separate
 * things you choose between.
 */

/* The scroll action needs an onClick, which the shared Button (a link) has
   no room for, so it carries the same classes directly. */
const SCROLL_BTN =
  "group inline-flex h-[52px] select-none items-center justify-center gap-2.5 px-7 text-[0.9375rem] font-semibold tracking-tight " +
  "border border-white/20 text-white/90 transition-[transform,background-color,border-color,color] duration-180 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/45 hover:bg-white/[0.06] hover:text-white " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan " +
  "active:translate-y-0 motion-safe:hover:-translate-y-0.5";

export function ServicesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);

  useServicesHeroAnimation({
    sectionRef,
    eyebrowRef,
    copyRef,
    ctaRef,
    chainRef,
  });

  // Through the shared Lenis instance — a raw scrollIntoView would fight the
  // smooth-scroll animation already running and land between the two.
  const scrollToCapabilities = () => scrollToId("financial-management");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col overflow-hidden"
    >
      <div className="relative z-10 flex w-full flex-1 items-center justify-center px-6 py-32 md:px-10">
        <div className="mx-auto w-full max-w-7xl text-center">
          <p
            ref={eyebrowRef}
            className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]"
          >
            Connected Business Capabilities
          </p>

          <h1 className="hp-scene-title mt-5 font-extrabold text-white lg:whitespace-nowrap">
            <span className="svc-hero-line-1 block lg:inline">
              <Words text="Every capability," />
            </span>{" "}
            <span className="svc-hero-line-2 block text-twilight lg:inline">
              <Words text="Connected by design." />
            </span>
          </h1>

          <p
            ref={copyRef}
            className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute"
          >
            Take the one you need now. It still works with the rest later.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              href={config.authAppUrl + "/signup"}
              arrow
            >
              Create Free Account
            </Button>
            <button
              type="button"
              onClick={scrollToCapabilities}
              className={SCROLL_BTN}
            >
              Explore Capabilities
            </button>
          </div>
        </div>
      </div>

      {/* Chained, never listed — none of them stands alone. */}
      <div
        ref={chainRef}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 md:px-10 md:pb-20"
      >
        <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {capabilities.map((cap, i) => (
            <li key={cap} className="svc-hero-cap flex items-center gap-3">
              <span className="rounded-full border border-sky/20 bg-sky/[0.025] px-4 py-2 text-sm font-medium text-sky/85">
                {cap}
              </span>
              {i < capabilities.length - 1 && (
                <span className="hidden h-px w-4 bg-cyan/50 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
