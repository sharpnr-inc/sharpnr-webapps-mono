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

  const columns = useMemo<ColumnDef<OrderItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Item",
        cell: (info) => (
          <span className="text-sm font-medium">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
        cell: (info) => (
          <span className="text-sm text-center block">
            {info.getValue() as number}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <span className="text-sm text-right block">
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
            <span className="text-sm font-semibold text-right block">
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
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left font-medium">
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
            <tr key={row.id} className="border-t hover:bg-muted/50 transition">
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
  );
};

export default OrderTable;
