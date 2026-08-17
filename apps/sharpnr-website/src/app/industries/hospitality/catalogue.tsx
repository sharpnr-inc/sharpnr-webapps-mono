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
 * The kicker and the drawings are `./catalogue-art`; this file is the
 * content — which tiles exist, what they say and how wide they are.
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

import {
  InsightsArt,
  InventoryArt,
  IvaArt,
  Kicker,
  PosArt,
} from "./catalogue-art";

const ICON = "h-4 w-4 text-cyan";

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
