import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { ScrollSmoother } from "@/configs/gsap";
import { IndustryRailDiagram } from "../diagrams";
import { useIndustriesHeroAnimation } from "./animations/useIndustriesHeroAnimation";

/*
 * Industries hero.
 *
 * Centred, on the site's dark canvas, matching Scene 01 on the homepage:
 * eyebrow, a two-line headline that closes to one line at lg, one sentence,
 * two buttons. No background of its own — the canvas and the ink wash are
 * held at the root.
 *
 * The rail sits at the foot of the first screen rather than beside the
 * copy, because that is the argument: everything above it is different and
 * the line underneath is the same one. Below md it is dropped — eight
 * labelled modules at phone width are illegible, not small.
 */

/* The scroll action needs an onClick, which the shared Button (a link) has
   no room for, so it carries the same classes directly. */
const SCROLL_BTN =
  "group inline-flex h-[52px] select-none items-center justify-center gap-2.5 px-7 text-[0.9375rem] font-semibold tracking-tight " +
  "border border-white/20 text-white/90 transition-[transform,background-color,border-color,color] duration-180 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/45 hover:bg-white/[0.06] hover:text-white " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan " +
  "active:translate-y-0 motion-safe:hover:-translate-y-0.5";

export function IndustriesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useIndustriesHeroAnimation({
    sectionRef,
    eyebrowRef,
    copyRef,
    ctaRef,
    railRef,
  });

  const scrollToHospitality = () => {
    const target = document.getElementById("hospitality");
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top 88px");
    else target.scrollIntoView({ behavior: "smooth" });
  };

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
            Sharpnr Industries
          </p>

          <h1 className="hp-scene-title mt-5 font-extrabold text-white lg:whitespace-nowrap">
            <span className="ind-hero-line-1 block lg:inline">
              <Words text="Every industry," />
            </span>{" "}
            <span className="ind-hero-line-2 block text-twilight lg:inline">
              <Words text="One foundation." />
            </span>
          </h1>

          <p
            ref={copyRef}
            className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute"
          >
            Start with the industry you know.
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
              onClick={scrollToHospitality}
              className={SCROLL_BTN}
            >
              Explore Hospitality
            </button>
          </div>
        </div>
      </div>

      {/* Different above, identical below. */}
      <div
        ref={railRef}
        className="relative z-10 mx-auto hidden w-full max-w-6xl px-10 pb-14 md:block md:pb-20"
      >
        <IndustryRailDiagram />
      </div>
    </section>
  );
}
