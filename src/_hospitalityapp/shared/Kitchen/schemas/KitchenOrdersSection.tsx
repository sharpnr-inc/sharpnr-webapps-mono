import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useKitchenOrders } from "@/_hospitalityapp/shared/Kitchen/api/queries/Kitchen";

interface Order {
  id: number;
  item: string;
  table: string;
  status: "orders" | "in_progress" | "ready" | "delivered";
  server: string; // waiter/server name
  timePlaced: string; // ISO string or formatted time
}

// 1 So we need the Fetch the Kitchen

export default function KitchenOrdersSection() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      item: "Paneer Butter Masala",
      table: "T1",
      status: "orders",
      server: "John",
      timePlaced: "12:15 PM",
    },
    {
      id: 2,
      item: "Grilled Sandwich",
      table: "T2",
      status: "in_progress",
      server: "Alice",
      timePlaced: "12:20 PM",
    },
    {
      id: 3,
      item: "Pasta Alfredo",
      table: "T3",
      status: "ready",
      server: "Bob",
      timePlaced: "12:25 PM",
    },
    {
      id: 4,
      item: "Mango Shake",
      table: "T4",
      status: "delivered",
      server: "Eve",
      timePlaced: "12:30 PM",
    },

    {
      id: 5,
      item: "Chicken Biryani",
      table: "T5",
      status: "orders",
      server: "Sam",
      timePlaced: "12:35 PM",
    },
    {
      id: 6,
      item: "Veg Burger",
      table: "T6",
      status: "in_progress",
      server: "Lily",
      timePlaced: "12:40 PM",
    },
    {
      id: 7,
      item: "Tomato Soup",
      table: "T7",
      status: "ready",
      server: "Mark",
      timePlaced: "12:45 PM",
    },
    {
      id: 8,
      item: "Cold Coffee",
      table: "T8",
      status: "delivered",
      server: "Nina",
      timePlaced: "12:50 PM",
    },
    {
      id: 9,
      item: "Fried Rice",
      table: "T9",
      status: "orders",
      server: "Oscar",
      timePlaced: "12:55 PM",
    },
    {
      id: 10,
      item: "Veg Sandwich",
      table: "T10",
      status: "in_progress",
      server: "Peter",
      timePlaced: "1:00 PM",
    },
    {
      id: 11,
      item: "Paneer Tikka",
      table: "T11",
      status: "ready",
      server: "Quinn",
      timePlaced: "1:05 PM",
    },
    {
      id: 12,
      item: "Lassi",
      table: "T12",
      status: "delivered",
      server: "Rachel",
      timePlaced: "1:10 PM",
    },
    {
      id: 13,
      item: "Masala Dosa",
      table: "T13",
      status: "orders",
      server: "Steve",
      timePlaced: "1:15 PM",
    },
    {
      id: 14,
      item: "Cheese Pizza",
      table: "T14",
      status: "in_progress",
      server: "Tina",
      timePlaced: "1:20 PM",
    },
    {
      id: 15,
      item: "Veg Pulao",
      table: "T15",
      status: "ready",
      server: "Uma",
      timePlaced: "1:25 PM",
    },
    {
      id: 16,
      item: "Orange Juice",
      table: "T16",
      status: "delivered",
      server: "Vikram",
      timePlaced: "1:30 PM",
    },
    {
      id: 17,
      item: "Chicken Nuggets",
      table: "T17",
      status: "orders",
      server: "Will",
      timePlaced: "1:35 PM",
    },
  ]);

  const { data } = useKitchenOrders();

  console.log(data);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id.toString() === draggableId
          ? { ...o, status: destination.droppableId as Order["status"] }
          : o
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        {/* -------------------- ORDERS -------------------- */}
        <Droppable droppableId="orders">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 min-w-[250px] h-fit rounded-xl p-1 transition ${
                snapshot.isDraggingOver ? "bg-blue-50" : ""
              }`}
            >
              <Card className="shadow-sm h-full flex flex-col min-h-[400px]">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg font-semibold text-center">
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-1 overflow-y-auto max-h-[60rem]">
                  {orders
                    .filter((o) => o.status === "orders")
                    .map((o, index) => (
                      <Draggable
                        key={o.id.toString()}
                        draggableId={o.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 border rounded-xl shadow-sm  cursor-grab active:cursor-grabbing hover:shadow-md transition"
                          >
                            <div className="font-medium text-lg">{o.item}</div>
                            <div className="text-sm text-gray-500">
                              Table: {o.table}
                            </div>
                            <div className="text-sm text-gray-500">
                              Server: {o.server}
                            </div>
                            <div className="text-sm text-gray-500">
                              Time: {o.timePlaced}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {orders.filter((o) => o.status === "orders").length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                      No items
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </Droppable>

        {/* -------------------- IN PROGRESS -------------------- */}
        <Droppable droppableId="in_progress">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 min-w-[250px] h-fit rounded-2xl p-1 border transition ${
                snapshot.isDraggingOver ? "bg-blue-500" : ""
              }`}
            >
              <Card className="shadow-sm h-full flex flex-col min-h-[400px]">
                <CardHeader className="border-b  rounded-xl">
                  <CardTitle className="text-lg font-semibold text-blue-500 text-center">
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 mt-2 space-y-2 overflow-y-auto">
                  {orders
                    .filter((o) => o.status === "in_progress")
                    .map((o, index) => (
                      <Draggable
                        key={o.id.toString()}
                        draggableId={o.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 border rounded-xl shadow-sm bg-white cursor-grab active:cursor-grabbing hover:shadow-md transition"
                          >
                            <div className="font-medium">{o.item}</div>
                            <div className="text-sm text-gray-500">
                              Table: {o.table}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {orders.filter((o) => o.status === "in_progress").length ===
                    0 && (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                      No items
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </Droppable>

        {/* -------------------- READY TO SERVE -------------------- */}
        <Droppable droppableId="ready">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 min-w-[250px] h-fit rounded-2xl p-1 border transition ${
                snapshot.isDraggingOver ? "bg-teal-500" : ""
              }`}
            >
              <Card className="shadow-sm h-full flex flex-col min-h-[400px]">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg font-semibold text-center">
                    Ready to Serve
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 mt-2 space-y-2 overflow-y-auto">
                  {orders
                    .filter((o) => o.status === "ready")
                    .map((o, index) => (
                      <Draggable
                        key={o.id.toString()}
                        draggableId={o.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 border rounded-xl shadow-sm bg-white cursor-grab active:cursor-grabbing hover:shadow-md transition"
                          >
                            <div className="font-medium">{o.item}</div>
                            <div className="text-sm text-gray-500">
                              Table: {o.table}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {orders.filter((o) => o.status === "ready").length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                      No items
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
