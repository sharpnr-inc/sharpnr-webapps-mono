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
  Archive,
  Boxes,
  CheckCircle2,
  Database,
  TrendingDown,
  TrendingUp,
  Workflow,
  XCircle,
} from "lucide-react";

/* ───────────────── Dummy data ─────────────────
 * Placeholder figures until the Silo metering endpoints exist. They are kept
 * internally consistent -- the service rows sum to the stored-data tile and
 * the health states sum to the resource count -- so the screen does not read
 * as obviously fake while it stands in.
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
    label: "Data stored",
    value: "412 TB",
    delta: "+18 TB",
    trend: "up",
    isGood: true,
  },
  {
    label: "Provisioned resources",
    value: "284",
    delta: "+12",
    trend: "up",
    isGood: true,
  },
  {
    label: "Egress this month",
    value: "37 TB",
    delta: "+9.4%",
    trend: "up",
    isGood: false,
  },
  {
    label: "Failed backups",
    value: "2",
    delta: "-4",
    trend: "down",
    isGood: true,
  },
];

/** Terabytes stored per service. */
const storageByService = [
  { service: "Object storage", tb: 186 },
  { service: "Data lake", tb: 121 },
  { service: "Drive", tb: 58 },
  { service: "PostgreSQL", tb: 32 },
  { service: "Warehouse", tb: 15 },
];

/**
 * Resource health uses the reserved status palette, not series colours -- and
 * each row carries an icon and a word, so the state survives for readers who
 * cannot separate the hues.
 */
const resourceHealth = [
  {
    state: "Healthy",
    count: 261,
    icon: CheckCircle2,
    tone: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-600 dark:bg-emerald-400",
  },
  {
    state: "Degraded",
    count: 18,
    icon: AlertTriangle,
    tone: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-600 dark:bg-amber-400",
  },
  {
    state: "Failing",
    count: 5,
    icon: XCircle,
    tone: "text-red-600 dark:text-red-400",
    bar: "bg-red-600 dark:bg-red-400",
  },
];

const recentActivity = [
  {
    id: "a1",
    icon: Database,
    title: "Database provisioned — analytics-prod",
    meta: "PostgreSQL 16 · 4 vCPU · 09:41",
  },
  {
    id: "a2",
    icon: Workflow,
    title: "Pipeline completed — orders_daily",
    meta: "4.2M rows · lake → warehouse · 09:20",
  },
  {
    id: "a3",
    icon: Boxes,
    title: "Bucket created — media-public",
    meta: "CDN enabled · versioning on · 08:58",
  },
  {
    id: "a4",
    icon: Archive,
    title: "Backup verified — billing-prod",
    meta: "Restore test passed · 08:14",
  },
];

const largestResources = [
  {
    id: "r1",
    name: "media-public",
    type: "Bucket",
    size: "94 TB",
    growth: "+2.1 TB",
  },
  {
    id: "r2",
    name: "events-raw",
    type: "Data lake",
    size: "78 TB",
    growth: "+5.4 TB",
  },
  {
    id: "r3",
    name: "org-drive",
    type: "Drive",
    size: "58 TB",
    growth: "+0.9 TB",
  },
  {
    id: "r4",
    name: "analytics-prod",
    type: "PostgreSQL",
    size: "12 TB",
    growth: "+0.3 TB",
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
  const maxTb = Math.max(...storageByService.map((s) => s.tb));
  const totalTb = storageByService.reduce((sum, s) => sum + s.tb, 0);
  const totalResources = resourceHealth.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Storage, databases and data platform across your organization.
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
            <h2 className="text-sm font-medium">Stored data by service</h2>
            <p className="text-xs text-muted-foreground">
              {totalTb.toLocaleString()} TB across all services
            </p>
          </CardHeader>

          <CardContent className="space-y-3.5">
            {storageByService.map((row) => (
              <div key={row.service}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">{row.service}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {row.tb} TB
                  </span>
                </div>

                <div className="mt-1.5 h-2.5 w-full rounded-[2px] bg-muted">
                  {/* Square at the baseline, 4px rounded at the data end. */}
                  <div
                    className="h-full rounded-r-[4px] bg-primary"
                    style={{ width: `${(row.tb / maxTb) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Resource health</h2>
            <p className="text-xs text-muted-foreground">
              {totalResources.toLocaleString()} provisioned resources
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {resourceHealth.map((row) => {
              const Icon = row.icon;
              const share = (row.count / totalResources) * 100;

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
            <h2 className="text-sm font-medium">Recent activity</h2>
            <p className="text-xs text-muted-foreground">
              Provisioning, pipelines and backups
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-1" />

            <ul>
              {recentActivity.map((movement) => {
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
            <h2 className="text-sm font-medium">Largest resources</h2>
            <p className="text-xs text-muted-foreground">
              By stored size, largest first
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Wide content scrolls inside its own container so the page body
                never scrolls sideways on a narrow window. */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Size</TableHead>
                    <TableHead className="text-right">30d growth</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {largestResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium whitespace-nowrap font-mono text-xs">
                        {resource.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {resource.type}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap tabular-nums">
                        {resource.size}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap text-muted-foreground tabular-nums">
                        {resource.growth}
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
