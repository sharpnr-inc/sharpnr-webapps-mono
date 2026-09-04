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
  CheckCircle2,
  KeyRound,
  Laptop,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserMinus,
} from "lucide-react";

/* ───────────────── Dummy data ─────────────────
 * Placeholder figures until the Cortex reporting endpoints exist. They are
 * kept internally consistent -- the three compliance states sum to the managed
 * devices tile, and the credential table matches its own count -- so the
 * screen does not read as obviously fake while it stands in.
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
    label: "Managed devices",
    value: "1,284",
    delta: "+46",
    trend: "up",
    isGood: true,
  },
  {
    label: "Active users",
    value: "342",
    delta: "+8",
    trend: "up",
    isGood: true,
  },
  {
    label: "Pending access requests",
    value: "18",
    delta: "+5",
    trend: "up",
    isGood: false,
  },
  {
    label: "Credentials expiring",
    value: "7",
    delta: "-3",
    trend: "down",
    isGood: true,
  },
];

const accessGrants = [
  { resource: "Databases", grants: 486 },
  { resource: "APIs", grants: 312 },
  { resource: "Storage", grants: 274 },
  { resource: "Services", grants: 158 },
  { resource: "Infrastructure", grants: 92 },
];

/**
 * Device compliance uses the reserved status palette, not series colours --
 * and each row carries an icon and a word, so the state survives for readers
 * who cannot separate the hues.
 */
const deviceCompliance = [
  {
    state: "Compliant",
    count: 1102,
    icon: CheckCircle2,
    tone: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-600 dark:bg-emerald-400",
  },
  {
    state: "At risk",
    count: 134,
    icon: AlertTriangle,
    tone: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-600 dark:bg-amber-400",
  },
  {
    state: "Non-compliant",
    count: 48,
    icon: ShieldAlert,
    tone: "text-red-600 dark:text-red-400",
    bar: "bg-red-600 dark:bg-red-400",
  },
];

const recentEvents = [
  {
    id: "e1",
    icon: KeyRound,
    title: "API key issued — billing-sync",
    meta: "Priya Nair · scoped to Silo read · 09:42",
  },
  {
    id: "e2",
    icon: UserCheck,
    title: "Admin access granted — analytics-prod",
    meta: "Approved by Daniel Cruz · expires in 7 days · 09:15",
  },
  {
    id: "e3",
    icon: Laptop,
    title: "Device enrolled — MacBook Pro 14",
    meta: "Issued to Rohan Mehta · 08:51",
  },
  {
    id: "e4",
    icon: UserMinus,
    title: "Access revoked — offboarding",
    meta: "Sara Whitfield · 12 grants removed · 08:20",
  },
];

const expiringCredentials = [
  {
    id: "c1",
    name: "billing-sync",
    type: "API key",
    owner: "Finance Systems",
    expires: "3 days",
  },
  {
    id: "c2",
    name: "warehouse-etl",
    type: "Service account",
    owner: "Data Platform",
    expires: "6 days",
  },
  {
    id: "c3",
    name: "stripe-webhook",
    type: "Secret",
    owner: "Payments",
    expires: "11 days",
  },
  {
    id: "c4",
    name: "reporting-readonly",
    type: "API key",
    owner: "Analytics",
    expires: "18 days",
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
  const maxGrants = Math.max(...accessGrants.map((g) => g.grants));
  const totalGrants = accessGrants.reduce((sum, g) => sum + g.grants, 0);
  const totalDevices = deviceCompliance.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Access, devices and credentials across your organization.
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
            <h2 className="text-sm font-medium">Access grants by resource</h2>
            <p className="text-xs text-muted-foreground">
              {totalGrants.toLocaleString()} active grants
            </p>
          </CardHeader>

          <CardContent className="space-y-3.5">
            {accessGrants.map((grant) => (
              <div key={grant.resource}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">{grant.resource}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {grant.grants}
                  </span>
                </div>

                <div className="mt-1.5 h-2.5 w-full rounded-[2px] bg-muted">
                  {/* Square at the baseline, 4px rounded at the data end. */}
                  <div
                    className="h-full rounded-r-[4px] bg-primary"
                    style={{ width: `${(grant.grants / maxGrants) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Device compliance</h2>
            <p className="text-xs text-muted-foreground">
              {totalDevices.toLocaleString()} managed devices
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {deviceCompliance.map((row) => {
              const Icon = row.icon;
              const share = (row.count / totalDevices) * 100;

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
              Latest entries from the audit log
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-1" />

            <ul>
              {recentEvents.map((event) => {
                const Icon = event.icon;

                return (
                  <li
                    key={event.id}
                    className="flex items-center gap-3 border-b py-3 last:border-b-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{event.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {event.meta}
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
            <h2 className="text-sm font-medium">Expiring credentials</h2>
            <p className="text-xs text-muted-foreground">
              Next 30 days, soonest first
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
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Expires in</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {expiringCredentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell className="font-medium whitespace-nowrap font-mono text-xs">
                        {credential.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {credential.type}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {credential.owner}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap tabular-nums">
                        {credential.expires}
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
