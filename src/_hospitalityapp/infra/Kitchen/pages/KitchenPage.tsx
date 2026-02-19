import { useState, useMemo, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import KDSHeader from "../components/KDSHeader";
import { Timer, AlertTriangle, ChefHat } from "lucide-react";
import { useKitchenKOTs } from "../api/api.queries";

type OrderStatus = "ordered" | "in_progress" | "cooked";

interface KitchenItem {
  id: string;
  menu_item_id: string;
  variant_id?: string;
  qty: number;
  remarks?: string;
  addons: any[];
}

interface KitchenOrder {
  id: string;
  table: string;
  items: KitchenItem[];
  status: OrderStatus;
  waitMinutes: number;
}

const COLUMNS: { id: OrderStatus; label: string; accent: string }[] = [
  { id: "ordered", label: "New Orders", accent: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", accent: "bg-yellow-500" },
  { id: "cooked", label: "Ready", accent: "bg-green-600" },
];

function mapStatus(status: string): OrderStatus {
  switch (status) {
    case "PENDING":
      return "ordered";
    case "IN_PROGRESS":
      return "in_progress";
    case "READY":
    case "COOKED":
      return "cooked";
    default:
      return "ordered";
  }
}

function getWaitMinutes(createdAt: string) {
  const created = new Date(createdAt).getTime();
  return Math.max(0, Math.floor((Date.now() - created) / 60000));
}

export default function KitchenPage() {
  const { data, isLoading, isError } = useKitchenKOTs(
    "0b501f34-1e3c-4ac8-adfd-7136e6832799",
  );

  console.log(data?.data);

  /**
   * API → UI mapping
   */
  const apiOrders = useMemo<KitchenOrder[]>(() => {
    if (!data?.data) return [];

    return data.data.map((kot: any) => ({
      id: kot.id,
      table: kot.ticket_no ?? "KOT",
      status: mapStatus(kot.status),
      waitMinutes: getWaitMinutes(kot.created_at),
      items:
        kot.items?.map((i: any) => ({
          id: i.id,
          menu_item_id: i.menu_item_id,
          variant_id: i.variant_id,
          qty: i.quantity ?? 1,
          remarks: i.remarks,
          addons: i.addons ?? [],
        })) ?? [],
    }));
  }, [data]);

  /**
   * Local state (FIXED — prevents drag reset)
   */
  const [orders, setOrders] = useState<KitchenOrder[]>([]);

  useEffect(() => {
    if (orders.length === 0 && apiOrders.length > 0) {
      setOrders(apiOrders);
    }
  }, [apiOrders, orders.length]);

  /**
   * Totals bar
   */
  const totals = useMemo(() => {
    const counts: Record<string, number> = {};

    orders
      .filter((o) => o.status !== "cooked")
      .forEach((order) => {
        order.items.forEach((item) => {
          counts[item.menu_item_id] =
            (counts[item.menu_item_id] || 0) + item.qty;
        });
      });

    return Object.entries(counts);
  }, [orders]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === draggableId
          ? { ...order, status: destination.droppableId as OrderStatus }
          : order,
      ),
    );
  };

  /**
   * FALLBACKS
   */
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
        Loading kitchen orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
        Failed to load kitchen orders
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
        No kitchen orders
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 p-6 bg-background">
      <KDSHeader />

      {/* TOTALS BAR */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b">
        <div className="flex items-center gap-2 px-3 py-1.5 border rounded-lg">
          <ChefHat size={14} />
          <span className="text-[10px] font-bold uppercase">Total Needs:</span>
        </div>

        {totals.map(([name, qty]) => (
          <div
            key={name}
            className="flex items-center gap-2 px-3 py-1 border rounded-lg"
          >
            <span className="text-[11px] font-medium">{name}</span>
            <Badge variant="secondary">{qty}</Badge>
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className="flex flex-col rounded-xl border bg-muted/20 p-3"
            >
              <div className="mb-3 text-xs font-bold uppercase">
                {col.label}
              </div>

              <Droppable droppableId={col.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 overflow-y-auto"
                  >
                    {orders
                      .filter((o) => o.status === col.id)
                      .map((order, index) => {
                        const isLate = order.waitMinutes >= 12;

                        return (
                          <Draggable
                            key={order.id}
                            draggableId={order.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  snapshot.isDragging &&
                                    "rotate-1 scale-105 shadow-xl",
                                )}
                              >
                                <CardContent className="p-3">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold">
                                      {order.table}
                                    </span>

                                    <div className="text-[10px] flex items-center gap-1">
                                      <Timer size={10} />
                                      {order.waitMinutes}m
                                    </div>
                                  </div>

                                  {/* FULL DETAILS */}
                                  <div className="space-y-3">
                                    {order.items.map((item) => (
                                      <div
                                        key={item.id}
                                        className="border rounded-md p-2 text-[11px] space-y-1"
                                      >
                                        <div className="font-semibold">
                                          item_id: {item.id}
                                        </div>

                                        <div className="text-muted-foreground">
                                          menu_item_id: {item.menu_item_id}
                                        </div>

                                        <div className="text-muted-foreground">
                                          variant_id: {item.variant_id ?? "-"}
                                        </div>

                                        <div className="text-muted-foreground">
                                          quantity: {item.qty}
                                        </div>

                                        {item.remarks && (
                                          <div className="text-muted-foreground">
                                            remarks: {item.remarks}
                                          </div>
                                        )}

                                        <div>
                                          <div className="font-medium">
                                            addons:
                                          </div>

                                          {item.addons.length === 0 ? (
                                            <div className="text-muted-foreground pl-2">
                                              none
                                            </div>
                                          ) : (
                                            <div className="pl-2 space-y-1">
                                              {item.addons.map((addon: any) => (
                                                <div
                                                  key={addon.id}
                                                  className="text-muted-foreground"
                                                >
                                                  • addon_id: {addon.addon_id} |
                                                  qty: {addon.quantity}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {isLate && (
                                    <div className="mt-2 text-[10px] flex items-center gap-1">
                                      <AlertTriangle size={10} />
                                      Overdue
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
