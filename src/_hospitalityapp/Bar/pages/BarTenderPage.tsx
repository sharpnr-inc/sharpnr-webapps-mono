import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GlassWater,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

interface BarTenderPageProps {}

type OrderItem = {
  name: string;
  qty: number;
};

type TableOrder = {
  id: string;
  tableNo: number;
  items: OrderItem[];
  status: "pending" | "preparing";
};

const orders: TableOrder[] = [
  {
    id: "1",
    tableNo: 3,
    status: "pending",
    items: [
      { name: "Whiskey", qty: 2 },
      { name: "Beer", qty: 3 },
    ],
  },
  {
    id: "2",
    tableNo: 7,
    status: "preparing",
    items: [{ name: "Vodka", qty: 1 }],
  },
];

const BarTenderPage: React.FC<BarTenderPageProps> = () => {
  const selectedOrder = orders[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Orders list */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GlassWater className="h-5 w-5" />
            Incoming Orders
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted"
            >
              <div>
                <p className="font-medium">Table {order.tableNo}</p>
                <p className="text-xs text-muted-foreground">
                  {order.items.length} items
                </p>
              </div>

              <Badge
                variant={
                  order.status === "pending" ? "destructive" : "secondary"
                }
              >
                {order.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Table {selectedOrder.tableNo} Order</span>
            <Badge>Active</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 text-sm"
              >
                <span>{item.name}</span>
                <span className="font-medium">× {item.qty}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Preparing
            </Button>

            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarTenderPage;
