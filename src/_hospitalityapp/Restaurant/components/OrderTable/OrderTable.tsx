import { Button } from "@/components/ui/button";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useDiningSessionOrders } from "../../apis/queries";

interface OrderTableProps {
  restaurantID: string;
  diningSessionID: string;
}

type TableRow = {
  orderId: string;
  orderNumber: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  variants: string;
  addons: string;
  status: string;
  createdAt: string;
};

const OrderTable: React.FC<OrderTableProps> = ({
  diningSessionID,
  restaurantID,
}) => {
  const { data, isLoading } = useDiningSessionOrders(
    restaurantID,
    diningSessionID,
  );

  /**
   * Flatten orders -> items into table rows
   */
  const rows = useMemo<TableRow[]>(() => {
    if (!data?.data?.orders) return [];

    return data.data.orders.flatMap((order: any) =>
      order.items.map((item: any) => {
        const variants =
          item.variants?.map((v: any) => v.name).join(", ") || "-";

        const addons =
          item.addons?.map((a: any) => `${a.name} x${a.quantity}`).join(", ") ||
          "-";

        return {
          orderId: order.id,
          orderNumber: order.order_number,
          itemId: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          total: item.quantity * item.unit_price,
          variants,
          addons,
          status: item.status,
          createdAt: order.created_at,
        };
      }),
    );
  }, [data]);

  /**
   * Table columns
   */
  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        header: "Order #",
        accessorKey: "orderNumber",
      },
      {
        header: "Item",
        accessorKey: "name",
      },
      {
        header: "Qty",
        accessorKey: "quantity",
      },
      {
        header: "Unit Price",
        accessorKey: "unitPrice",
        cell: ({ row }) => `₹${row.original.unitPrice}`,
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => `₹${row.original.total}`,
      },
      {
        header: "Variants",
        accessorKey: "variants",
      },
      {
        header: "Addons",
        accessorKey: "addons",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Action",
        cell: () => <Button size="sm">Edit</Button>,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left p-3 font-medium">
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center p-6">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
