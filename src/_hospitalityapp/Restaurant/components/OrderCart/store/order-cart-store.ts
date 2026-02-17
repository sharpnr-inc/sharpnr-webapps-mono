import { create } from "zustand";

interface OrderCartSate {
  Items: any[];
}

export const useOrderCart = create<OrderCartSate>((set) => ({
  Items: [],
}));
