import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRestaurantKOTStore = create<any>()(
  devtools(
    (set) => ({
      // -----------------------------
      // STATE
      // -----------------------------
      kotItemsBasket: [],

      // -----------------------------
      // ACTIONS
      // -----------------------------
      addItemInKot: (item: any) =>
        set((state: any) => ({
          kotItemsBasket: [...state.kotItemsBasket, item],
        })),

      removeItemFromKot: (id: string) =>
        set((state: any) => ({
          kotItemsBasket: state.kotItemsBasket.filter(
            (item: any) => item.id !== id
          ),
        })),

      clearKot: () => set({ kotItemsBasket: [] }),
    }),
    { name: "Restaurant-KOT-Store" }
  )
);
