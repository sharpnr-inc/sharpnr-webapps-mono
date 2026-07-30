import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { PlatformWeave, PlatformWeaveList } from "./PlatformWeave";
import { usePlatformHeroAnimation } from "./animations/usePlatformHeroAnimation";

/**
 * Platform hero — the homepage introduced Sharpnr; this page explains
 * how it works.
 *
 * Centred, like every hero on the site: eyebrow, headline, one sentence,
 * and then the figure.
 *
 * ── The two buttons are gone ────────────────────────────────────────
 * Same reasoning the Industries hero already records. Somebody who has
 * opened /platform is orienting themselves — they have arrived to find
 * out how the thing works, and they are one screen into an eight-section
 * explanation. Asking for a signup before the explanation has started is
 * asking at the worst possible moment, and the page's invitation already
 * waits at the end, in ConvergenceSection, where it has been earned.
 *
 * ── What replaced them ──────────────────────────────────────────────
 * The page's argument, drawn. Everything below this hero elaborates one
 * claim — that the parts of a business share the same records, so nobody
 * enters a fact twice — and the weave states it once, at the top, before
 * a word of it has been explained. A hero with buttons and no figure was
 * the only page opening on the site that asserted its argument in copy
 * alone.
 *
 * An earlier note in this file said a hero carrying a diagram was
 * answering "how does it work?" before the page had asked it. That was
 * right about the *old* diagram, which was a capability chart duplicating
 * DifferentSection immediately below it. The weave duplicates nothing on
 * this page: Different compares connected against isolated, Foundation
 * stands three businesses on one slab, and neither can show a fact
 * arriving somewhere nobody typed it.
 *
 * No background: the dark canvas and its ink wash are held at the root.
 */
export function PlatformHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  usePlatformHeroAnimation({ sectionRef, eyebrowRef, copyRef, figureRef });

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
          How Sharpnr Works
        </p>

        {/* Two lines, breaking on the comma. Deliberately not run onto one
            line at lg like the homepage headline: at 43 characters this
            would overflow max-w-7xl at the top of the type scale, and the
            page clips rather than scrolls, so the overflow would be
            silent. Each half is short enough to stay intact on its own. */}
        <h1 className="hp-scene-title mt-5 font-extrabold text-white">
          <span className="phero-line-1 block">
            <Words text="The Business Platform," />
          </span>{" "}
          <span className="phero-line-2 block text-twilight">
            <Words text="Built for Everything." />
          </span>
        </h1>

        <p ref={copyRef} className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute">
          Everything your business runs on, designed to work together from
          day one.
        </p>
      </div>

      {/* Five areas of work, four shared records, and a junction only
          where an area genuinely handles one. */}
      <div
        ref={figureRef}
        className="relative z-10 mx-auto mt-12 w-full max-w-5xl md:mt-16"
      >
        <div className="hidden md:block">
          <PlatformWeave />
        </div>
        <PlatformWeaveList className="md:hidden" />
      </div>
    </section>
  );
}
