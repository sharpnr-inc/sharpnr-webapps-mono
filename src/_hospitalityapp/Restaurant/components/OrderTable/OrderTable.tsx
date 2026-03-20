import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo, useState } from "react";
import { useDiningSessionOrders } from "../../apis/queries";
import { cn } from "@/lib/utils";
import { Clock, CreditCard, X } from "lucide-react";
import { DiningSessionPayment } from "../DiningSessionPayment";

interface OrderTableProps {
  restaurantID: string;
  diningSessionID: string;
}

interface ParsedAddon {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ParsedVariant {
  id: string;
  name: string;
  price: number;
}

interface ParsedItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes: string | null;
  variants: ParsedVariant[];
  addons: ParsedAddon[];
}

interface ParsedOrder {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  items: ParsedItem[];
  orderTotal: number;
}

function statusStyle(status: string) {
  switch (status.toUpperCase()) {
    case "READY":
      return "bg-green-100 text-green-700 border-green-300";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "PENDING":
      return "bg-blue-100 text-blue-700 border-blue-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const OrderTable: React.FC<OrderTableProps> = ({
  diningSessionID,
  restaurantID,
}) => {
  const { data, isLoading, isError, error } = useDiningSessionOrders(
    restaurantID,
    diningSessionID,
  );

  const [paymentModal, setPaymentModal] = useState(false);

  const orders = useMemo<ParsedOrder[]>(() => {
    if (!data?.data?.orders) return [];
    return data.data.orders.map((order: any) => {
      const items: ParsedItem[] = (order.items ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.quantity * item.unit_price,
        notes: item.notes ?? null,
        variants: item.variants ?? [],
        addons: (item.addons ?? []).filter(Boolean),
      }));
      const orderTotal = items.reduce((sum, i) => sum + i.total, 0);
      return {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        createdAt: order.created_at,
        items,
        orderTotal,
      };
    });
  }, [data]);

  const grandTotal = orders.reduce((sum, o) => sum + o.orderTotal, 0);

  const ActionBar = ({ disabled = false }: { disabled?: boolean }) => (
    <div className="border-t bg-background px-4 py-3 space-y-2 shrink-0">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-muted-foreground font-normal">Grand Total</span>
        <span>₹{grandTotal}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-9 text-sm text-destructive border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {}}
        >
          <X size={14} className="mr-1.5" />
          Close Session
        </Button>
        <Button
          disabled={disabled}
          className="flex-1 h-9 text-sm bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            setPaymentModal(true); // ✅ open dialog
          }}
        >
          <CreditCard size={14} className="mr-1.5" />
          Pay ₹{grandTotal}
        </Button>
      </div>

      <DiningSessionPayment
        openModal={paymentModal}
        setPaymentModal={setPaymentModal}
      />
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Failed to load orders
        {error instanceof Error ? `: ${error.message}` : ""}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          No Orders Found
        </div>
        <ActionBar disabled />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ✅ Fixed height directly on ScrollArea — shadcn is happy */}
      <ScrollArea className="h-[80vh]">
        <div className="flex flex-col space-y-4 p-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">
                    Order #{order.orderNumber}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-2 py-0.5",
                      statusStyle(order.status),
                    )}
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={11} />
                    {formatTime(order.createdAt)}
                  </span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Edit Order
                  </Button>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y">
                {order.items.map((item, idx) => (
                  <div key={item.id} className="px-4 py-3 space-y-1.5">
                    {/* Item name + total */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground w-4 text-right">
                          {idx + 1}.
                        </span>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <span className="font-semibold text-sm">
                        ₹{item.total}
                      </span>
                    </div>

                    {/* Qty + unit price */}
                    <div className="flex items-center gap-4 pl-6 text-xs text-muted-foreground">
                      <span>
                        Qty:{" "}
                        <strong className="text-foreground">
                          {item.quantity}
                        </strong>
                      </span>
                      <span>×</span>
                      <span>₹{item.unitPrice}</span>
                    </div>

                    {/* Variants */}
                    {item.variants.length > 0 && (
                      <div className="pl-6 flex items-center gap-1.5 flex-wrap">
                        {item.variants.map((v) => (
                          <Badge
                            key={v.id}
                            variant="secondary"
                            className="text-[10px] px-2 py-0"
                          >
                            {v.name} · ₹{v.price}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Addons */}
                    {item.addons.length > 0 && (
                      <div className="pl-6 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-muted-foreground">
                          Add-ons:
                        </span>
                        {item.addons.map((a) => (
                          <Badge
                            key={a.id}
                            variant="outline"
                            className="text-[10px] px-2 py-0"
                          >
                            {a.name} ×{a.quantity} · ₹{a.price}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <div className="pl-6 text-[11px] text-orange-600 italic">
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-t">
                <span className="text-xs text-muted-foreground">
                  {order.items.length} item
                  {order.items.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span className="text-muted-foreground font-normal text-xs">
                    Order Total
                  </span>
                  ₹{order.orderTotal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* ── Pinned Bottom Action Bar ── */}
      <ActionBar />
    </div>
  );
};

export default OrderTable;
