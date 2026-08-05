import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTakewayOrderSummaryStore } from "./store/order-summary-store";

type OrderItem = {
  item_id: string;
  name: string;
  base_price: number;
  variant?: {
    variant_group_id: string;
    variant_id: string;
    name: string;
    price: number;
  };
  add_ons: {
    add_on_id: string;
    name: string;
    price: number;
    qty: number;
  }[];
  notes?: string;
  quantity: number;
  total_price: number;
};

export function SalePosTerminalOrderSummary() {
  const takeAwayOrder = useTakewayOrderSummaryStore((s) => s.TakeawayOrder);

  const columns: ColumnDef<OrderItem>[] = [
    {
      header: "Item",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="space-y-1">
            <div className="font-medium">{item.name}</div>

            {item.variant && (
              <div className="text-xs text-muted-foreground">
                Variant: {item.variant.name}
              </div>
            )}

            {item.add_ons.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {item.add_ons.map((addon) => (
                  <div key={addon.add_on_id}>
                    {addon.name} × {addon.qty}
                  </div>
                ))}
              </div>
            )}

            {item.notes && (
              <div className="text-xs text-muted-foreground">
                Note: {item.notes}
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => (
        <div className="text-center">{row.original.quantity}</div>
      ),
    },

    {
      accessorKey: "base_price",
      header: "Base Price",
      cell: ({ row }) => (
        <div className="text-right">₹ {row.original.base_price}</div>
      ),
    },

    {
      accessorKey: "total_price",
      header: "Total",
      cell: ({ row }) => (
        <div className="text-right font-semibold">
          ₹ {row.original.total_price}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: takeAwayOrder,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">Order Summary</div>

      <div className="border rounded-md">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-muted-foreground"
                >
                  No items added
                </td>
              </tr>
            )}

            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
