import { Button } from "@/components/ui/button";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

const OrderTable = () => {
  const data = useMemo<OrderItem[]>(
    () => [
      { id: "1", name: "Margherita Pizza", qty: 2, price: 250 },
      { id: "2", name: "Coke", qty: 1, price: 60 },
    ],
    [],
  );

  const totalAmount = useMemo(
    () => data.reduce((acc, item) => acc + item.qty * item.price, 0),
    [data],
  );

  const columns = useMemo<ColumnDef<OrderItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Item",
      },
      {
        accessorKey: "qty",
        header: "Qty",
        cell: (info) => (
          <span className="text-center block">{info.getValue() as number}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <span className="text-right block">
            ₹ {info.getValue() as number}
          </span>
        ),
      },
      {
        id: "total",
        header: "Total",
        cell: ({ row }) => {
          const { qty, price } = row.original;
          return (
            <span className="font-semibold text-right block">
              ₹ {qty * price}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden">
      {/* Scrollable Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-muted/50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Panel */}
      <div className="border-t p-4 flex flex-col gap-4 bg-background">
        {/* Total */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Amount</span>
          <span className="font-semibold text-base">₹ {totalAmount}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Create Bill
          </Button>

          <Button variant="secondary" className="flex-1">
            Pay
          </Button>

          <Button className="flex-1">Close Session</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
