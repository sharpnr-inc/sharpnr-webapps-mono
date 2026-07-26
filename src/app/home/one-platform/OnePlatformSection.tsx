import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { Wordmark } from "@/app/home/shared/Wordmark";
import { useOnePlatformAnimation } from "./animations/useOnePlatformAnimation";

/*
 * The turn.
 *
 * The previous scene pulled a sentence apart. This one answers it in the same
 * frame: argument left, demonstration right — except the demonstration is
 * completely still. The same six words, back on one line, resting on a floor
 * that draws itself.
 *
 * Nothing reassembles on screen. The relief is that there is nothing left to
 * put back together.
 */
const SENTENCE = ["One", "business,", "one", "day,", "one", "story."];

export function OnePlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);

  useOnePlatformAnimation({
    sectionRef,
    headingRef,
    copyRef,
    lineRef,
    groundRef,
  });

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
              <Words text="Then it was all" />
            </span>
            <span className="block text-twilight">
              <Words text="put on one floor." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Nothing was thrown away. The same work, the same people — finally
            standing on something that holds them.
          </p>
        </div>

        {/* The demonstration — the same words, still, and what they rest on */}
        <div className="w-full">
          <div className="mx-auto max-w-md">
            <p
              ref={lineRef}
              className="flex flex-wrap gap-x-[0.3em] gap-y-2 text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-[1.3] tracking-[-0.035em] text-white"
              aria-hidden="true"
            >
              {SENTENCE.map((word, i) => (
                <span key={i} className="inline-block">
                  {word}
                </span>
              ))}
            </p>

            <div ref={groundRef} className="mt-12 flex flex-col md:mt-16">
              <span className="hp-ground-rule h-px w-full origin-left bg-white/15" />
              <Wordmark
                label="Sharpnr"
                className="mt-9 text-[clamp(1.25rem,3vw,1.875rem)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
