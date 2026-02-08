import { create } from "zustand";

interface MenuState {
  menuGroups: any[];
  activeMenuGroupID: string | null;
  activeCategoryID: string | null;
  activeSubCategoryID: string | null;
  searchQuery: string;
  activeItemForSlider: any | null; // The item currently being customized
  

  isItemSheetOpen: boolean;
  isCartSheetOpen: boolean;
}

// We only export the hook for components to consume state
export const useMenuStore = create<MenuState>(() => ({
  menuGroups: [],
  activeMenuGroupID: null,
  activeCategoryID: null,
  activeSubCategoryID: null,
  searchQuery: "",
  activeItemForSlider: null,
 

  isItemSheetOpen: false,
  isCartSheetOpen: false,
}));
