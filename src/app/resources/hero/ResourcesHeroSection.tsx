import { useRef } from "react";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { ScrollSmoother } from "@/configs/gsap";
import { useResourcesHeroAnimation } from "./animations/useResourcesHeroAnimation";

/*
 * Resources hero — a knowledge library, not a company blog.
 *
 * Centred on the dark canvas, matching Scene 01 on the homepage. No
 * background of its own — the canvas and the ink wash come from the root.
 *
 * Deliberately type only. The other two pages carry a diagram at the foot
 * of the first screen; drawing a full library here would claim a shelf of
 * publications that does not exist yet, and the note under the buttons
 * says so in as many words.
 */

/* The scroll action needs an onClick, which the shared Button (a link) has
   no room for, so it carries the same classes directly. */
const SCROLL_BTN =
  "group inline-flex h-[52px] select-none items-center justify-center gap-2.5 px-7 text-[0.9375rem] font-semibold tracking-tight " +
  "bg-cyan text-navy transition-[transform,background-color,border-color,color] duration-180 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sky " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan " +
  "active:translate-y-0 motion-safe:hover:-translate-y-0.5";

export function ResourcesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useResourcesHeroAnimation({
    sectionRef,
    eyebrowRef,
    copyRef,
    ctaRef,
    noteRef,
  });

  const scrollToLibrary = () => {
    const target = document.getElementById("explore");
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
            The Knowledge Center
          </p>

          <h1 className="hp-scene-title mt-5 font-extrabold text-white lg:whitespace-nowrap">
            <span className="res-hero-line-1 block lg:inline">
              <Words text="Learn something useful," />
            </span>{" "}
            <span className="res-hero-line-2 block text-twilight lg:inline">
              <Words text="Build something better." />
            </span>
          </h1>

          <p
            ref={copyRef}
            className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute"
          >
            Knowledge should be shared, not hidden.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToLibrary}
              className={SCROLL_BTN}
            >
              Explore Resources
            </button>
            <Button variant="secondary" href="https://docs.sharpnr.com">
              Browse Documentation
            </Button>
          </div>

          <p ref={noteRef} className="mx-auto mt-8 max-w-md text-sm text-mute/70">
            Resources is growing alongside the platform — the first
            publications are being written during Early Access.
          </p>
        </div>
      </div>
    </section>
  );
}
