import { useState, useMemo, useEffect, useRef } from "react";
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
import { useKitchenKOTsSSE } from "../api/api.sse";
import { UpdateKOTStatus } from "../api/api.service";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const COLUMNS: { id: OrderStatus; label: string }[] = [
  { id: "ordered", label: "New Orders" },
  { id: "in_progress", label: "In Progress" },
  { id: "cooked", label: "Ready" },
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

function mapUIToAPIStatus(
  status: OrderStatus,
): "PENDING" | "IN_PROGRESS" | "READY" {
  switch (status) {
    case "ordered":
      return "PENDING";
    case "in_progress":
      return "IN_PROGRESS";
    case "cooked":
      return "READY";
    default:
      return "PENDING";
  }
}

function getWaitMinutes(createdAt: string) {
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000),
  );
}

function parseKOT(kot: any): KitchenOrder {
  return {
    id: kot.id,
    table: kot.ticket_no ?? "KOT",
    status: mapStatus(kot.status),
    waitMinutes: getWaitMinutes(kot.created_at),
    items:
      kot.items?.map((i: any) => ({
        id: i.order_id,
        menu_item_id: i.MenuItemName ?? i.menu_item_id,
        variant_id: i.VaraintName ?? i.variant_id,
        qty: i.quantity ?? 1,
        remarks: i.remarks,
        addons: i.addons ?? [],
      })) ?? [],
  };
}

const KITCHEN_ID = "0b501f34-1e3c-4ac8-adfd-7136e6832799";

export default function KitchenPage() {
  const { data, isLoading, isError } = useKitchenKOTsSSE(KITCHEN_ID);

  const [orders, setOrders] = useState<KitchenOrder[]>([]);

  /**
   * pendingUpdates: tracks statuses the user dragged locally
   * but the backend hasn't confirmed yet via SSE.
   *
   * Key   → order ID
   * Value → the locally-set status we want to preserve
   */
  const pendingUpdates = useRef<Map<string, OrderStatus>>(new Map());

  /**
   * SSE MERGE — respects pending drag updates
   */
  useEffect(() => {
    if (!data?.data) return;

    const incoming: KitchenOrder[] = data.data.map(parseKOT);

    setOrders(
      incoming.map((newOrder) => {
        const pendingStatus = pendingUpdates.current.get(newOrder.id);

        if (pendingStatus !== undefined) {
          if (pendingStatus === newOrder.status) {
            // ✅ SSE confirmed our optimistic update — stop overriding
            pendingUpdates.current.delete(newOrder.id);
            return newOrder;
          }
          // ⏳ SSE hasn't caught up yet — keep our local status
          return { ...newOrder, status: pendingStatus };
        }

        return newOrder;
      }),
    );
  }, [data]);

  /**
   * TOTALS (exclude ready orders)
   */
  const totals = useMemo(() => {
    const counts: Record<string, number> = {};
    orders
      .filter((o) => o.status !== "cooked")
      .forEach((order) =>
        order.items.forEach((item) => {
          counts[item.menu_item_id] =
            (counts[item.menu_item_id] || 0) + item.qty;
        }),
      );
    return Object.entries(counts);
  }, [orders]);

  /**
   * DRAG END
   */
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as OrderStatus;

    // 1️⃣ Register the pending update BEFORE state change
    pendingUpdates.current.set(draggableId, newStatus);

    // 2️⃣ Optimistic UI update
    setOrders((prev) =>
      prev.map((o) => (o.id === draggableId ? { ...o, status: newStatus } : o)),
    );

    try {
      await UpdateKOTStatus(
        KITCHEN_ID,
        draggableId,
        mapUIToAPIStatus(newStatus),
      );
      // SSE will eventually confirm and clear the pending entry
    } catch (err) {
      console.error("Failed to update KOT status:", err);
      // 3️⃣ Rollback on error
      pendingUpdates.current.delete(draggableId);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === draggableId
            ? { ...o, status: mapStatus("PENDING") } // revert to original
            : o,
        ),
      );
    }
  };

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

      {/* TOTALS */}
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
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase">{col.label}</span>
                <Badge variant="outline">
                  {orders.filter((o) => o.status === col.id).length}
                </Badge>
              </div>
              <ScrollArea className="h-[75vh]">
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "space-y-3 overflow-y-auto flex-1 min-h-[80px] rounded-lg transition-colors",
                        snapshot.isDraggingOver && "bg-muted/40",
                      )}
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
                                    "transition-shadow",
                                    snapshot.isDragging &&
                                      "rotate-1 scale-105 shadow-xl ring-2 ring-primary/30",
                                    isLate && "border-orange-400",
                                  )}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex justify-between mb-2">
                                      <span className="text-xs font-bold">
                                        {order.table}
                                      </span>
                                      <div
                                        className={cn(
                                          "text-[10px] flex items-center gap-1",
                                          isLate
                                            ? "text-orange-500 font-semibold"
                                            : "text-muted-foreground",
                                        )}
                                      >
                                        {isLate && <AlertTriangle size={10} />}
                                        <Timer size={10} />
                                        {order.waitMinutes}m
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      {order.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="border rounded-md p-2 text-[11px] space-y-1"
                                        >
                                          <div className="font-semibold">
                                            {item.menu_item_id}
                                            {item.variant_id && (
                                              <span className="text-muted-foreground font-normal ml-1">
                                                — {item.variant_id}
                                              </span>
                                            )}
                                          </div>

                                          <div className="text-muted-foreground">
                                            Qty: <strong>{item.qty}</strong>
                                          </div>

                                          {item.remarks && (
                                            <div className="text-orange-600 italic">
                                              "{item.remarks}"
                                            </div>
                                          )}

                                          {item.addons.length > 0 && (
                                            <div className="pl-2 space-y-0.5">
                                              {item.addons.map((addon: any) => (
                                                <div
                                                  key={addon.id}
                                                  className="text-muted-foreground"
                                                >
                                                  • {addon.addon_id} ×{" "}
                                                  {addon.quantity}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
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
              </ScrollArea>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
