import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { useChaosAnimation } from "./animations/useChaosAnimation";

/*
 * The problem.
 *
 * Same shape as the opening: the argument on the left, the demonstration on
 * the right. The visual is a plain sentence about a working business that
 * comes apart as the visitor scrolls — words leaving the line, dimming
 * unevenly, until the thought can no longer be read in one pass.
 *
 * Nothing is listed and nothing is labelled. The visitor feels the
 * fragmentation before reading a word of explanation.
 */
const SENTENCE = ["One", "business,", "one", "day,", "one", "story."];

export function ChaosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);

  useChaosAnimation({ sectionRef, headingRef, copyRef, lineRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-x-12 gap-y-14 lg:grid-cols-2 xl:grid-cols-[45fr_55fr]">
        {/* The argument */}
        <div className="lg:pr-6">
          <h2
            ref={headingRef}
            className="hp-hero-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Every tool was chosen well." />
            </span>
            <span className="block text-twilight">
              <Words text="None of them ever met." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            So the people become the wiring — carrying the same number from one
            screen to the next, all day, every day.
          </p>
        </div>

        {/* The demonstration */}
        <div className="w-full">
          <p
            ref={lineRef}
            className="mx-auto flex max-w-md flex-wrap gap-x-[0.3em] gap-y-2 text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-[1.3] tracking-[-0.035em] text-white"
            aria-hidden="true"
          >
            {SENTENCE.map((word, i) => (
              <span key={i} className="hp-frag inline-block will-change-transform">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
