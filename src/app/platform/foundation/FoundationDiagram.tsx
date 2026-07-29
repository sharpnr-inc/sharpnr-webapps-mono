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
 * Static — the section's GSAP reveal fades the whole column in, and a
 * second animation inside the SVG would compete with it.
 */
const ACCENT = "#00b4d8";

const edge = { stroke: ACCENT, strokeOpacity: 0.5, strokeWidth: 1.1 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.24, strokeWidth: 1 } as const;
const base = { stroke: ACCENT, strokeOpacity: 0.9, strokeWidth: 1.6 } as const;

/* Three businesses. Deliberately not three copies of one shape — if the
   arrangements matched, the drawing would argue the opposite point. */
const businesses = [
  {
    x: 22,
    stem: 52,
    blocks: [
      { x: 0, y: 46, w: 60, h: 18 },
      { x: 0, y: 22, w: 34, h: 18 },
    ],
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
  },
  {
    x: 226,
    stem: 36,
    blocks: [
      { x: 0, y: 46, w: 72, h: 18 },
      { x: 0, y: 14, w: 30, h: 24 },
    ],
  },
];

export function FoundationDiagram() {
  return (
    <svg
      viewBox="0 0 320 132"
      className="h-auto w-full max-w-md"
      fill="none"
      role="img"
      aria-label="Three differently arranged businesses, each resting on the same unbroken foundation"
    >
      {businesses.map((b) => (
        <g key={b.x} transform={`translate(${b.x} 0)`}>
          {b.blocks.map((blk) => (
            <rect
              key={`${blk.x}-${blk.y}`}
              x={blk.x}
              y={blk.y}
              width={blk.w}
              height={blk.h}
              {...edge}
            />
          ))}
          {/* The business meets the foundation — not a connector between
              peers, a stem down onto what carries it. */}
          <line x1={b.stem} y1={64} x2={b.stem} y2={88} {...faint} />
        </g>
      ))}

      {/* One slab, wider than everything it carries, drawn as a single
          object from edge to edge. */}
      <rect x={10} y={88} width={300} height={20} {...base} />
      <line x1={10} y1={116} x2={310} y2={116} {...faint} />
    </svg>
  );
}
