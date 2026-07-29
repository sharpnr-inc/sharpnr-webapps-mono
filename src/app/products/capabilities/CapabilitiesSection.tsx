import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { CAPABILITIES } from "./capabilityData";
import { useCapabilitiesAnimation } from "./animations/useCapabilitiesAnimation";

/*
 * The nine capabilities, one after another.
 *
 * A run of capability groups, not a grid of tiles: a three-across feature
 * grid would flatten twenty very different products into twenty identical
 * boxes, and the point of the page is that they are not interchangeable.
 * Each group is the capability on one side and what runs it on the other,
 * so the page reads as a tour of one platform rather than as a list of
 * things for sale.
 *
 * The products use Aceternity's Card Hover Effect
 * (`components/ui/card-hover-effect.tsx`), retinted the same way
 * `bento-grid.tsx` was. One surface travels between the cards in a group
 * rather than each card lighting on its own — it reads as a pointer moving
 * down a list, which is the whole reason to reach for that component here.
 *
 * Consecutive splits alternate direction, and the text in each column sits
 * against that column's OUTER edge — pushed there with `lg:ml-auto` on the
 * block, never with `text-right`. A right-aligned rag is a different
 * typographic voice from every other page on the site, and a `max-w` block
 * left hugging the gutter leaves the dead space on the outside, where it
 * looks like a mistake rather than like margin.
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
 * product with no application yet gets its status instead — an arrow on an
 * unclickable card is a promise the card can't keep, and a card with
 * neither reads as an oversight.
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
 * The spine, and the one capability that lights it up.
 *
 * Two pieces of the same line, and between them they carry the whole
 * argument of the page without a sentence claiming any of it.
 *
 * `Spine` runs the full height of all nine capabilities at ~6% of the
 * accent, with a node where it crosses each capability's rule. Nine groups
 * separated by nine rules read as nine sections; one line threaded through
 * all of them reads as one platform, which is the thing the page is
 * supposed to feel like.
 *
 * `Backplane` is the same line through Intelligence, at four times the
 * weight, carrying on past that group's rules into the capabilities either
 * side and putting a tap out to each of its products. Intelligence is the
 * capability that reaches into every other one; this says so by being the
 * bright stretch of a line that runs everywhere else too.
 *
 * Both occupy dead space at every width — the column gutter from `lg` up,
 * the margin just outside the copy below that. Neither crosses a word, and
 * neither changes any part of the layout: the Intelligence group is the
 * same grid, the same size and the same card design as the eight around it.
 */
function Spine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-cyan/6 lg:block"
    />
  );
}

/** The node where the spine crosses one capability's rule. */
function SpineNode() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 hidden size-[3px] -translate-x-1/2 -translate-y-1/2 bg-cyan/20 lg:block"
    />
  );
}

const TAPS = ["24%", "38%", "50%", "62%", "76%"];

function Backplane() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-14 -top-14 left-0 right-0 z-0"
    >
      <div className="absolute -left-3 bottom-0 top-0 w-px bg-cyan/25 lg:left-1/2" />

      {/* Where the bus crosses the rules above and below. The two brightest
          marks in the whole group are the two that are outside it. */}
      <div className="absolute -left-3 top-14 size-[3px] -translate-x-px -translate-y-1/2 bg-cyan/50 lg:left-1/2" />
      <div className="absolute -left-3 bottom-14 size-[3px] -translate-x-px translate-y-1/2 bg-cyan/50 lg:left-1/2" />

      {TAPS.map((top) => (
        <div
          key={top}
          className="absolute left-1/2 hidden h-px w-16 -translate-x-1/2 bg-cyan/15 lg:block"
          style={{ top }}
        >
          <span className="absolute left-0 top-1/2 size-[3px] -translate-y-1/2 bg-cyan/30" />
          <span className="absolute right-0 top-1/2 size-[3px] -translate-y-1/2 bg-cyan/30" />
        </div>
      ))}
    </div>
  );
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useCapabilitiesAnimation({
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
      {/* max-w-4xl, not the usual 2xl: at the top of the scale the heading
          is 68px, and "Independent when needed," needs ~790px to stay one
          line. Capped narrower it breaks after "when", which reads as a
          mistake rather than as a line. The copy keeps its own reading
          width underneath. */}
      <div className="mx-auto max-w-4xl text-center">
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

      <div ref={listRef} className="relative mx-auto mt-16 max-w-6xl md:mt-24">
        <Spine />
        {CAPABILITIES.map((capability, i) => {
          /* Consecutive splits alternate direction — two facing the same
             way in a row reads as a template. The capability is always
             FIRST in the markup so a phone reads what the group is before
             what is in it; only the desktop columns swap. */
          const flipped = i % 2 === 1;
          return (
            <motion.article
              key={capability.name}
              initial="initial"
              whileHover="animate"
              /* items-center, not start: a group with one product would
                 otherwise leave a single card pinned to the top of a
                 column as tall as the capability opposite it, which reads
                 as something missing rather than as space. */
              className="hp-cap-group relative grid grid-cols-1 gap-12 border-t border-sky/15 py-12 lg:grid-cols-2 lg:items-center lg:gap-24 lg:py-16"
            >
              <SpineNode />
              {capability.connected && <Backplane />}

              <div
                className={`hp-cap-part relative z-10 flex flex-col lg:max-w-sm ${
                  flipped ? "lg:order-2 lg:ml-auto" : "lg:order-1"
                }`}
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.28em] text-cyan/60">
                  {capability.index}
                </p>
                <h3 className="mt-4 text-[1.75rem] font-bold tracking-tight text-white md:text-[2rem]">
                  {capability.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {capability.lede}
                </p>
                <div className="mt-8 w-full max-w-55">
                  <capability.Mark />
                </div>
              </div>

              {/* -mx-1 pulls the cards' hover padding back to the column
                  edge, so their text lines up with the heading opposite. */}
              <div
                className={`hp-cap-part relative z-10 -mx-1 ${
                  flipped ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <HoverEffect
                  layoutIdPrefix={capability.name}
                  items={capability.products.map((p) => ({
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
