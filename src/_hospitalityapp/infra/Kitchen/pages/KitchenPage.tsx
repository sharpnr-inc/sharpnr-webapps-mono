import { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import KDSHeader from "../components/KDSHeader";
import { Timer, AlertTriangle, ChefHat } from "lucide-react";

type OrderStatus = "ordered" | "in_progress" | "cooked";

interface KitchenOrder {
  id: string;
  table: string;
  items: string[];
  status: OrderStatus;
  waitMinutes: number; // Changed to number for logic
}

const initialOrders: KitchenOrder[] = [
  { id: "order-1", table: "T2", items: ["Paneer Butter Masala", "Butter Naan x2"], status: "in_progress", waitMinutes: 14 },
  { id: "order-2", table: "T5", items: ["Veg Biryani"], status: "in_progress", waitMinutes: 5 },
  { id: "order-3", table: "T1", items: ["Dal Fry", "Jeera Rice"], status: "cooked", waitMinutes: 20 },
  { id: "order-4", table: "T3", items: ["Chicken Tikka", "Roti x4"], status: "ordered", waitMinutes: 2 },
];

const COLUMNS: { id: OrderStatus; label: string; accent: string }[] = [
  { id: "ordered", label: "New Orders", accent: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", accent: "bg-yellow-500" },
  { id: "cooked", label: "Ready", accent: "bg-green-600" },
];

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>(initialOrders);

  // --- 1. Aggregated Totals Logic ---
  const totals = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.filter(o => o.status !== "cooked").forEach(order => {
      order.items.forEach(item => {
        // Simple logic to handle "Item x2" string parsing if needed
        const match = item.match(/(.+) x(\d+)/);
        const name = match ? match[1] : item;
        const qty = match ? parseInt(match[2]) : 1;
        counts[name] = (counts[name] || 0) + qty;
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
          : order
      )
    );
  };

  return (
    <div className="h-full flex flex-col gap-4 p-6 bg-background">
      <KDSHeader />

      {/* --- 2. Production Totals Bar --- */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-lg border shrink-0">
          <ChefHat size={14} className="text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Needs:</span>
        </div>
        {totals.map(([name, qty]) => (
          <div key={name} className="flex items-center gap-2 px-3 py-1 bg-background border rounded-lg shadow-sm shrink-0">
            <span className="text-[11px] font-medium">{name}</span>
            <Badge variant="secondary" className="h-5 min-w-[20px] justify-center px-1 font-mono text-[10px] bg-zinc-800 text-white">
              {qty}
            </Badge>
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {COLUMNS.map((col) => (
            <div key={col.id} className="flex flex-col rounded-xl border bg-muted/20 p-3 overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2.5 w-2.5 rounded-full shadow-inner", col.accent)} />
                  <h2 className="text-xs font-black uppercase tracking-widest text-foreground/70">
                    {col.label}
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-bold bg-muted p-1 rounded border">
                  {orders.filter((o) => o.status === col.id).length}
                </span>
              </div>

              <Droppable droppableId={col.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {orders
                      .filter((o) => o.status === col.id)
                      .map((order, index) => {
                        // --- 3. SOS logic ---
                        const isLate = order.waitMinutes >= 12 && order.status !== "cooked";
                        const isWarning = order.waitMinutes >= 8 && order.waitMinutes < 12 && order.status !== "cooked";

                        return (
                          <Draggable key={order.id} draggableId={order.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  "border-l-4 shadow-sm relative transition-all",
                                  snapshot.isDragging ? "rotate-1 scale-105 z-50 shadow-2xl" : "",
                                  isLate ? "border-l-red-600 bg-red-50/30 dark:bg-red-950/20" : 
                                  isWarning ? "border-l-orange-500" : "border-l-zinc-300"
                                )}
                              >
                                <CardContent className="p-3">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                      <span className="text-xs font-black">TABLE {order.table}</span>
                                      <span className="text-[9px] text-muted-foreground font-mono">#{order.id.split('-')[1]}</span>
                                    </div>
                                    <div className={cn(
                                      "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                                      isLate ? "bg-red-600 text-white animate-pulse" : "bg-muted"
                                    )}>
                                      <Timer size={10} />
                                      {order.waitMinutes}m
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="text-[11px] font-medium flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                                        {item}
                                      </div>
                                    ))}
                                  </div>

                                  {isLate && (
                                    <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-900 flex items-center gap-1.5 text-red-600">
                                      <AlertTriangle size={10} />
                                      <span className="text-[9px] font-bold uppercase tracking-tighter">Overdue Service</span>
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