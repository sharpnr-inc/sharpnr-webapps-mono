import { create } from "zustand";
import type { MenuOutput } from "../../createMenu/types";

interface CreateMenuState {
  activeCategoryID: string | null;
  activeSubCategoryID: string | null;
  activeItemID: string | null;
  activeMenu: MenuOutput | null;

  setActiveCategory: (id: string | null) => void;
  setActiveSubCategory: (id: string | null) => void;
  setActiveItem: (id: string | null) => void;
  resetSelection: () => void;
  setMenu: (menu: MenuOutput) => void;
}

export const useCreateMenuStore = create<CreateMenuState>((set) => ({
  activeCategoryID: null,
  activeSubCategoryID: null,
  activeItemID: null,
  activeMenu: null,

  setActiveCategory: (id) =>
    set(() => ({
      activeCategoryID: id,
      activeSubCategoryID: null, // reset sub when category changes
    })),

  setActiveSubCategory: (id) =>
    set(() => ({
      activeSubCategoryID: id,
    })),

  setActiveItem: (id) =>
    set(() => ({
      activeItemID: id,
    })),

  resetSelection: () =>
    set(() => ({
      activeCategoryID: null,
      activeSubCategoryID: null,
    })),

  setMenu: (menu: MenuOutput) =>
    set(() => ({
      activeMenu: menu,
    })),
}));
