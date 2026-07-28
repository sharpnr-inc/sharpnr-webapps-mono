import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { CATALOGUE } from "./catalogueData";
import { useCatalogueAnimation } from "./animations/useCatalogueAnimation";

/*
 * The nine capabilities, one after another.
 *
 * A run of capability groups, not a grid of tiles: a three-across feature
 * grid would flatten eighteen very different products into eighteen
 * identical boxes, and the point of the page is that they are not
 * interchangeable.
 *
 * The products use Aceternity's Card Hover Effect
 * (`components/ui/card-hover-effect.tsx`), retinted the same way
 * `bento-grid.tsx` was. One surface travels between the cards in a group
 * rather than each card lighting on its own — it reads as a pointer moving
 * down a list, which is the whole reason to reach for that component here.
 *
 * Consecutive splits alternate direction, and the text in each column sits
 * against that column's OUTER edge: left column flush left, right column
 * flush right. A `max-w` block left hugging the gutter leaves the dead
 * space on the outside, where it looks like a mistake rather than margin.
 *
 * The group is the hover target for its mark, so pointing anywhere in it
 * plays the drawing; a 220px illustration is too small a thing to aim at.
 * `motion` propagates the gesture down to the mark's own variants through
 * context, so nothing in between has to know about it.
 */

/**
 * The right-hand mark on a card.
 *
 * The arrow appears only where there is genuinely somewhere to go. A
 * product with no application yet gets its status instead, or nothing at
 * all — an arrow on an unclickable card is a promise the card can't keep.
 */
function cardMeta(note?: string, href?: string) {
  if (note) {
    return (
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-twilight">
        {note}
      </span>
    );
  }
  if (!href) return null;
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="size-4 shrink-0 text-cyan/70 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
}

/**
 * The shared backplane, drawn through one group only.
 *
 * Intelligence is the capability that reaches into every other one, and
 * the page says so with linework instead of a sentence claiming it: a bus
 * running the full width of the group with drops that carry on past its
 * top and bottom rules into the capabilities either side. Hairlines at
 * ~10% of the accent — present when you look, invisible when you don't.
 *
 * Absolute, never fixed: ScrollSmoother transforms an ancestor, which
 * becomes the containing block for anything fixed.
 */
const DROPS = ["18%", "50%", "82%"];

function Backplane() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-12 -top-12 z-0 hidden lg:block"
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan/10" />
      {DROPS.map((left) => (
        <div key={left} className="absolute inset-y-0" style={{ left }}>
          <div className="h-full w-px bg-cyan/8" />
          <div className="absolute left-1/2 top-1/2 size-[3px] -translate-x-1/2 -translate-y-1/2 bg-cyan/45" />
        </div>
      ))}
    </div>
  );
}

export function ProductCatalogueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useCatalogueAnimation({
    sectionRef,
    eyebrowRef,
    headingRef,
    copyRef,
    listRef,
  });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p ref={eyebrowRef} className="hp-eyebrow">
          Capabilities
        </p>
        <h2
          ref={headingRef}
          className="hp-scene-title mt-6 font-extrabold text-white"
        >
          <span className="block">
            <Words text="Independent when needed," />
          </span>
          <span className="block text-twilight">
            <Words text="Connected by design." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-lg text-mute">
          Every product works on its own. Take only what you need — whatever
          you add later works with what you already have.
        </p>
      </div>

      <div ref={listRef} className="mx-auto mt-16 max-w-6xl md:mt-24">
        {CATALOGUE.map((group, i) => {
          /* Consecutive splits alternate direction — two facing the same
             way in a row reads as a template. The capability is always
             FIRST in the markup so a phone reads what the group is before
             what is in it; only the desktop columns swap. */
          const flipped = i % 2 === 1;
          return (
            <motion.article
              key={group.capability}
              initial="initial"
              whileHover="animate"
              /* items-center, not start: a group with one product would
                 otherwise leave a single card pinned to the top of a
                 column as tall as the capability opposite it, which reads
                 as something missing rather than as space. */
              className="hp-cat-group relative grid grid-cols-1 gap-12 border-t border-sky/15 py-12 lg:grid-cols-2 lg:items-center lg:gap-24 lg:py-16"
            >
              {group.connected && <Backplane />}

              <div
                className={`hp-cat-part relative z-10 flex flex-col lg:max-w-sm ${
                  flipped
                    ? "lg:order-2 lg:ml-auto lg:items-end lg:text-right"
                    : "lg:order-1"
                }`}
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.28em] text-cyan/60">
                  {group.index}
                </p>
                <h3 className="mt-4 text-[1.75rem] font-bold tracking-tight text-white md:text-[2rem]">
                  {group.capability}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {group.lede}
                </p>
                <div className="mt-8 w-full max-w-55">
                  <group.Mark />
                </div>
              </div>

              {/* -mx-1 pulls the cards' hover padding back to the column
                  edge, so their text lines up with the heading opposite. */}
              <div
                className={`hp-cat-part relative z-10 -mx-1 ${
                  flipped ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <HoverEffect
                  layoutIdPrefix={group.capability}
                  items={group.products.map((p) => ({
                    title: p.name,
                    description: p.line,
                    link: p.href,
                    meta: cardMeta(p.note, p.href),
                  }))}
                />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
