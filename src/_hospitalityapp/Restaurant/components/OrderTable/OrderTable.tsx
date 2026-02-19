import { Button } from "@/components/ui/button";
import {
  type ColumnDef,
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
  const { data, isLoading, isError, error } = useDiningSessionOrders(
    restaurantID,
    diningSessionID,
  );

  /**
   * Flatten orders -> items
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
   * TanStack internal requirement
   */
  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        accessorKey: "name",
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * ==========================
   * FALLBACK STATES (IMPORTANT)
   * ==========================
   */

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Failed to load orders
        {error instanceof Error ? `: ${error.message}` : ""}
      </div>
    );
  }

  // Empty
  if (rows.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground border rounded-xl">
        No Orders Found
      </div>
    );
  }

  /**
   * ==========================
   * MAIN UI
   * ==========================
   */
  return (
    <div className="flex flex-col h-full border rounded-xl overflow-y-auto p-3 space-y-3">
      {table.getRowModel().rows.map((row) => {
        const item = row.original;

        return (
          <div key={row.id} className="border rounded-lg p-3 space-y-2 text-sm">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                #{item.orderNumber} · {item.name}
              </div>

              <div className="font-medium">₹{item.total}</div>
            </div>

            {/* Qty + Unit */}
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Qty: {item.quantity}</span>
              <span>Unit: ₹{item.unitPrice}</span>
            </div>

            {/* Variant */}
            <div>
              <span className="font-medium">Variant:</span>{" "}
              <span className="text-muted-foreground">{item.variants}</span>
            </div>

            {/* Addons */}
            <div>
              <span className="font-medium">Addons:</span>{" "}
              <span className="text-muted-foreground">{item.addons}</span>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground">
                Status: {item.status}
              </span>

              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTable;
