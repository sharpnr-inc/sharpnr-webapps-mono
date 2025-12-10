import { create } from "zustand";



export interface MenuTerminalState {
  selectedCategory: string | null;
  selectedItem: any | null;

  setSelectedCategory: (id: string | null) => void;
  setSelectedItem: (item: any | null) => void;

  reset: () => void;
}


export const useMenuTerminalStore = create<MenuTerminalState>((set) => ({
  // STATE
  selectedCategory: null,
  selectedItem: null,

  // ACTIONS
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  setSelectedItem: (item) => set({ selectedItem: item }),

  reset: () =>
    set({
      selectedCategory: null,
      selectedItem: null,
    }),
}));