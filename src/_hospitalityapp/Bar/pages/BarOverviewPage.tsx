import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Beer,
  Users,
  Clock,
  IndianRupee,
  Plus,
} from "lucide-react";

interface BarOverviewPageProps {}

const stats = [
  {
    label: "Total Items",
    value: 128,
    icon: <Beer className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Staff Assigned",
    value: 6,
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Opening Hours",
    value: "12 PM – 1 AM",
    icon: <Clock className="h-5 w-5 text-muted-foreground" />,
  },
  {
    label: "Today Revenue",
    value: "₹24,500",
    icon: <IndianRupee className="h-5 w-5 text-muted-foreground" />,
  },
];

const BarOverviewPage: React.FC<BarOverviewPageProps> = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bar Overview</h1>
          <p className="text-sm text-muted-foreground">
            Quick snapshot of bar operations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Low stock items, fast-moving drinks, and restock alerts will appear
            here.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Latest orders, stock updates, and staff actions will be shown here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BarOverviewPage;
