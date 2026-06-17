import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  roomsByProperty,
  propertyStatusBreakdown,
  membersByRole,
  occupancyTrend,
} from "./orgData";

// Monochrome palette driven by the theme's neutral tokens.
const FG = "var(--foreground)";
const MUTED = "var(--muted-foreground)";
const BORDER = "var(--border)";

const axisProps = {
  stroke: BORDER,
  tick: { fill: MUTED, fontSize: 11 },
  tickLine: false,
  axisLine: false,
} as const;

const tooltipStyle = {
  borderRadius: 8,
  border: `1px solid ${BORDER}`,
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
  padding: "6px 10px",
} as const;

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-56 pl-0">{children}</CardContent>
    </Card>
  );
}

export function OverviewCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Occupancy trend */}
      <ChartCard title="Portfolio occupancy · last 6 months">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={occupancyTrend} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="occFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={FG} stopOpacity={0.18} />
                <stop offset="100%" stopColor={FG} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={BORDER} strokeDasharray="3 3" />
            <XAxis dataKey="month" {...axisProps} />
            <YAxis width={32} unit="%" {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Occupancy"]} cursor={{ stroke: BORDER }} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke={FG}
              strokeWidth={2}
              fill="url(#occFill)"
              dot={{ r: 2.5, fill: FG, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Rooms by property */}
      <ChartCard title="Rooms by property">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={roomsByProperty} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid vertical={false} stroke={BORDER} strokeDasharray="3 3" />
            <XAxis dataKey="name" {...axisProps} interval={0} tickFormatter={(v: string) => v.split(" ")[0]} />
            <YAxis width={28} {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="rooms" fill={FG} radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Property status */}
      <ChartCard title="Property status">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={propertyStatusBreakdown}
              dataKey="count"
              nameKey="label"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={2}
              strokeWidth={0}
            >
              {propertyStatusBreakdown.map((entry, i) => (
                <Cell key={entry.status} fill={FG} fillOpacity={1 - i * 0.32} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Members by role */}
      <ChartCard title="Members by role">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={membersByRole}
            margin={{ top: 4, right: 16, bottom: 0, left: 8 }}
          >
            <CartesianGrid horizontal={false} stroke={BORDER} strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} {...axisProps} />
            <YAxis type="category" dataKey="label" width={90} {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="count" fill={FG} radius={[0, 4, 4, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
