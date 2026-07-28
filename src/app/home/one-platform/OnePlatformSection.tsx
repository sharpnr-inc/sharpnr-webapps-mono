import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { PlatformMap } from "./PlatformMap";
import { useOnePlatformAnimation } from "./animations/useOnePlatformAnimation";

/*
 * The turn.
 *
 * Emotion: relief. The platform as fabricated hardware — unequal packages
 * soldered onto one board, routed as a mesh where services reach each other
 * directly and Sharpnr orchestrates rather than sitting on every path.
 * Underneath, a substrate everything writes into and reads from.
 *
 * Drawn in flat SVG. Two 3D attempts came before it — CSS-3D, then WebGL —
 * and both read as a render sitting on the page rather than as part of it.
 * The medium was the problem: a board seen from above is an image, however
 * it is produced. Hairlines and real text are what the rest of the page is
 * made of, so this is made of them too.
 *
 * Text-left, visual-right. The headline finishes only once the board has
 * assembled — the visual proves the claim before the words make it.
 */

export function OnePlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useOnePlatformAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center overflow-x-clip px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The argument */}
        <div className="order-1 lg:mr-auto lg:max-w-xl lg:pr-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Everything," />
            </span>
            <span className="block text-twilight">
              <Words text="One Platform." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 text-mute">
            Every application shares the same foundation, data, and
            intelligence&mdash;working as one platform.
          </p>
        </div>

        {/* The board */}
        <div className="order-2 w-full">
          <div ref={fieldRef} className="mx-auto w-full">
            <PlatformMap />
          </div>
        </div>
      </div>
    </section>
  );
}
