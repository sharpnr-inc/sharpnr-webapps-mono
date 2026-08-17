/*
 * Section 04 — the argument of the heading, drawn.
 *
 * "Every business is different. Every business starts here." Three
 * businesses are shown as three genuinely different arrangements of
 * blocks — different counts, different widths, different heights — and
 * every one of them rests on the same unbroken slab. The slab is never
 * drawn as segments, because the claim is that it is one piece.
 *
 * Blueprint linework on the same stage discipline as the homepage
 * Scene 06 skeletons: strokes only, one accent, no gradients, no glow,
 * no fills that carry meaning. It has to hold up with the text removed.
 *
 * ── It answers the pointer ──
 * It used to be wholly static, which design.md §8 rules out: a figure that
 * only ever arrives is a picture. The heading is two sentences and the
 * drawing now answers both, one per direction of hover:
 *
 *   point at a business    the other two quieten and its stem lights, but
 *                          the slab stays lit *edge to edge* rather than
 *                          under that business alone — "every business is
 *                          different" without conceding the second line.
 *   point at the slab      all three stems and all three arrangements
 *                          light together — "every business starts here".
 *
 * Isolating rather than merely brightening is the device the Industries
 * topologies already use; this reuses it rather than inventing a second
 * language.
 */
const ACCENT = "#00b4d8";

const edge = { stroke: ACCENT, strokeOpacity: 0.5, strokeWidth: 1.1 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.24, strokeWidth: 1 } as const;
const base = { stroke: ACCENT, strokeOpacity: 0.9, strokeWidth: 1.6 } as const;

/* Three businesses. Deliberately not three copies of one shape — if the
   arrangements matched, the drawing would argue the opposite point.

   `hit` is the transparent plate that makes the group pointable: every
   shape here is stroke-only, and a stroke-only shape has no interior to
   point at. Each plate stops one unit short of the slab so the two
   hovers can never both be true at once. */
const businesses = [
  {
    x: 22,
    stem: 52,
    blocks: [
      { x: 0, y: 46, w: 60, h: 18 },
      { x: 0, y: 22, w: 34, h: 18 },
    ],
    hit: { x: -4, y: 18, w: 68, h: 69 },
  },
  {
    x: 122,
    stem: 40,
    blocks: [
      { x: 0, y: 46, w: 26, h: 18 },
      { x: 32, y: 46, w: 44, h: 18 },
      { x: 0, y: 22, w: 26, h: 18 },
      { x: 32, y: 8, w: 26, h: 32 },
    ],
    hit: { x: -4, y: 4, w: 84, h: 83 },
  },
  {
    x: 226,
    stem: 36,
    blocks: [
      { x: 0, y: 46, w: 72, h: 18 },
      { x: 0, y: 14, w: 30, h: 24 },
    ],
    hit: { x: -4, y: 10, w: 80, h: 77 },
  },
];

export function FoundationDiagram() {
  return (
    <svg
      data-basis
      viewBox="0 0 320 132"
      className="h-auto w-full max-w-md"
      fill="none"
      role="img"
      aria-label="Three differently arranged businesses, each resting on the same unbroken foundation"
    >
      {businesses.map((b) => (
        <g key={b.x} className="pfd-biz" transform={`translate(${b.x} 0)`}>
          {b.blocks.map((blk) => (
            <rect
              key={`${blk.x}-${blk.y}`}
              className="pfd-block"
              x={blk.x}
              y={blk.y}
              width={blk.w}
              height={blk.h}
              {...edge}
            />
          ))}
          {/* The business meets the foundation — not a connector between
              peers, a stem down onto what carries it. */}
          <line
            className="pfd-stem"
            x1={b.stem}
            y1={64}
            x2={b.stem}
            y2={88}
            {...faint}
          />
          <rect
            className="pfd-hit"
            x={b.hit.x}
            y={b.hit.y}
            width={b.hit.w}
            height={b.hit.h}
            fill="transparent"
          />
        </g>
      ))}

      {/* One slab, wider than everything it carries, drawn as a single
          object from edge to edge. Filled `transparent` rather than left
          `none` so it has an interior the pointer can find — the fill
          carries no meaning and paints nothing. */}
      <g className="pfd-base">
        <rect
          className="pfd-slab"
          x={10}
          y={88}
          width={300}
          height={20}
          fill="transparent"
          {...base}
        />
        <line className="pfd-ground" x1={10} y1={116} x2={310} y2={116} {...faint} />
      </g>
    </svg>
  );
}
