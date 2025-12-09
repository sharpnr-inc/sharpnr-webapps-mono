import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuTerminal } from "@/_hospitalityapp/components/restaurant/MenuTerminal";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  addons?: string[];
  variant?: string;
  notes?: string;
  status?: "pending" | "preparing" | "served" | "cancelled";
};

/****************************************
 * This is the Table for the Restaurant *
 * This Main                            *
 *                                      *
 ****************************************/
export default function RestaurantMainTablePage() {
  const initialOrderItems: OrderItem[] = [
    {
      id: "1",
      name: "Margherita Pizza",
      qty: 1,
      price: 299,
      addons: ["Extra Cheese"],
      variant: "Large",
      notes: "Less salt",
      status: "pending",
    },
    {
      id: "2",
      name: "Paneer Tikka",
      qty: 2,
      price: 199,
      addons: ["Spicy"],
      status: "preparing",
    },
    {
      id: "3",
      name: "Chole Bhature",
      qty: 1,
      price: 149,
      status: "served",
    },
  ];

  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialOrderItems);

  const removeItem = (id: string) => {
    setOrderItems((s) => s.filter((it) => it.id !== id));
  };

  const editItem = (item: OrderItem) => {
    // placeholder — open edit modal or drawer
    console.log("edit", item);
  };

  const openNotes = (item: OrderItem) => {
    // placeholder — open notes modal
    console.log("notes", item);
  };

  const openAddons = (item: OrderItem) => {
    // placeholder — open addons modal
    console.log("addons", item);
  };

  const toggleNextStatus = (id: string) => {
    setOrderItems((items) =>
      items.map((it) => {
        if (it.id !== id) return it;
        const order = ["pending", "preparing", "served", "cancelled"] as const;
        const idx = order.indexOf(it.status || "pending");
        const next = order[(idx + 1) % order.length];
        return { ...it, status: next };
      })
    );
  };

  const columns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: "name",
      header: "Item",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm">{item.qty} ×</span>
            </div>

            {item.variant && (
              <span className="text-xs text-muted-foreground">
                Variant: {item.variant}
              </span>
            )}

            {item.addons && item.addons.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Addons: {item.addons.join(", ")}
              </span>
            )}

            {item.notes && (
              <span className="text-xs italic text-primary">
                Note: {item.notes}
              </span>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "price",
      header: "Amount",
      cell: ({ row }) => (
        <div className="text-right">₹{row.original.price}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status || "pending";
        const map: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-800",
          preparing: "bg-blue-100 text-blue-800",
          served: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
        };

        return (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => toggleNextStatus(row.original.id)}
              className={`px-2 py-1 text-xs rounded-full font-medium ${map[s]} hover:opacity-90`}
              title="Click to advance status"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => editItem(item)}>
                  Edit Item
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => openAddons(item)}>
                  Addons / Variants
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => openNotes(item)}>
                  Add Notes
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => removeItem(item.id)}
                  className="text-red-600"
                >
                  Remove Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orderItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex p-2 gap-2 ">
      <div className="w-4/12 h-[calc(90vh)] flex flex-col rounded-lg bg-card space-y-4">
        <div className="flex-1 overflow-y-auto rounded-lg border bg-background p-2">
          <Table className="[&_tr]:h-16">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No items added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <Table>
            <TableCaption>Billing Summary</TableCaption>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Subtotal</TableCell>
                <TableCell className="text-right">₹0.00</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">GST (18%)</TableCell>
                <TableCell className="text-right">₹0.00</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Service Charge (10%)
                </TableCell>
                <TableCell className="text-right">₹0.00</TableCell>
              </TableRow>

              <TableRow className="border-t">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">₹0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <MenuTerminal>
        <MenuTerminal.Header />

        <MenuTerminal.Body>
          <MenuTerminal.Categories />
          <MenuTerminal.Items />
        </MenuTerminal.Body>

        <MenuTerminal.Footer />
      </MenuTerminal>
    </div>
  );
}
