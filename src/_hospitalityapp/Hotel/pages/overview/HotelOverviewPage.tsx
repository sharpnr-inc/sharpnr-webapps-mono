import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BedDouble, CalendarDays, DoorOpen } from "lucide-react";
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

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
};

const occupancyData = [
  {
    name: "Occupied",
    value: 72,
  },
];

const occupancyChartConfig = {
  occupied: {
    label: "Occupancy",
    color: "var(--chart-1)",
  },
};

export default function HotelOverviewMainPage() {

  const [isdata] = useState(false);

  return (
    <div className="">
    
      {!isdata ? (
        <>
          {" "}
          <div className=" rounded p-2 space-y-2">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Hotel Overview
              </h2>
              <p className="text-sm text-muted-foreground">
                Overview of room occupancy and bookings
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-5">
              <OverviewCard
                title="Total Rooms"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="120"
                desc="Including all categories"
              />
              <OverviewCard
                title="Upcoming Reservations"
                icon={
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                }
                value="34"
                desc="For the next 7 days"
              />
              <OverviewCard
                title="Rooms Occupied"
                icon={<DoorOpen className="h-4 w-4 text-muted-foreground" />}
                value="86"
                desc="Currently occupied"
              />
              <OverviewCard
                title="Available Rooms"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="34"
                desc="Ready for booking"
              />
              <OverviewCard
                title="Pending Request"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="12"
                desc="Requests"
              />
            </div>

            <div className="grid gap-2 lg:grid-cols-3">
              {/* Occupancy Radial Chart */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm">Room Occupancy</CardTitle>
                </CardHeader>

                <CardContent className="relative flex items-center justify-center">
                  <ChartContainer
                    config={occupancyChartConfig}
                    className="aspect-square h-[220px]"
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
                      <RadialBar dataKey="value" background cornerRadius={10} />
                    </RadialBarChart>
                  </ChartContainer>

                  {/* Center Text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">72%</span>
                    <span className="text-xs text-muted-foreground">
                      Occupied
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Bar Chart */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[260px] w-full"
                  >
                    <BarChart data={data}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" radius={6} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
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
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
