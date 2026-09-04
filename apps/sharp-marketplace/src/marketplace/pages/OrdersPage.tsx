import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sharpnr/ui";

import { formatPrice } from "@/marketplace/data/listings";

/**
 * Purchase orders raised from accepted marketplace deals.
 *
 * Dummy until the procurement endpoints exist. A deal is not finished on the
 * marketplace -- it becomes a PO here and an invoice in Sharp-Accounting.
 */
const orders = [
  {
    id: "PO-4821",
    supplier: "Ardent Packaging",
    items: "Corrugated cartons · 2,000",
    value: 124000,
    raised: "2026-09-02",
    status: "Accepted",
  },
  {
    id: "PO-4818",
    supplier: "Meridian Foods",
    items: "Sunflower oil 15 L · 60 tins",
    value: 130800,
    raised: "2026-08-28",
    status: "In transit",
  },
  {
    id: "PO-4809",
    supplier: "Northwind Interiors",
    items: "Guest room desks · 25",
    value: 370000,
    raised: "2026-08-19",
    status: "In production",
  },
  {
    id: "PO-4796",
    supplier: "Kestrel Components",
    items: "Thermal receipt rolls · 400",
    value: 13600,
    raised: "2026-08-11",
    status: "Delivered",
  },
];

export function OrdersPage() {
  const total = orders.reduce((sum, o) => sum + o.value, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Purchase orders
        </h1>
        <p className="text-sm text-muted-foreground">
          {orders.length} orders · {formatPrice(total)} committed. Invoices land
          in Sharp-Accounting automatically.
        </p>
      </div>

      <Card>
        <CardContent className="pt-1">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Raised</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="whitespace-nowrap font-mono text-xs">
                      {order.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {order.supplier}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {order.items}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap tabular-nums">
                      {formatPrice(order.value)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {order.raised}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrdersPage;
