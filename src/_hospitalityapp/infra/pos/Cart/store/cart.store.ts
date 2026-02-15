import { create } from "zustand";

interface PosCartInitialStateType {
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: any) => void;
  clearCart: () => void;
}

export const usePOSCartStore = create<PosCartInitialStateType>((set) => ({
  cart: [],

  addToCart: (item: any) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: (i.quantity ?? 1) + 1 }
              : i
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),

  removeFromCart: (id: any) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));
