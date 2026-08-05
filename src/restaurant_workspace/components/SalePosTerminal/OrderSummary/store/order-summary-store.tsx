import { create } from "zustand";

interface TakeawayOrderItem {
  item_id: string;
  name: string;

  base_price: number;

  variant?: {
    variant_group_id: string;
    variant_id: string;
    name: string;
    price: number;
  };

  add_ons: {
    add_on_id: string;
    name: string;
    price: number;
    qty: number;
  }[];

  notes?: string;

  quantity: number;

  total_price: number;
}

interface TakeawayOrderSummayStoreState {
  TakeawayOrder: TakeawayOrderItem[];

  AddItemsInTakeawayOrder: (item: TakeawayOrderItem) => void;
}

export const useTakewayOrderSummaryStore =
  create<TakeawayOrderSummayStoreState>((set) => ({
    TakeawayOrder: [],

    AddItemsInTakeawayOrder: (item) =>
      set((state) => ({
        TakeawayOrder: [...state.TakeawayOrder, item],
      })),
  }));
