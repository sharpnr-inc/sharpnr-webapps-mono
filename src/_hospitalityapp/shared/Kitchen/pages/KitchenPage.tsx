import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type OrderStatus = "in_progress" | "cooked"|"ordered";

interface KitchenOrder {
  id: string;
  table: string;
  items: string[];
  status: OrderStatus;
}

const initialOrders: KitchenOrder[] = [
  {
    id: "order-1",
    table: "T2",
    items: ["Paneer Butter Masala", "Butter Naan x2"],
    status: "in_progress",
  },
  {
    id: "order-2",
    table: "T5",
    items: ["Veg Biryani"],
    status: "in_progress",
  },
  {
    id: "order-3",
    table: "T1",
    items: ["Dal Fry", "Jeera Rice"],
    status: "cooked",
  },
  {
    id: "order-3",
    table: "T1",
    items: ["Dal Fry", "Jeera Rice"],
    status: "ordered",
  },
];

export default function KitchenPage() {
  const [orders, setOrders] = React.useState<KitchenOrder[]>(initialOrders);

  const onDragEnd = (result: any) => {
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

  const inProgress = orders.filter((o) => o.status === "in_progress");
  const cooked = orders.filter((o) => o.status === "cooked");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Kitchen Orders
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* In Progress */}
          <Droppable droppableId="in_progress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3"
              >
                <h2 className="text-sm font-medium text-muted-foreground">
                  In Progress
                </h2>

                {inProgress.map((order, index) => (
                  <Draggable
                    key={order.id}
                    draggableId={order.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-l-4 border-yellow-500"
                      >
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">
                            Table {order.table}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx}>• {item}</div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Cooked */}
          <Droppable droppableId="cooked">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3"
              >
                <h2 className="text-sm font-medium text-muted-foreground">
                  Cooked
                </h2>

                {cooked.map((order, index) => (
                  <Draggable
                    key={order.id}
                    draggableId={order.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-l-4 border-green-600 opacity-80"
                      >
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm">
                            Table {order.table}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx}>• {item}</div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
