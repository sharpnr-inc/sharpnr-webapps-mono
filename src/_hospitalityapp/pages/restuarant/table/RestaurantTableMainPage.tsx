import { useState } from "react";
import { MenuTerminal } from "@/_hospitalityapp/components/restaurant/MenuTerminal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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

  return (
    <div className="min-h-screen bg-background p-2 pb-24">
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
                      {item.addons
                        .map((a) => `${a.name} ×${a.qty}`)
                        .join(", ")}
                    </p>
                    {item.note && (
                      <p className="text-xs italic text-muted-foreground">
                        📝 {item.note}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{item.price}
                  </TableCell>
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
            <Button
              className="w-full"
              onClick={() => setStatus("SERVED")}
            >
              Mark as Served
            </Button>
          )}

          {status === "SERVED" && (
            <Button
              className="w-full"
              onClick={() => setStatus("BILLED")}
            >
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

      {/* MENU */}
      <MenuTerminal>
        <MenuTerminal.Body>
          <MenuTerminal.Items />
        </MenuTerminal.Body>
      </MenuTerminal>
    </div>
  );
}
