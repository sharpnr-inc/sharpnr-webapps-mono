export interface Orders {
  name: string;
  size: string;
  varient: string;
  add_ons: string;
  note: string;
}

export interface OrdersFromRequest {
  id: string;
  room: string;
  order: Orders[];
  order_status: string;
}

export const dummyOrders: OrdersFromRequest[] = [
  {
    id: "ORD-101",
    room: "Room 101",
    order_status: "Preparing",
    order: [
      {
        name: "Margherita Pizza",
        size: "Medium",
        varient: "Cheese Burst",
        add_ons: "Extra Cheese",
        note: "Cut into 6 slices",
      },
      {
        name: "Cold Coffee",
        size: "Regular",
        varient: "Classic",
        add_ons: "Whipped Cream",
        note: "Less sugar",
      },
    ],
  },
  {
    id: "ORD-102",
    room: "Room 204",
    order_status: "Delivered",
    order: [
      {
        name: "Pasta Alfredo",
        size: "Large",
        varient: "Creamy",
        add_ons: "Mushrooms",
        note: "Add garlic bread",
      },
    ],
  },
  {
    id: "ORD-103",
    room: "Room 302",
    order_status: "Pending",
    order: [
      {
        name: "Chicken Burger",
        size: "Regular",
        varient: "Spicy",
        add_ons: "Cheese Slice",
        note: "No onions",
      },
      {
        name: "Pepsi",
        size: "500ml",
        varient: "Chilled",
        add_ons: "Ice",
        note: "Serve cold",
      },
    ],
  },
  {
    id: "ORD-104",
    room: "Room 405",
    order_status: "Cancelled",
    order: [
      {
        name: "Paneer Tikka",
        size: "Full",
        varient: "Spicy",
        add_ons: "Mint Sauce",
        note: "Customer cancelled",
      },
    ],
  },
  {
    id: "ORD-105",
    room: "Room 506",
    order_status: "Served",
    order: [
      {
        name: "Veg Sandwich",
        size: "Regular",
        varient: "Grilled",
        add_ons: "Cheese",
        note: "Cut in half",
      },
      {
        name: "Lemon Iced Tea",
        size: "Medium",
        varient: "Classic",
        add_ons: "Mint Leaves",
        note: "Serve chilled",
      },
    ],
  },
];
