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
  CalendarCheck,
  Mail,
  Phone,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

/* ───────────────── Dummy data ─────────────────
 * Placeholder figures until the reporting endpoints exist. They are kept
 * internally consistent -- the stage values sum to the open-pipeline tile, and
 * the last four weeks of wins sum to the deals-won tile -- so the screen does
 * not read as obviously fake while it stands in for the real thing.
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
    label: "Open pipeline",
    value: "$4.2M",
    delta: "+12.4%",
    trend: "up",
    isGood: true,
  },
  {
    label: "Deals won",
    value: "38",
    delta: "+6",
    trend: "up",
    isGood: true,
  },
  {
    label: "New leads",
    value: "512",
    delta: "-4.1%",
    trend: "down",
    isGood: false,
  },
  {
    label: "Win rate",
    value: "24.8%",
    delta: "+1.9 pts",
    trend: "up",
    isGood: true,
  },
];

const pipelineStages = [
  { stage: "Qualification", deals: 42, value: 1.42, label: "$1.42M" },
  { stage: "Discovery", deals: 31, value: 1.08, label: "$1.08M" },
  { stage: "Proposal", deals: 22, value: 0.86, label: "$860K" },
  { stage: "Negotiation", deals: 14, value: 0.54, label: "$540K" },
  { stage: "Closing", deals: 8, value: 0.3, label: "$300K" },
];

const weeklyWins = [
  { week: "W1", wins: 7 },
  { week: "W2", wins: 6 },
  { week: "W3", wins: 9 },
  { week: "W4", wins: 10 },
  { week: "W5", wins: 9 },
  { week: "W6", wins: 11 },
  { week: "W7", wins: 8 },
  { week: "W8", wins: 10 },
];

const activities = [
  {
    id: "a1",
    icon: Phone,
    title: "Follow-up call — Meridian Foods",
    meta: "Asha Patel · 10:30",
  },
  {
    id: "a2",
    icon: Mail,
    title: "Send revised quote — Northwind Retail",
    meta: "Daniel Cruz · 12:00",
  },
  {
    id: "a3",
    icon: Users,
    title: "Discovery call — Kestrel Logistics",
    meta: "Asha Patel · 14:15",
  },
  {
    id: "a4",
    icon: CalendarCheck,
    title: "Contract review — Ardent Health",
    meta: "Priya Nair · 16:00",
  },
];

const recentLeads = [
  {
    id: "l1",
    name: "Rohan Mehta",
    company: "Meridian Foods",
    source: "Website form",
    score: 82,
    status: "Qualified",
  },
  {
    id: "l2",
    name: "Sara Whitfield",
    company: "Northwind Retail",
    source: "Campaign",
    score: 74,
    status: "Working",
  },
  {
    id: "l3",
    name: "Imran Qureshi",
    company: "Kestrel Logistics",
    source: "Referral",
    score: 68,
    status: "Working",
  },
  {
    id: "l4",
    name: "Elena Duarte",
    company: "Ardent Health",
    source: "Marketplace",
    score: 55,
    status: "New",
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
          <TrendIcon
            className={`size-3.5 shrink-0 ${
              isGood
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
            aria-hidden
          />
          <span
            className={
              isGood
                ? "font-medium text-emerald-600 dark:text-emerald-400"
                : "font-medium text-red-600 dark:text-red-400"
            }
          >
            {delta}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

/* ───────────────── Dashboard ───────────────── */

function DashboardIndexPage() {
  const maxStageValue = Math.max(...pipelineStages.map((s) => s.value));
  const maxWeeklyWins = Math.max(...weeklyWins.map((w) => w.wins));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Pipeline, activity and lead flow across your team.
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
        {/* Pipeline by stage: one series, so no legend -- the title says what
            is plotted. Labels sit outside the bars, which is why none of them
            can collide with or be clipped by their own mark. */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Pipeline by stage</h2>
            <p className="text-xs text-muted-foreground">
              117 open deals · $4.2M total value
            </p>
          </CardHeader>

          <CardContent className="space-y-3.5">
            {pipelineStages.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">{stage.stage}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {stage.deals} · {stage.label}
                  </span>
                </div>

                <div className="mt-1.5 h-2.5 w-full rounded-[2px] bg-muted">
                  {/* Square at the baseline, 4px rounded at the data end. */}
                  <div
                    className="h-full rounded-r-[4px] bg-primary"
                    style={{
                      width: `${(stage.value / maxStageValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Deals won: columns over time, one series. Only the current week is
            direct-labelled -- a number on every column reads as noise. */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Deals won</h2>
            <p className="text-xs text-muted-foreground">
              Last 8 weeks · 70 total
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex h-40 items-end gap-2">
              {weeklyWins.map((week, index) => {
                const isCurrent = index === weeklyWins.length - 1;

                return (
                  <div
                    key={week.week}
                    className="group relative flex flex-1 flex-col items-center gap-2"
                  >
                    {/* Hover layer: an HTML chart is interactive, so every
                        mark can be interrogated for its exact value. */}
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute -top-1 z-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                    >
                      {week.week} · {week.wins} won
                    </div>

                    <div className="flex w-full flex-1 items-end justify-center">
                      <div
                        className={`w-full max-w-6 rounded-t-[4px] transition-colors ${
                          isCurrent ? "bg-primary" : "bg-primary/45"
                        } group-hover:bg-primary`}
                        style={{
                          height: `${(week.wins / maxWeeklyWins) * 100}%`,
                        }}
                      />
                    </div>

                    <span className="text-[11px] text-muted-foreground tabular-nums">
                      {isCurrent ? week.wins : week.week}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Lists ── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium">Due today</h2>
            <p className="text-xs text-muted-foreground">
              4 activities across your team
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-1" />

            <ul>
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <li
                    key={activity.id}
                    className="flex items-center gap-3 border-b py-3 last:border-b-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{activity.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {activity.meta}
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
            <h2 className="text-sm font-medium">Recent leads</h2>
            <p className="text-xs text-muted-foreground">
              Newest first, across all sources
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
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {lead.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {lead.company}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {lead.source}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {lead.score}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{lead.status}</Badge>
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
