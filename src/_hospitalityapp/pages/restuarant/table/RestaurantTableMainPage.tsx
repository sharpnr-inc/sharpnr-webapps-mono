import { useState } from "react";
import { MenuTerminal } from "@/_hospitalityapp/components/restaurant/MenuTerminal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type KOTStatus = "PENDING" | "PREPARING" | "READY" | "SERVED" | "BILLED";

type OrderItem = {
  id: string;
  name: string;
  variant: string;
  addons: { name: string; qty: number }[];
  note?: string;
  price: number;
};

type KOT = {
  kotId: string;
  tableNo: string;
  status: KOTStatus;
  items: OrderItem[];
};

/* -------------------------------------------------------------------------- */
/* DUMMY KOT */
/* -------------------------------------------------------------------------- */

const DUMMY_KOT: KOT = {
  kotId: "KOT-1024",
  tableNo: "Table 5",
  status: "READY",
  items: [
    {
      id: "1",
      name: "Margherita Pizza",
      variant: "Medium",
      addons: [{ name: "Extra Cheese", qty: 2 }],
      note: "Less salt, No pepper",
      price: 200,
    },
  ],
};

const GST = 0.05;

/* -------------------------------------------------------------------------- */

export default function RestaurantMainTablePage() {
  const [status, setStatus] = useState<KOTStatus>(DUMMY_KOT.status);

  const subTotal = DUMMY_KOT.items.reduce((s, i) => s + i.price, 0);
  const tax = Math.round(subTotal * GST);
  const total = subTotal + tax;

  const kots = [
    { kotNo: "KOT-203", status: "Preparing" },
    { kotNo: "KOT-204", status: "Pending" },
    { kotNo: "KOT-205", status: "Completed" },
  ];

  const DUMMY_CART = {
    kotNo: "KOT-206",
    itemsCount: 4,
    totalQty: 7,
    status: "Draft",
  };

  return (
    <div className="p-2 space-y-2 pb-10">
      {/* CURRENT ORDER */}
      <Card className="mb-3">
        <CardContent className="p-3">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm">Current Order</h3>
              <p className="text-xs text-muted-foreground">
                {DUMMY_KOT.tableNo}
              </p>
            </div>
            <Badge variant="outline">{status}</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_KOT.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.name} ({item.variant})
                    <p className="text-xs text-muted-foreground">
                      +{" "}
                      {item.addons.map((a) => `${a.name} ×${a.qty}`).join(", ")}
                    </p>
                    {item.note && (
                      <p className="text-xs italic text-muted-foreground">
                        📝 {item.note}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right">₹{item.price}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">₹{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="p-3">
          {status === "READY" && (
            <Button className="w-full" onClick={() => setStatus("SERVED")}>
              Mark as Served
            </Button>
          )}

          {status === "SERVED" && (
            <Button className="w-full" onClick={() => setStatus("BILLED")}>
              Close Session & Create Invoice
            </Button>
          )}

          {status !== "READY" && status !== "SERVED" && (
            <p className="text-xs text-muted-foreground text-center w-full">
              Waiting for kitchen…
            </p>
          )}
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="text-sm font-medium">Order Status</div>

          {/* KOT List */}
          <div className="space-y-3">
            {kots.map((kot, index) => (
              <div key={kot.kotNo}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      KOT #{kot.kotNo}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Kitchen Order Ticket
                    </span>
                  </div>

                  <Badge
                    variant={
                      kot.status === "Completed"
                        ? "default"
                        : kot.status === "Pending"
                          ? "secondary"
                          : "outline"
                    }
                    className="capitalize"
                  >
                    {kot.status}
                  </Badge>
                </div>

                {index !== kots.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MENU */}
      <MenuTerminal>
        <MenuTerminal.Body>
          <MenuTerminal.Items />
          <div className=" z-50 border-t bg-background px-3 py-4">
            <div className="flex items-center justify-between gap-3">
              {/* Left Info */}
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    #{DUMMY_CART.kotNo}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5"
                  >
                    {DUMMY_CART.status}
                  </Badge>
                </div>

                <span className="text-[11px] text-muted-foreground">
                  {DUMMY_CART.itemsCount} items • {DUMMY_CART.totalQty} qty
                </span>
              </div>

              {/* Action */}
              <Button size="sm" className="h-9 px-4">
                Send
              </Button>
            </div>
          </div>
        </MenuTerminal.Body>
      </MenuTerminal>
    </div>
  );
}
