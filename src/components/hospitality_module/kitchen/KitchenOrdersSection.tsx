"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Order {
  id: number;
  item: string;
  table: string;
  status: "orders" | "in_progress" | "ready" | "delivered";
}

export default function KitchenOrdersSection() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, item: "Paneer Butter Masala", table: "T1", status: "orders" },
    { id: 2, item: "Grilled Sandwich", table: "T2", status: "in_progress" },
    { id: 3, item: "Pasta Alfredo", table: "T3", status: "ready" },
    { id: 4, item: "Mango Shake", table: "T4", status: "delivered" },
  ]);

  const stages = [
    { key: "orders", title: "Orders" },
    { key: "in_progress", title: "In Progress" },
    { key: "ready", title: "Ready to Serve" },
    { key: "delivered", title: "Delivered" },
  ];

  // Handle drag and drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // dropped outside any droppable area
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the dragged order
    const draggedOrder = orders.find(
      (order) => order.id.toString() === draggableId
    );
    if (!draggedOrder) return;

    // Update status if moved to new column
    const updatedOrders = orders.map((order) =>
      order.id === draggedOrder.id
        ? { ...order, status: destination.droppableId as Order["status"] }
        : order
    );

    setOrders(updatedOrders);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stages.map((stage) => (
          <Droppable droppableId={stage.key} key={stage.key}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 min-w-[250px] rounded-2xl p-3 border transition ${
                  snapshot.isDraggingOver ? "bg-blue-50" : ""
                }`}
              >
                <Card className="shadow-sm h-full ">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg font-semibold">
                      {stage.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 mt-2 min-h-[200px]">
                    {orders
                      .filter((o) => o.status === stage.key)
                      .map((o, index) => (
                        <Draggable
                          key={o.id.toString()}
                          draggableId={o.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 border rounded-xl shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging ? "" : ""
                              }`}
                            >
                              <div className="font-medium">{o.item}</div>
                              <div className="text-sm text-muted-foreground">
                                Table: {o.table}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}

                    {orders.filter((o) => o.status === stage.key).length ===
                      0 && (
                      <p className="text-sm text-center mt-4 text-gray-400">
                        No items
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
