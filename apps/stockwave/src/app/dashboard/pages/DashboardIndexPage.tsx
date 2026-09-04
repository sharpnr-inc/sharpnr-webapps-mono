import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sharpnr/ui";
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  PackageCheck,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Truck,
  XCircle,
} from "lucide-react";

/* ───────────────── Dummy data ─────────────────
 * Placeholder figures until the Stockwave reporting endpoints exist. They are
 * kept internally consistent -- the stock-health states sum to the tracked-SKU
 * tile, and the warehouse rows sum to the on-hand units -- so the screen does
 * not read as obviously fake while it stands in.
 */

type Trend = "up" | "down";

const stats: {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  /** Whether the trend direction is good news for this particular metric. */
  isGood: boolean;
}[] = [
  {
    label: "Stock on hand",
    value: "$1.84M",
    delta: "+3.2%",
    trend: "up",
    isGood: true,
  },
  {
    label: "Tracked SKUs",
    value: "3,120",
    delta: "+64",
    trend: "up",
    isGood: true,
  },
  {
    label: "Open purchase orders",
    value: "47",
    delta: "-6",
    trend: "down",
    isGood: true,
  },
  {
    label: "Below reorder point",
    value: "182",
    delta: "+23",
    trend: "up",
    isGood: false,
  },
];

const warehouseStock = [
  { warehouse: "Central DC", units: 48200 },
  { warehouse: "North Hub", units: 31450 },
  { warehouse: "South Hub", units: 24800 },
  { warehouse: "Retail — Flagship", units: 9600 },
  { warehouse: "Returns Holding", units: 3150 },
];

/**
 * Stock health uses the reserved status palette, not series colours -- and
 * each row carries an icon and a word, so the state survives for readers who
 * cannot separate the hues.
 */
const stockHealth = [
  {
    state: "Healthy",
    count: 2841,
    icon: CheckCircle2,
    tone: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-600 dark:bg-emerald-400",
  },
  {
    state: "Below reorder point",
    count: 182,
    icon: AlertTriangle,
    tone: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-600 dark:bg-amber-400",
  },
  {
    state: "Out of stock",
    count: 97,
    icon: XCircle,
    tone: "text-red-600 dark:text-red-400",
    bar: "bg-red-600 dark:bg-red-400",
  },
];

const recentMovements = [
  {
    id: "m1",
    icon: PackageCheck,
    title: "Received PO-4821 — Meridian Supply",
    meta: "1,200 units · Central DC · 09:38",
  },
  {
    id: "m2",
    icon: Truck,
    title: "Shipped SO-9134 — Northwind Retail",
    meta: "340 units · North Hub · 09:12",
  },
  {
    id: "m3",
    icon: ArrowLeftRight,
    title: "Transfer TR-233 in transit",
    meta: "Central DC → South Hub · 640 units · 08:47",
  },
  {
    id: "m4",
    icon: ShoppingCart,
    title: "PO-4830 raised — Kestrel Components",
    meta: "Awaiting approval · 2,000 units · 08:05",
  },
];

const reorderItems = [
  {
    id: "r1",
    sku: "SKU-10482",
    name: "Thermal roll 80mm",
    onHand: 42,
    reorder: 250,
    supplier: "Meridian Supply",
  },
  {
    id: "r2",
    sku: "SKU-20117",
    name: "Packing carton L",
    onHand: 118,
    reorder: 400,
    supplier: "Kestrel Components",
  },
  {
    id: "r3",
    sku: "SKU-30945",
    name: "Barcode label 50x25",
    onHand: 0,
    reorder: 1000,
    supplier: "Meridian Supply",
  },
  {
    id: "r4",
    sku: "SKU-41260",
    name: "Pallet wrap 500mm",
    onHand: 26,
    reorder: 120,
    supplier: "Ardent Packaging",
  },
];

/* ───────────────── Stat tile ───────────────── */

const StatTile: React.FC<(typeof stats)[number]> = ({
  label,
  value,
  delta,
  trend,
  isGood,
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const tone = isGood
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-red-600 dark:text-red-400";

  return (
    <Card>
      <CardContent className="pt-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        {/* Proportional figures, not tabular: a standalone display number
            looks loose when every digit is padded to the width of a 0. */}
        <p className="mt-1.5 text-3xl font-semibold tracking-tight">{value}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {/* The icon and the "vs last month" text carry the direction, so
              the meaning survives without the colour. */}
          <TrendIcon className={`size-3.5 shrink-0 ${tone}`} aria-hidden />
          <span className={`font-medium ${tone}`}>{delta}</span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

/* ───────────────── Dashboard ───────────────── */

function DashboardIndexPage() {
  const maxUnits = Math.max(...warehouseStock.map((w) => w.units));
  const totalUnits = warehouseStock.reduce((sum, w) => sum + w.units, 0);
  const totalSkus = stockHealth.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Stock position, movement and replenishment across your locations.
          </p>
        </div>
        <Badge variant="outline">Last 30 days</Badge>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* One series, so no legend -- the title says what is plotted. Labels
            sit outside the bars, so none can be clipped by its own mark. */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Units by location</h2>
            <p className="text-xs text-muted-foreground">
              {totalUnits.toLocaleString()} units on hand
            </p>
          </CardHeader>

          <CardContent className="space-y-3.5">
            {warehouseStock.map((row) => (
              <div key={row.warehouse}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">{row.warehouse}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {row.units.toLocaleString()}
                  </span>
                </div>

                <div className="mt-1.5 h-2.5 w-full rounded-[2px] bg-muted">
                  {/* Square at the baseline, 4px rounded at the data end. */}
                  <div
                    className="h-full rounded-r-[4px] bg-primary"
                    style={{ width: `${(row.units / maxUnits) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Stock health</h2>
            <p className="text-xs text-muted-foreground">
              {totalSkus.toLocaleString()} tracked SKUs
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {stockHealth.map((row) => {
              const Icon = row.icon;
              const share = (row.count / totalSkus) * 100;

              return (
                <div key={row.state}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2">
                      {/* Icon + word, so the state never rests on colour. */}
                      <Icon
                        className={`size-4 shrink-0 ${row.tone}`}
                        aria-hidden
                      />
                      {row.state}
                    </span>
                    <span className="shrink-0 text-muted-foreground tabular-nums">
                      {row.count.toLocaleString()} · {share.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-1.5 h-2.5 w-full rounded-[2px] bg-muted">
                    <div
                      className={`h-full rounded-r-[4px] ${row.bar}`}
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── Lists ── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Recent movement</h2>
            <p className="text-xs text-muted-foreground">
              Receipts, shipments and transfers
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-1" />

            <ul>
              {recentMovements.map((movement) => {
                const Icon = movement.icon;

                return (
                  <li
                    key={movement.id}
                    className="flex items-center gap-3 border-b py-3 last:border-b-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{movement.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {movement.meta}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Needs reordering</h2>
            <p className="text-xs text-muted-foreground">
              Below reorder point, lowest cover first
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Wide content scrolls inside its own container so the page body
                never scrolls sideways on a narrow window. */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">On hand</TableHead>
                    <TableHead className="text-right">Reorder at</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {reorderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap font-mono text-xs">
                        {item.sku}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {item.onHand}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground tabular-nums">
                        {item.reorder}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {item.supplier}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardIndexPage;
