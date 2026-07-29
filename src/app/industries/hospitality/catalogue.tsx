/*
 * Hospitality — what powers the day, as a bento.
 *
 * This replaced two flat lists: a row of twelve chips and, later, chips
 * grouped under four labels. Both made every product look equally
 * important, which is the one thing a catalogue must not do — IVA and Live
 * Insights are not the same size of idea as Loyalty.
 *
 * The bento is `src/components/ui/bento-grid.tsx`, the same component
 * Scene 06 on the homepage uses. Reusing it rather than inventing a second
 * card system is the point: one card language across the site.
 *
 * The taxonomy the grouped lists gave us is kept as a small mono kicker on
 * each tile — it rides in the component's `header` slot, which is also
 * what stops an unillustrated tile from leaving a band of dead space above
 * its text. Only the two tiles that carry extra width get a drawing, and
 * they get it because the width would otherwise be empty.
 *
 * Icons are Lucide throughout. No `dark:` variants — this site is only
 * ever dark, so the dark values are the base.
 */
import {
  Activity,
  BedDouble,
  Boxes,
  Calculator,
  Contact,
  CreditCard,
  Gift,
  Grid2x2,
  Lightbulb,
  Monitor,
  QrCode,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const ICON = "h-4 w-4 text-cyan";
const ACCENT = "#00b4d8";

/** The kicker keeps the Operations / Business / Customer / Intelligence
 *  grouping the lists carried, without going back to four lists. */
const Kicker = ({
  group,
  children,
}: {
  group: string;
  children?: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-cyan/55">
      {group}
    </p>
    {children}
  </div>
);

/* Two small blueprint drawings, for the two tiles wide enough to need one.
   Same language as `src/app/home/why/skeletons.tsx`: strokes only, one
   accent, no gradient and no glow. */

const stroke = {
  edge: { stroke: ACCENT, strokeOpacity: 0.5, strokeWidth: 1.1, fill: "none" },
  faint: { stroke: ACCENT, strokeOpacity: 0.26, strokeWidth: 1, fill: "none" },
  base: { stroke: ACCENT, strokeOpacity: 0.85, strokeWidth: 1.5, fill: "none" },
} as const;

/** Point of Sale — the order taken once, at the head of everything. */
const PosArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    {/* the terminal */}
    <rect x={10} y={14} width={62} height={38} {...stroke.base} />
    <line x1={10} y1={26} x2={72} y2={26} {...stroke.edge} />
    {[34, 42].map((y) => (
      <line key={y} x1={20} y1={y} x2={50} y2={y} {...stroke.faint} />
    ))}
    {/* one order leaving it */}
    <line x1={72} y1={33} x2={132} y2={33} {...stroke.edge} />
    <rect x={132} y={12} width={46} height={42} {...stroke.edge} />
    {[22, 30, 38, 46].map((y) => (
      <line key={y} x1={140} y1={y} x2={170} y2={y} {...stroke.faint} />
    ))}
  </svg>
);

/** Inventory — the count that moves as the day does. */
const InventoryArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    <line x1={10} y1={52} x2={140} y2={52} {...stroke.base} />
    {[0, 1, 2, 3].map((c) => (
      <rect
        key={c}
        x={12 + c * 32}
        y={34}
        width={28}
        height={18}
        {...stroke.edge}
      />
    ))}
    {[0, 1, 2].map((c) => (
      <rect
        key={c}
        x={12 + c * 32}
        y={16}
        width={28}
        height={18}
        {...stroke.faint}
      />
    ))}
    {/* the one that just left */}
    <line x1={148} y1={43} x2={190} y2={43} {...stroke.edge} />
    <line x1={182} y1={38} x2={190} y2={43} {...stroke.edge} />
    <line x1={182} y1={48} x2={190} y2={43} {...stroke.edge} />
  </svg>
);

/** Live Insights — the same figures, read at any moment. */
const InsightsArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    <line x1={10} y1={50} x2={210} y2={50} {...stroke.base} />
    {[26, 58, 90, 122, 154, 186].map((x, i) => (
      <line
        key={x}
        x1={x}
        y1={50}
        x2={x}
        y2={50 - [18, 30, 12, 34, 22, 40][i]}
        {...stroke.edge}
      />
    ))}
    {/* The reading line — it is current, which is the whole claim. */}
    <line x1={10} y1={16} x2={210} y2={16} {...stroke.faint} />
  </svg>
);

/** IVA — many parts of the day, one answer. */
const IvaArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    {[
      [12, 12],
      [12, 30],
      [12, 48],
      [44, 20],
      [44, 40],
    ].map(([x, y], i) => (
      <g key={i}>
        <rect x={x} y={y - 5} width={14} height={10} {...stroke.edge} />
        <line x1={x + 14} y1={y} x2={112} y2={30} {...stroke.faint} />
      </g>
    ))}
    <line x1={112} y1={10} x2={112} y2={50} {...stroke.base} />
    <line x1={112} y1={30} x2={168} y2={30} {...stroke.base} />
    <rect x={168} y={20} width={40} height={20} {...stroke.edge} />
  </svg>
);

export interface CatalogueTile {
  group: string;
  title: string;
  description: string;
  icon: ReactNode;
  header: ReactNode;
  className: string;
}

/*
 * Spans carry the emphasis, and emphasis is the only reason to use a bento
 * rather than a list. Four tiles take the double width: Point of Sale and
 * Inventory because that is where the day starts and where it is felt, Live
 * Insights and IVA because a business chooses a POS but connects everything
 * else for the sake of what those two can then say.
 *
 * Width is also what earns an illustration. A drawing in a single-column
 * tile is a decoration; in a double it is the reason the tile is wide.
 *
 * The rows come out even — three columns, six full rows, no orphan tile —
 * because every double is paired with a single on its row.
 */
export const CATALOGUE: CatalogueTile[] = [
  {
    group: "Operations",
    title: "Point of Sale",
    description:
      "Orders taken at the table, the counter or the till — once, by whoever is standing there.",
    icon: <CreditCard className={ICON} />,
    header: (
      <Kicker group="Operations">
        <PosArt />
      </Kicker>
    ),
    className: "md:col-span-2",
  },
  {
    group: "Operations",
    title: "Kitchen Display",
    description: "Every order routed to the right preparation station.",
    icon: <Monitor className={ICON} />,
    header: <Kicker group="Operations" />,
    className: "md:col-span-1",
  },
  {
    group: "Business",
    title: "Inventory",
    description:
      "Stock moves as the day does, not at the end of it — every sale takes what it used.",
    icon: <Boxes className={ICON} />,
    header: (
      <Kicker group="Business">
        <InventoryArt />
      </Kicker>
    ),
    className: "md:col-span-2",
  },
  {
    group: "Operations",
    title: "QR Ordering",
    description: "Guests order from where they are sitting.",
    icon: <QrCode className={ICON} />,
    header: <Kicker group="Operations" />,
    className: "md:col-span-1",
  },
  {
    group: "Operations",
    title: "Table Management",
    description: "Covers, turns and waiting guests in one view.",
    icon: <Grid2x2 className={ICON} />,
    header: <Kicker group="Operations" />,
    className: "md:col-span-1",
  },
  {
    group: "Operations",
    title: "Room Operations",
    description: "Rooms, housekeeping and maintenance stay coordinated.",
    icon: <BedDouble className={ICON} />,
    header: <Kicker group="Operations" />,
    className: "md:col-span-1",
  },
  {
    group: "Business",
    title: "Procurement",
    description: "Suppliers and purchasing, connected to what you use.",
    icon: <Truck className={ICON} />,
    header: <Kicker group="Business" />,
    className: "md:col-span-1",
  },
  {
    group: "Business",
    title: "Accounting",
    description: "Every event posts to your books automatically.",
    icon: <Calculator className={ICON} />,
    header: <Kicker group="Business" />,
    className: "md:col-span-1",
  },
  {
    group: "Business",
    title: "Workforce",
    description: "Shifts, attendance and payroll for the whole team.",
    icon: <Users className={ICON} />,
    header: <Kicker group="Business" />,
    className: "md:col-span-1",
  },
  {
    group: "Customer",
    title: "CRM",
    description: "One guest history, wherever they are recognised.",
    icon: <Contact className={ICON} />,
    header: <Kicker group="Customer" />,
    className: "md:col-span-1",
  },
  {
    group: "Intelligence",
    title: "Live Insights",
    description:
      "Covers, revenue and stock as they stand right now — not as they stood last night.",
    icon: <Activity className={ICON} />,
    header: (
      <Kicker group="Intelligence">
        <InsightsArt />
      </Kicker>
    ),
    className: "md:col-span-2",
  },
  {
    group: "Customer",
    title: "Loyalty",
    description: "A stay or a meal becomes a lasting relationship.",
    icon: <Gift className={ICON} />,
    header: <Kicker group="Customer" />,
    className: "md:col-span-1",
  },
  {
    group: "Intelligence",
    title: "IVA",
    description:
      "Ask the business a question in your own words. Every part of the day answers together.",
    icon: <Sparkles className={ICON} />,
    header: (
      <Kicker group="Intelligence">
        <IvaArt />
      </Kicker>
    ),
    className: "md:col-span-2",
  },
  {
    group: "Intelligence",
    title: "Recommendations",
    description: "What to reorder, restaff or reprice — before it bites.",
    icon: <Lightbulb className={ICON} />,
    header: <Kicker group="Intelligence" />,
    className: "md:col-span-1",
  },
];
