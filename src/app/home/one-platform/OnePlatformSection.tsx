import { useRef } from "react";
import { BLOCKS } from "@/app/home/shared/blocks";
import { Words } from "@/app/home/shared/Words";
import { useOnePlatformAnimation } from "./animations/useOnePlatformAnimation";

/*
 * The turn.
 *
 * Emotion: relief. The same seven blocks from the previous scene slide in
 * from wherever they were — off-axis, rotated, adrift — and lock into a
 * single rectangular structure: four across, three beneath. Nothing
 * bounces; the arrival is calm, and once it finishes the structure just
 * sits there, still.
 *
 * Text-left, visual-right.
 */
const COLS = 4;

export function OnePlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useOnePlatformAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The argument */}
        <div className="order-1 lg:pr-6">
          <h2
            ref={headingRef}
            className="hp-h2 hp-h2--peak font-extrabold text-white"
          >
            <span className="block">
              <Words text="Everything." />
            </span>
            <span className="block text-twilight">
              <Words text="One Platform." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Sharpnr brings operations, collaboration, intelligence and
            business growth together inside one connected foundation.
          </p>
        </div>

        {/* The demonstration — the seven blocks lock into one structure */}
        <div className="order-2 w-full">
          <div
            ref={fieldRef}
            className="relative mx-auto aspect-3/2 w-full max-w-lg"
            aria-hidden="true"
          >
            <div
              className="absolute"
              style={{ top: "22%", left: "3%", width: "94%", height: "56%" }}
            >
              <div className="platform-halo absolute -inset-10 -z-10" />
              <div className="hp-structure-outline absolute -inset-2.5" />

              {BLOCKS.map((block, i) => {
                const col = i % COLS;
                const row = Math.floor(i / COLS);
                return (
                  <div
                    key={block.label}
                    data-label={block.label}
                    className="hp-block absolute p-1"
                    style={{
                      left: `${(col * 100) / COLS}%`,
                      top: `${row * 50}%`,
                      width: `${100 / COLS}%`,
                      height: "50%",
                    }}
                  >
                    <div className="hp-island flex h-full flex-col items-start justify-center gap-1.5 p-1.5 sm:gap-2 sm:p-3">
                      <span className="hp-island-icon">
                        <block.icon className="size-3.5 sm:size-4" strokeWidth={1.75} />
                      </span>
                      <span className="wrap-break-word text-[10px] font-semibold leading-tight tracking-tight text-white/85 sm:text-xs md:text-sm">
                        {block.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
