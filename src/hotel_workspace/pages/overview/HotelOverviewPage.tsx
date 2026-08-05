import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BedDouble, CalendarDays, DoorOpen, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts";

// 1. Data Definitions
const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
];

const occupancyData = [
  {
    name: "Occupied",
    value: 72,
    fill: "#2563eb", // Direct fill for RadialBar
  },
];

// 2. Chart Configurations (Blue Theme)
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb", // Royal Blue
  },
};

const occupancyChartConfig = {
  occupied: {
    label: "Occupancy",
    color: "#3b82f6", // Sky Blue
  },
};

export default function HotelOverviewMainPage() {
  // Toggle this to 'true' to see your future Skeleton state
  const [isLoading] = useState(false);

  if (isLoading) {
    return <HotelOverviewSkeleton />;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          Hotel Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time analytics for room occupancy and revenue.
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <OverviewCard
          title="Total Rooms"
          icon={<BedDouble className="h-4 w-4 text-blue-600" />}
          value="120"
          desc="Across all categories"
        />
        <OverviewCard
          title="Upcoming"
          icon={<CalendarDays className="h-4 w-4 text-blue-600" />}
          value="34"
          desc="Next 7 days"
        />
        <OverviewCard
          title="Occupied"
          icon={<DoorOpen className="h-4 w-4 text-green-600" />}
          value="86"
          desc="Current guests"
        />
        <OverviewCard
          title="Available"
          icon={<BedDouble className="h-4 w-4 text-blue-600" />}
          value="34"
          desc="Ready to book"
        />
        <OverviewCard
          title="Pending"
          icon={<BedDouble className="h-4 w-4 text-orange-600" />}
          value="12"
          desc="New requests"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Occupancy Radial Chart */}
        <Card className="col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium">Room Occupancy</CardTitle>
          </CardHeader>
          <CardContent className="relative flex items-center justify-center min-h-[250px]">
            <ChartContainer
              config={occupancyChartConfig}
              className="aspect-square w-full max-w-[200px]"
            >
              <RadialBarChart
                data={occupancyData}
                startAngle={90}
                endAngle={-270}
                innerRadius={70}
                outerRadius={100}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  tick={false}
                />
                <RadialBar 
                  dataKey="value" 
                  background 
                  cornerRadius={10} 
                  fill="#2563eb" 
                />
              </RadialBarChart>
            </ChartContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">72%</span>
              <span className="text-xs text-muted-foreground font-medium">
                Occupied
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Bar Chart */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[250px] w-full"
            >
              <BarChart data={data} margin={{ top: 20 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* Reusable Components */
function OverviewCard({
  title,
  icon,
  value,
  desc,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  desc: string;
}) {
  return (
    <Card className="hover:border-blue-200 transition-colors shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-medium">{desc}</p>
      </CardContent>
    </Card>
  );
}

/* Placeholder for your Skeleton Logic */
function HotelOverviewSkeleton() {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded" />
      <div className="grid gap-4 sm:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-64 bg-gray-100 rounded-xl col-span-1" />
        <div className="h-64 bg-gray-100 rounded-xl col-span-2" />
      </div>
    </div>
  );
}