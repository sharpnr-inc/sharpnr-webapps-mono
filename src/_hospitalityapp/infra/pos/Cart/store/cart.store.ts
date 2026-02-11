import { create } from "zustand";

interface PosCartInitialStateType {
  cart: any;
  setCartItem: (item: any) => void;
}

export const usePOSCartStore = create<PosCartInitialStateType>((set) => ({
  cart: null,

  setCartItem: (item) =>
    set(() => ({
      cart: item,
    })),
}));
