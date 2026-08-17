import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";
import { IndianRupee, Utensils, Users } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const stats = [
  {
    label: "Orders in Progress",
    value: 8,
    icon: <Utensils className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Staff On Duty",
    value: 15,
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Today Revenue",
    value: "₹38,400",
    icon: <IndianRupee className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Today Revenue",
    value: "₹38,400",
    icon: <IndianRupee className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Today Revenue",
    value: "₹38,400",
    icon: <IndianRupee className="h-5 w-5 text-muted-foreground" />,
  },
];

const totalTables = 22;
const occupiedTables = 12;

const occupancyData = [
  { name: "Occupied", value: occupiedTables },
  { name: "Available", value: totalTables - occupiedTables },
];

const COLORS = ["#22c55e", "#e5e7eb"];

export default function RestaurantOverviewPage() {
  const occupancyPercent = Math.round((occupiedTables / totalTables) * 100);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Restaurant Overview</h1>
          <p className="text-sm text-muted-foreground">
            Live snapshot of restaurant operations
          </p>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Occupancy Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Occupancy</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative">
              <PieChart width={180} height={180}>
                <Pie
                  data={occupancyData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {occupancyData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>

              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">
                  {occupancyPercent}%
                </span>
                <span className="text-xs text-muted-foreground">Occupied</span>
              </div>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              {occupiedTables} of {totalTables} tables in use
            </div>
          </CardContent>
        </Card>

        {/* Stats Column */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {stats.map((item) => (
            <Card key={item.label} className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
