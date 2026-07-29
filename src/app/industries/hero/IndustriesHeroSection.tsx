import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { IndustryRailDiagram, IndustryRoadmapList } from "../diagrams";
import { useIndustriesHeroAnimation } from "./animations/useIndustriesHeroAnimation";

/*
 * Industries hero.
 *
 * Centred, on the site's dark canvas, matching Scene 01 on the homepage:
 * eyebrow, a two-line headline that closes to one line at lg, one sentence.
 * No background of its own — the canvas and the ink wash are held at the
 * root.
 *
 * Two decisions this file exists to record.
 *
 *   The rail moved up. It used to sit at the foot of the first screen,
 *   below the fold on a laptop, which meant the page's entire argument —
 *   different above, identical below, and only one of them exists today —
 *   was something a visitor had to scroll to find. It is not supporting
 *   material for the headline; it *is* the headline, drawn. So the hero is
 *   now the sentence and the figure, in that order, and nothing else.
 *
 *   The two buttons are gone. This is a navigational page: a visitor
 *   arrives to find out whether their industry is covered, and the honest
 *   answer for seven of eight is "not yet". Asking for a signup before
 *   that question has been answered is asking at the worst possible
 *   moment. The page's one invitation waits until the end, where it has
 *   been earned.
 */

export function IndustriesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useIndustriesHeroAnimation({ sectionRef, eyebrowRef, copyRef, railRef });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
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
          className="hp-hero-copy mx-auto mt-5 max-w-xl text-mute"
        >
          Hospitality is available today. Healthcare, retail, education and
          manufacturing are being designed on the same platform.
        </p>
      </div>

      {/* Different above, identical below — and only one of them exists. */}
      <div
        ref={railRef}
        className="relative z-10 mx-auto mt-12 w-full max-w-6xl md:mt-16"
      >
        <div className="hidden md:block">
          <IndustryRailDiagram />
        </div>
        <IndustryRoadmapList className="md:hidden" />
      </div>
    </section>
  );
}
