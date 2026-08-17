/*
 * Platform hero — the weave.
 *
 * The page's argument, drawn once at the top before any of it is
 * explained: the parts of a business are not stacked on a platform, they
 * are *threaded through the same records*, and that is why nobody types
 * the same fact twice.
 *
 * ── Why a weave and not one of the shapes the site already owns ──────
 * Almost every other structural claim on this site has a figure already,
 * and each of them is the wrong argument here:
 *
 *   Scene 03 (home)          applications → business objects → services.
 *                            Three bands and six drops. It answers "what
 *                            is the platform made of".
 *   Industries hero          eight industries standing on one unbroken
 *                            rail. It answers "what do they have in
 *                            common".
 *   FoundationSection        three differently arranged businesses on one
 *   (this page)              slab — the same rail argument at section
 *                            size.
 *   DifferentSection         the same five things joined, then isolated.
 *   The eight sector shapes   chain, spine, cycle, reverse, convergent
 *   (Industries)             tree, ascent, parallel bars, containment.
 *
 * All of those say "these things share something". None of them can show
 * the consequence, which is the only thing the visitor actually cares
 * about: work entered in one place is *already present* in another. That
 * needs two axes. Areas of work run horizontally, the records they all
 * handle run vertically, and a junction is drawn only where an area
 * genuinely touches a record — so the figure is a weave with gaps in it
 * rather than a grid, and it could not be swapped with any figure above
 * without the argument disappearing.
 *
 * ── It answers the pointer (design.md §8) ───────────────────────────
 * Pointing at an area lights its own run, the records it touches, and —
 * this is the whole point — *the junctions those same records make with
 * every other area*. Point at Sales and Billing, Stock and Support light
 * up along with it, because a sale is already in all three. A hover that
 * lit only the row under the cursor would have proved nothing.
 *
 * The device is Scene 03's `data-writes` reused rather than reinvented:
 * each row declares what it handles and the stylesheet matches the two.
 * Rules live in `src/index.css`, written in stroke / stroke-width /
 * stroke-opacity / fill only — GSAP owns `opacity` and the dash on this
 * figure, and an inline style beats a stylesheet (design.md §11, trap 1).
 *
 * Blueprint linework: strokes, one accent, no gradient, no glow on
 * anything standing still. The single travelling charge is the one
 * exception design.md §6 allows, and it plays once.
 */
const ACCENT = "#00b4d8";

/** Areas of the business. Deliberately activities, never product names —
 *  design.md §10: two different things must not share a label, and
 *  "Operations" and "Accounting" are taken. */
const ROWS = [
  { id: "sales", name: "Sales", uses: ["customer", "order"] },
  { id: "stock", name: "Stock", uses: ["order", "invoice"] },
  { id: "billing", name: "Billing", uses: ["customer", "order", "invoice"] },
  { id: "roster", name: "Scheduling", uses: ["order", "staff"] },
  { id: "support", name: "Support", uses: ["customer", "order", "staff"] },
] as const;

/** The records every one of them handles. */
const COLS = [
  { id: "customer", label: "Customer" },
  { id: "order", label: "Order" },
  { id: "invoice", label: "Invoice" },
  { id: "staff", label: "Staff" },
] as const;

/* Every number below is a row in one grid; nothing is placed by eye. The
   runs overshoot the outermost column and the columns overshoot the
   outermost run, so the figure has a selvedge and reads as woven cloth
   rather than as a table with a border. */
const VIEW = { w: 800, h: 286 } as const;
const GUTTER_X = 136;
const RUN = { x1: 160, x2: 784 } as const;
const COL_X = [236, 392, 548, 704] as const;
const ROW_Y = [92, 130, 168, 206, 244] as const;
const COL = { top: 68, bottom: 262, labelY: 54 } as const;
const NODE = 9;

const ariaLabel =
  "Sales, Stock, Billing, Scheduling and Support drawn as five runs " +
  "crossing the same customer, order, invoice and staff records. A " +
  "junction is marked wherever an area handles a record, so a fact " +
  "entered in one area is already present in every other area that " +
  "shares it.";

export function PlatformWeave() {
  return (
    <svg
      data-weave
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
      fill="none"
    >
      <defs>
        {/* The only glow in the figure, and it belongs to the moving
            signal alone (design.md §6). */}
        <filter id="weaveGlow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── The records, running down ── */}
      {COLS.map((c, i) => (
        <g key={c.id} className="plw-col" data-col={c.id}>
          <text
            className="plw-col-name"
            x={COL_X[i]}
            y={COL.labelY}
            textAnchor="middle"
          >
            {/* Uppercased here rather than by `text-transform`, so the
                mobile list can reuse the same data at sentence case. */}
            {c.label.toUpperCase()}
          </text>
          <path
            className="plw-col-run"
            d={`M${COL_X[i]} ${COL.top} L${COL_X[i]} ${COL.bottom}`}
          />
        </g>
      ))}

      {/* ── The areas of work, running across ──
          Drawn after the columns so the junctions sit on top of both. */}
      {ROWS.map((r, i) => (
        <g
          key={r.id}
          className="plw-row"
          data-row={r.id}
          /* Read by the hover rules — the same device Scene 03 uses for
             which application writes which object. */
          data-uses={r.uses.join(" ")}
        >
          <text className="plw-row-name" x={GUTTER_X} y={ROW_Y[i] + 5}>
            {r.name}
          </text>
          <path
            className="plw-run"
            d={`M${RUN.x1} ${ROW_Y[i]} L${RUN.x2} ${ROW_Y[i]}`}
          />
          {r.uses.map((u) => {
            const cx = COL_X[COLS.findIndex((c) => c.id === u)];
            return (
              <rect
                key={u}
                className="plw-node"
                data-col={u}
                x={cx - NODE / 2}
                y={ROW_Y[i] - NODE / 2}
                width={NODE}
                height={NODE}
              />
            );
          })}
          {/* The hover target: one contiguous band per area, so the
              pointer never falls between two hairlines. */}
          <rect
            className="plw-hit"
            x={0}
            y={ROW_Y[i] - 19}
            width={VIEW.w}
            height={38}
            fill="transparent"
          />
        </g>
      ))}

      <text className="plw-note" x={RUN.x2} y={VIEW.h - 8} textAnchor="end">
        ENTERED ONCE
      </text>

      {/* One fact, entered in Sales, arriving in Billing without anyone
          re-typing it. Plays once on arrival — a hero that loops says the
          story is still running (design.md §8). */}
      <circle
        className="plw-charge"
        r={3.5}
        cx={RUN.x1}
        cy={ROW_Y[0]}
        fill={ACCENT}
        opacity={0}
        filter="url(#weaveGlow)"
      />
    </svg>
  );
}

/**
 * The same five areas, stacked — below `md`.
 *
 * An 800-unit drawing at 375px puts the area names at about 6px, which is
 * not small but illegible, and they are the figure's whole content. Same
 * precedent as the Industries hero, which swaps its rail for a list at the
 * same breakpoint: the information stays, as real text, in the shape a
 * phone can actually read.
 */
export function PlatformWeaveList({ className = "" }: { className?: string }) {
  return (
    <ul className={`mx-auto grid max-w-sm gap-2.5 text-left ${className}`}>
      {ROWS.map((r) => (
        <li
          key={r.id}
          className="flex items-baseline gap-3 border-t border-sky/12 pt-2.5"
        >
          <span className="w-24 shrink-0 text-sm font-medium text-white">
            {r.name}
          </span>
          <span className="flex flex-wrap gap-x-2 gap-y-1">
            {r.uses.map((u) => (
              <span
                key={u}
                className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-cyan/70"
              >
                {COLS.find((c) => c.id === u)?.label}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}
