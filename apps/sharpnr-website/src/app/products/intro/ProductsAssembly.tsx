/*
 * Products hero — the assembly.
 *
 * "Take one, the rest already fit." The figure is that sentence, drawn:
 * five units, every one of them a closed shape with its own working parts
 * inside it, and the five of them together filling one continuous outline
 * with nothing left over and nothing overlapping.
 *
 * A tessellation is the only structure that can hold both halves of the
 * claim at once. Anything arranged in a row asserts an order; anything
 * hung off a shared bar asserts a dependency; anything nested asserts a
 * hierarchy. A dissection asserts exactly what the page argues — each
 * piece is whole on its own terms *and* the pieces are cut to fit each
 * other.
 *
 * ── Why not one of the shapes the site already owns ─────────────────
 *   the foundation diagram, four sections below on this same page,
 *   is nine modules on a rail routed into one slab. It is the "everything
 *   stands on one thing" argument and it is already made at full size;
 *   repeating it in the hero would be answering the page's last question
 *   first.
 *   the Industries hero is the same rail argument.
 *   Scene 03 is three bands and six drops.
 *   the eight Industries sector shapes are chain, spine, cycle, reverse,
 *   convergent tree, ascent, parallel bars and containment — every one of
 *   them a flow or a hierarchy, and this is neither.
 *
 * Nothing on the site tessellates, and nothing else could: tiling is only
 * honest where the parts genuinely fit each other, which is this page's
 * entire subject.
 *
 * ── It answers the pointer (design.md §8) ───────────────────────────
 * Pointing at a unit holds it at full weight — outline closed, working
 * parts intact, complete on its own — while the rest of the assembly
 * quietens, and lights the couplings on *its* shared edges only. Each
 * unit sits against a different set of neighbours, so the answer changes
 * per unit rather than being the same highlight five times. That is the
 * heading: take this one, and here is precisely where the rest already
 * meets it.
 *
 * The outer hull never quietens. The whole does not stop existing because
 * a visitor is looking at one piece of it.
 *
 * Rules live in `src/index.css` and are written in stroke / stroke-width
 * / stroke-opacity only — GSAP owns `opacity` and the dash here, and an
 * inline style beats a stylesheet (design.md §11, trap 1).
 *
 * No labels. The units are deliberately not named: naming five would
 * assert a catalogue of five, and the capability groups are real DOM text
 * in the section immediately below. The figure has to work as a shape
 * before it works as a list — the same decision the foundation diagram on
 * this page already took.
 */

/** A rectangular dissection of one 720×300 field. Unequal on purpose:
 *  perfectly equal spacing is named in design.md §6 as one of the four
 *  things that made earlier work read as generated. */
const TILES = [
  { id: "a", x: 0, y: 0, w: 300, h: 170 },
  { id: "b", x: 300, y: 0, w: 420, h: 110 },
  { id: "c", x: 0, y: 170, w: 300, h: 130 },
  { id: "d", x: 300, y: 110, w: 200, h: 190 },
  { id: "e", x: 500, y: 110, w: 220, h: 190 },
] as const;

const FIELD = { w: 720, h: 300 } as const;

/**
 * Where two units meet. `axis` is the orientation of the shared edge, so
 * the coupling mark is always drawn across it rather than along it.
 */
const JOINS = [
  { id: "ab", pair: "a b", axis: "v", x: 300, y: 55 },
  { id: "ad", pair: "a d", axis: "v", x: 300, y: 140 },
  { id: "cd", pair: "c d", axis: "v", x: 300, y: 235 },
  { id: "de", pair: "d e", axis: "v", x: 500, y: 205 },
  { id: "ac", pair: "a c", axis: "h", x: 150, y: 170 },
  { id: "bd", pair: "b d", axis: "h", x: 400, y: 110 },
  { id: "be", pair: "b e", axis: "h", x: 610, y: 110 },
] as const;

const TICK = 8;
const PORT = 5;

const ariaLabel =
  "Five self-contained units, each drawn as a closed outline with its own " +
  "working parts inside it, cut to fit one another so that together they " +
  "fill a single continuous outline with no gaps and no overlaps. Every " +
  "shared edge carries a coupling mark.";

export function ProductsAssembly() {
  return (
    <svg
      data-assembly
      viewBox={`-2 -2 ${FIELD.w + 4} ${FIELD.h + 4}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
      fill="none"
    >
      {/* ── The units ──
          Each is complete before anything is joined to it: an outline, a
          head rule, and two runs of its own work. */}
      {TILES.map((t) => (
        <g key={t.id} className="pas-tile" data-tile={t.id}>
          <rect
            className="pas-tile-box"
            x={t.x}
            y={t.y}
            width={t.w}
            height={t.h}
          />
          {/* Below `sm` the whole field is under 330px wide and the inner
              detail collapses into the outlines; the shape is the
              argument, so the detail comes off rather than muddying it. */}
          <g className="pas-tile-parts max-sm:hidden">
            <path
              className="pas-tile-rule"
              d={`M${t.x + 16} ${t.y + 30} L${t.x + t.w - 16} ${t.y + 30}`}
            />
            <path
              className="pas-tile-bar"
              d={`M${t.x + 16} ${t.y + 48} L${t.x + 16 + (t.w - 32) * 0.58} ${t.y + 48}`}
            />
            <path
              className="pas-tile-bar"
              d={`M${t.x + 16} ${t.y + 62} L${t.x + 16 + (t.w - 32) * 0.33} ${t.y + 62}`}
            />
            {/* A second cluster only where there is height for one, so the
                three tall units are not the two short ones stretched.
                design.md §6 names one extrusion repeated at different
                scales as a signature of generated work. */}
            {t.h >= 150 ? (
              <>
                <path
                  className="pas-tile-rule"
                  d={`M${t.x + 16} ${t.y + t.h - 44} L${t.x + t.w - 16} ${t.y + t.h - 44}`}
                />
                <path
                  className="pas-tile-bar"
                  d={`M${t.x + 16} ${t.y + t.h - 26} L${t.x + 16 + (t.w - 32) * 0.45} ${t.y + t.h - 26}`}
                />
              </>
            ) : null}
          </g>
        </g>
      ))}

      {/* ── The couplings ──
          A mark straddling the shared edge, not sitting beside it: the
          edge is where two units already meet, and the mark says so. */}
      {JOINS.map((j) => (
        <g key={j.id} className="pas-join" data-join={j.pair}>
          <path
            className="pas-join-tick"
            d={
              j.axis === "v"
                ? `M${j.x - TICK} ${j.y} L${j.x + TICK} ${j.y}`
                : `M${j.x} ${j.y - TICK} L${j.x} ${j.y + TICK}`
            }
          />
          <rect
            className="pas-join-port"
            x={j.x - PORT / 2}
            y={j.y - PORT / 2}
            width={PORT}
            height={PORT}
          />
        </g>
      ))}

      {/* ── The whole ──
          Drawn as one closed path over the units' own outer edges, so the
          boundary of the assembly is a single heavier line and the cuts
          inside it are lighter. It is the last thing to arrive and the one
          thing that never quietens. */}
      <path
        className="pas-hull"
        d={`M0 0 H${FIELD.w} V${FIELD.h} H0 Z`}
      />
    </svg>
  );
}
