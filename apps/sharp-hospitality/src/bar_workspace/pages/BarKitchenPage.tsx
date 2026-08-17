import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import {
  Timer,
  CheckCircle2,
  Flame,
} from "lucide-react";

const orders = [
  {
    id: "1",
    tableNo: 5,
    createdAt: "2 min ago",
    status: "new",
    items: [
      { name: "Beer", qty: 3 },
      { name: "Whiskey", qty: 1 },
    ],
  },
  {
    id: "2",
    tableNo: 2,
    createdAt: "5 min ago",
    status: "preparing",
    items: [{ name: "Vodka", qty: 2 }],
  },
];

const BarKitchenPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Flame className="h-6 w-6" />
          Bar Kitchen
        </h1>
        <span className="text-sm text-muted-foreground">
          Live drink orders
        </span>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-l-4"
            style={{
              borderLeftColor:
                order.status === "new"
                  ? "#ef4444"
                  : order.status === "preparing"
                  ? "#f59e0b"
                  : "#22c55e",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <span>Table {order.tableNo}</span>
                <Badge>
                  {order.status}
                </Badge>
              </CardTitle>

              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Timer className="h-3 w-3" />
                {order.createdAt}
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm border-b pb-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">× {item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {order.status === "new" && (
                  <Button size="sm" variant="secondary" className="w-full">
                    Start Preparing
                  </Button>
                )}

                {order.status === "preparing" && (
                  <Button size="sm" className="w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark Ready
                  </Button>
                )}

                {order.status === "ready" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="w-full"
                  >
                    Ready for Pickup
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BarKitchenPage;
