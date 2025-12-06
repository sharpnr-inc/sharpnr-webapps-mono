import {
  useMenuGroup,
  useMenuGroupDetails,
} from "@/api_service/queries/HospitalityQueries/Menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Menu, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

export function RestaurantOrderTerminal({ tableId }: any) {
  const { data, isLoading, error } = useMenuGroup();
  const [menuId, setMenuId] = useState("");
  const [activeCategory, setActiveCategory] = useState<any>(null);

  const {
    data: menu,
    isLoading: menuIsLoading,
    error: menuIsError,
  } = useMenuGroupDetails(menuId);

  if (isLoading || menuIsLoading) return <div>Loading...</div>;
  if (error || menuIsError) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

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
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
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
}

  ];

  const table = useReactTable({
    data: orderItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex p-2 gap-2">
        {/* LEFT SIDE - KOT & BILLING */}
        <div className="w-4/12 h-[calc(90vh)] flex flex-col rounded-lg bg-card space-y-4">
          {/* ITEMS LIST */}
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

          {/* BILLING SUMMARY */}
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

            {/* Dialog Trigger */}
            {/* <BillingSummaryDialog /> */}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-8/12 flex flex-row gap-3">
          <div className="flex-1 p-3 rounded-lg border space-y-4 overflow-y-scroll">
            <div className="sticky top-0 bg-background pb-3 space-y-3 z-10">
              <Select value={menuId} onValueChange={setMenuId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Menu group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {menuGroups?.map((grp) => (
                      <SelectItem key={grp.Id} value={grp.Id}>
                        {grp.Name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input placeholder="Search Item…" className="shadow-sm" />
            </div>

            {!activeCategory && (
              <div className="text-muted-foreground text-sm py-20 text-center">
                Select a category from the right →
              </div>
            )}

            {activeCategory && (
              <div className="space-y-2">
                <h2 className="font-semibold text-lg">{activeCategory.name}</h2>

                {activeCategory.sub_categories?.map((subCat: any) => (
                  <div key={subCat.id} className="space-y-2">
                    <h3 className="font-medium text-base">{subCat.name}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {subCat.menu_items?.map((mti: any) => (
                        <div
                          key={mti.id}
                          onClick={() => console.log(mti.id)}
                          className="border rounded-md p-3 shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition"
                        >
                          <div className="flex flex-col gap-1 font-medium text-nowrap">
                            <span>{mti.name}</span>
                            <span className="text-sm text-muted-foreground">
                              ₹{mti.price}
                            </span>
                          </div>

                          {mti.variant_groups && (
                            <span className="text-xs mt-1 text-primary">
                              Customize →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-60 border rounded-lg p-3 overflow-y-scroll">
            <div className="space-y-2">
              {menu?.data?.map((cat: any) => (
                <Button
                  key={cat.id}
                  variant={
                    activeCategory?.id === cat.id ? "default" : "secondary"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function BillingSummaryDialog() {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [upiId, setUpiId] = useState("");

//   return (
//     <Dialog>
     
//       <DialogTrigger asChild>
//         <Button className="w-full mt-4">Close Session</Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Complete Payment</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 py-2">
//           <div className="space-y-1">
//             <label className="text-sm font-medium">Payment Method</label>

//             <Select onValueChange={setPaymentMethod}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select payment method" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="cash">Cash</SelectItem>
//                 <SelectItem value="upi">UPI</SelectItem>
//                 <SelectItem value="card">Card</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {paymentMethod === "upi" && (
//             <div className="space-y-1">
//               <label className="text-sm font-medium">UPI ID</label>
//               <Input
//                 placeholder="example@upi"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//               />
//             </div>
//           )}
//         </div>

//         <DialogFooter>
//           <Button className="w-full">Confirm Payment</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
