import { useRef, useState } from "react";
import { Words } from "@/app/home/shared/Words";
import { INDUSTRIES, FOUNDATION_GROUPS } from "./layers";
import { useIndustriesAnimation } from "./animations/useIndustriesAnimation";

/*
 * Adaptability.
 *
 * Stacked, not side by side. The trade layer sits above a shared
 * backplane; the foundation hangs below it. Both route into the same
 * backbone with 1px orthogonal traces terminating in solder pads — the
 * same PCB language as every other scene. Nothing is boxed: modules are
 * typography printed on the board, so the backplane never has to shout.
 *
 * The bus is a channel with a conductor inside it rather than a slab. It
 * is the spine of the composition, not its loudest object.
 *
 * Choosing a different trade morphs only the upper layer. The bus and the
 * foundation are completely static — that stillness is the argument the
 * heading makes.
 *
 * Full-width and centred: the alternating left/right rhythm of Scenes
 * 02–04 ends here, so the page changes cadence at the point the story
 * turns from proving the platform to describing it.
 */

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIndustriesAnimation({
    sectionRef,
    headingRef,
    copyRef,
    layerRef,
    baseRef,
    busRef,
    activeIndex: active,
  });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 ref={headingRef} className="hp-scene-title font-extrabold text-white">
          <span className="block">
            <Words text="Built around your business," />
          </span>
          <span className="block text-twilight">
            <Words text="Not the other way around." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-lg text-mute">
          The way you work changes. The foundation doesn&rsquo;t.
        </p>
      </div>

      {/* Choose the trade. The tabs already establish which industry is
          selected, so nothing else on the board needs to repeat it. */}
      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-1 md:mt-14">
        {INDUSTRIES.map((industry, i) => (
          <button
            key={industry.label}
            type="button"
            aria-pressed={i === active}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="hp-ind-tab"
          >
            {industry.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl md:mt-14">
        <p className="hp-ind-meta mb-4">Industry layer</p>

        {/* The layer that changes — type on the board, routed down */}
        <div ref={layerRef} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {INDUSTRIES[active].layer.map((mod) => (
            <div key={mod}>
              <div className="hp-ind-mod">{mod}</div>
              <div className="mt-3 hp-ind-trace" />
              <div className="hp-ind-pad" />
            </div>
          ))}
        </div>

        {/* The backbone. A channel with a conductor, plus faint internal
            routing where each trace lands. */}
        <div ref={busRef} className="hp-ind-backplane mt-[-3px]">
          <div className="hp-ind-conductor" />
          {/* Ticks live in a grid identical to the layer above, so each one
              lands exactly under its trace. Fixed percentages drift by a
              few pixels at every junction because the grid gaps shift the
              real column centres. */}
          <div className="absolute inset-y-0 left-0 right-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {INDUSTRIES[active].layer.map((mod) => (
              <div key={mod} className="relative">
                <div className="hp-ind-tick left-1/2" />
              </div>
            ))}
          </div>
          {/* The only thing that moves down here */}
          <div className="hp-ind-pulse" />
        </div>
        <p className="hp-ind-meta hp-ind-meta--brand mt-3.5 text-center">
          Sharpnr platform
        </p>

        {/* The foundation — grouped, routed up into the same backbone */}
        <div ref={baseRef} className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {FOUNDATION_GROUPS.map((group) => (
            <div key={group.rule}>
              <div className="grid grid-cols-3 gap-2">
                {group.items.map((mod) => (
                  <div key={mod}>
                    <div className="hp-ind-pad" />
                    <div className="hp-ind-trace" />
                    <div className="hp-ind-base mt-2">{mod}</div>
                  </div>
                ))}
              </div>
              <p className="hp-ind-meta mt-4 text-center">{group.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
