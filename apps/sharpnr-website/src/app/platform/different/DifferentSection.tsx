import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useDifferentAnimation } from "./animations/useDifferentAnimation";

/*
 * The heading is a comparison — "your business is already connected, your
 * software should be too" — so the figure is a comparison. The same five
 * things twice: joined in the business, isolated in the software.
 *
 * What was here before was seven events on a circle with the Sharpnr mark
 * at the middle and a spoke from every event into it. Three things were
 * wrong with it, and all three are already settled decisions elsewhere in
 * this repo:
 *
 *   converge → core → radiate is the canonical inference diagram, and
 *   claude.md records it as the reason the fourth homepage hero attempt was
 *   thrown away. Sharpnr is an operating platform, not a model.
 *
 *   the mark at the centre made the drawing about the brand. Scene 03
 *   settled this too: its slab reads "System of record", not "Sharpnr
 *   Platform", because the site has already said whose platform this is.
 *
 *   perfect radial symmetry — seven equal spokes at one radius — is named
 *   in design.md §6 as one of the four things that made earlier work read
 *   as generated.
 *
 * It also argued the wrong thing. A hub says everything routes through our
 * product; the heading claims the business is *already* connected, before
 * Sharpnr arrives. Removing the centre is most of the fix: with nothing in
 * the middle, the top band says "these things affect each other" rather
 * than "these things report to us".
 */

const NODES = ["Order", "Inventory", "Accounts", "People", "Customer"] as const;

/** Box geometry. Centres fall at 112, 266, 420, 574, 728. */
const BOX = { w: 124, h: 36 } as const;
const LEFT = [50, 204, 358, 512, 666] as const;
const centre = (i: number) => LEFT[i] + BOX.w / 2;

const JOINED_Y = 78;
const SEVERED_Y = 222;

/*
 * Connections in the top band. Adjacent boxes join directly; two runs jog
 * below the row and one above it, because a business event does not only
 * affect the next thing in line. Orthogonal throughout — design.md §6:
 * right angles read as engineered, diagonals as a network graph, which is
 * exactly what the old radial looked like.
 */
const LINKS = [
  // adjacent, straight through
  `M${LEFT[0] + BOX.w} ${JOINED_Y} H${LEFT[1]}`,
  `M${LEFT[1] + BOX.w} ${JOINED_Y} H${LEFT[2]}`,
  `M${LEFT[2] + BOX.w} ${JOINED_Y} H${LEFT[3]}`,
  `M${LEFT[3] + BOX.w} ${JOINED_Y} H${LEFT[4]}`,
  // non-adjacent, routed clear of the row
  `M${centre(0)} ${JOINED_Y + BOX.h / 2} V126 H${centre(2)} V${JOINED_Y + BOX.h / 2}`,
  `M${centre(2)} ${JOINED_Y + BOX.h / 2} V126 H${centre(4)} V${JOINED_Y + BOX.h / 2}`,
  `M${centre(1)} ${JOINED_Y - BOX.h / 2} V36 H${centre(3)} V${JOINED_Y - BOX.h / 2}`,
] as const;

/**
 * Section 02 — why Sharpnr exists. One comparison, made once.
 */
export function DifferentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useDifferentAnimation({ sectionRef, introRef, revealRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="Why Sharpnr exists"
            heading={
              <>
                Your business is already connected.
                <br />
                Your software should be too.
              </>
            }
            lede="Every customer, employee and decision already influences something else. Only the software pretends otherwise."
          />
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <svg
            viewBox="0 0 840 300"
            role="img"
            aria-label="The same five parts of a business — order, inventory, accounts, people and customer — shown joined to one another as they are in the business, and again as isolated boxes with no connections, as they are in most software."
            className="h-auto w-full"
            fill="none"
          >
            {/* ── Band one: as the business actually works ── */}
            <text x="50" y="24" className="diff-band" {...BAND}>
              YOUR BUSINESS
            </text>

            <g
              stroke="#00b4d8"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              strokeLinecap="square"
            >
              {LINKS.map((d) => (
                <path key={d} className="diff-link" d={d} />
              ))}
            </g>

            {NODES.map((label, i) => (
              <g key={`joined-${label}`} className="diff-node">
                <rect
                  x={LEFT[i]}
                  y={JOINED_Y - BOX.h / 2}
                  width={BOX.w}
                  height={BOX.h}
                  fill="#00101f"
                  stroke="#90e0ef"
                  strokeOpacity="0.45"
                  strokeWidth="1.1"
                />
                <text x={centre(i)} y={JOINED_Y + 4.5} {...NAME}>
                  {label}
                </text>
              </g>
            ))}

            {/* ── Band two: the same five, held apart ──
                No connectors at all, deliberately. Stubs that stop short
                would read as a rendering fault; nothing between the boxes
                reads as the point, especially directly under a band that
                is visibly woven together. */}
            <text x="50" y="168" className="diff-band" {...BAND}>
              YOUR SOFTWARE
            </text>

            {NODES.map((label, i) => (
              <g key={`severed-${label}`} className="diff-severed">
                <rect
                  x={LEFT[i]}
                  y={SEVERED_Y - BOX.h / 2}
                  width={BOX.w}
                  height={BOX.h}
                  fill="#00101f"
                  stroke="#90e0ef"
                  strokeOpacity="0.22"
                  strokeWidth="1.1"
                />
                <text
                  x={centre(i)}
                  y={SEVERED_Y + 4.5}
                  {...NAME}
                  fillOpacity="0.55"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div
          ref={revealRef}
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center"
        >
          <p className="diff-reveal text-heading-md font-bold text-white md:text-heading-lg">
            Connected Business Infrastructure
          </p>
          <p className="diff-reveal mt-3 text-body-lg text-mute">
            One platform, where nothing has to be told twice.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Shared text presentation, kept out of the markup so the two bands cannot
   drift apart. */
const NAME = {
  textAnchor: "middle",
  fontSize: 13,
  fontWeight: 500,
  fill: "#caf0f8",
} as const;

const BAND = {
  fontSize: 11,
  fontWeight: 500,
  fill: "#8a94a8",
  letterSpacing: "0.18em",
  fontFamily: "'JetBrains Mono', monospace",
} as const;
