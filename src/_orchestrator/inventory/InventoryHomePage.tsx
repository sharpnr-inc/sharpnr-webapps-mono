import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Warehouse, AlertTriangle, IndianRupee } from "lucide-react";

// Replace these values later with API data
const stats = [
  {
    title: "Total Products",
    value: "1,245",
    icon: Package,
  },
  {
    title: "Total Warehouses",
    value: "5",
    icon: Warehouse,
  },
  {
    title: "Low Stock Items",
    value: "32",
    icon: AlertTriangle,
  },
  {
    title: "Inventory Value",
    value: "₹8,54,200",
    icon: IndianRupee,
  },
];

export function InventoryHomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your inventory performance and warehouse activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Quickly create a new inventory item.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Stock Transfer</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Move stock between warehouses.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>View Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Analyze inventory movement and valuation.
          </CardContent>
        </Card>
      </div>

      {/* Activity Section Placeholder */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Inventory Activity</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Stock updates, transfers, and adjustments will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
