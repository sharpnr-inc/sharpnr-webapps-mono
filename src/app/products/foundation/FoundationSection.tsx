import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { FoundationDiagram } from "./FoundationDiagram";
import { useFoundationAnimation } from "./animations/useFoundationAnimation";

/*
 * Why any of this belongs together.
 *
 * The page has just spent nine sections describing capabilities one at a
 * time, which is exactly how a visitor ends up reading it as a shopping
 * list. This section exists to answer the question that leaves behind: what
 * makes adopting two of these different from buying two pieces of software.
 *
 * Deliberately not another product grid, and deliberately not a paragraph.
 * One diagram and one line — the four things every capability shares are
 * printed inside the drawing rather than described next to it, so the
 * answer arrives in the time it takes to look.
 *
 * Centred and full width. The alternating splits above end here: once a
 * page settles onto its centre axis it stays there, so the closing beats
 * read as the argument resolving rather than as the rhythm continuing.
 */
export function FoundationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useFoundationAnimation({
    sectionRef,
    eyebrowRef,
    headingRef,
    copyRef,
    figureRef,
  });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p ref={eyebrowRef} className="hp-eyebrow">
          One Platform
        </p>
        <h2
          ref={headingRef}
          className="hp-scene-title mt-6 font-extrabold text-white"
        >
          <span className="block">
            <Words text="Every capability," />
          </span>
          <span className="block text-twilight">
            <Words text="One thing underneath." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-xl text-mute">
          Everything above stands on the same foundation — built once, not once
          per product.
        </p>
      </div>

      <div ref={figureRef} className="mx-auto mt-14 max-w-4xl md:mt-20">
        {/* Recomposed rather than shrunk. From `md` up the drawing holds a
            minimum width and scrolls inside its own box, so the page never
            scrolls sideways. Below that it scales to fit and drops its
            labels — a complete small drawing reads as a drawing, where the
            same drawing cut off at the screen edge reads as a bug. */}
        <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <div className="md:min-w-lg">
            <FoundationDiagram />
          </div>
        </div>

        {/* The four, printed at a size a phone can read — this is where the
            names live once the drawing has dropped its own labels. */}
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 md:hidden">
          {["Identity", "Permissions", "Data", "Intelligence"].map((f) => (
            <li
              key={f}
              className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-cyan/70"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
