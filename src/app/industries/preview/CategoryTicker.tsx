import { useEffect, useRef, useState } from "react";
import type { IndustryCategory } from "./previews";
import { useCategoryTickerAnimation } from "./animations/useCategoryTickerAnimation";

/*
 * Who a sector is being designed for, as a running strip.
 *
 * Same band as the product ticker elsewhere on the site — mono caps, wide
 * tracking, a hairline above and below, full-bleed within the section —
 * with one change: the generic diamond separator is replaced by a Lucide
 * glyph belonging to the category it sits in front of. A diamond is
 * filler; a glyph is the reason to look.
 *
 * It travels in the direction the eye already crosses the section: left to
 * right where the diagram is on the left, right to left where it is on the
 * right. Because the page alternates, no two consecutive strips drift the
 * same way, which is what would make them read as one repeated widget
 * rather than as part of each sector.
 *
 * A ticker is one band tall whatever it carries, which is why the full
 * category set fits inside a preview that must stay a preview.
 *
 * ── The gap ──
 *
 * The obvious implementation renders the list twice and translates by one
 * list-width. That is correct only when one list is already wider than the
 * container. A sector with four categories is not: the track runs out, and
 * an empty stretch crosses the band once per cycle.
 *
 * So the number of copies is measured, not assumed —
 * `ceil(container / list) + 1`, recomputed on resize — which guarantees
 * the track is always at least one container wider than the distance it
 * travels. The translate is still exactly one list-width, so the seam
 * lands where an identical copy already is and is invisible.
 *
 * Three more things this component is careful about:
 *
 *   Only the first copy is real text. Every repeat is `aria-hidden` and
 *   duplicate — indexing all of them would ship each category name four or
 *   five times over, which is worse than having no strip at all.
 *
 *   Reduced motion gets no marquee. The repeats are not rendered at all
 *   and the track wraps, so every name is readable and nothing is clipped.
 *   A paused marquee would strand whatever sits past the edge.
 *
 *   The edges are masked, not painted. A fade *to canvas* would be a
 *   gradient plate over the root's ink wash; `mask-image` removes the
 *   strip's own pixels instead and leaves the canvas untouched.
 */

export function CategoryTicker({
  categories,
  direction,
  label,
}: {
  categories: readonly IndustryCategory[];
  direction: "ltr" | "rtl";
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLUListElement>(null);

  /* Starts at 1 — one real, indexable list and nothing else. The repeats
     are added once the browser can tell us how wide things actually are,
     which also means the server never renders duplicate text. */
  const [repeats, setRepeats] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const copy = copyRef.current;
    if (!root || !copy) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const measure = () => {
      const listWidth = copy.offsetWidth;
      const containerWidth = root.offsetWidth;
      if (!listWidth || !containerWidth) return;
      setRepeats(Math.ceil(containerWidth / listWidth) + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [categories]);

  useCategoryTickerAnimation(rootRef, direction, repeats);

  const items = categories.map(({ name, icon: Icon }) => (
    <li key={name} className="flex shrink-0 items-center gap-2.5">
      <Icon
        className="size-3.5 shrink-0 text-sky/70"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-sky/70">
        {name}
      </span>
    </li>
  ));

  return (
    <div
      ref={rootRef}
      className="ind-ticker relative mt-12 overflow-hidden border-y border-sky/12 py-3.5 [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)]"
    >
      <div className="ind-ticker-track flex w-max items-center motion-reduce:w-full motion-reduce:flex-wrap">
        <ul
          ref={copyRef}
          className="ind-ticker-copy flex shrink-0 items-center gap-x-10 pr-10 motion-reduce:flex-wrap motion-reduce:gap-y-3"
          aria-label={label}
        >
          {items}
        </ul>
        {/* The seams. Presentational only — the names above are the ones
            that get indexed. */}
        {Array.from({ length: repeats }, (_, i) => (
          <ul
            key={i}
            aria-hidden="true"
            className="flex shrink-0 items-center gap-x-10 pr-10"
          >
            {items}
          </ul>
        ))}
      </div>
    </div>
  );
}
