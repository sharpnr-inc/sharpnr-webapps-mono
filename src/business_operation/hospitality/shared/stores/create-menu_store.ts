import { create } from "zustand";
import type { MenuResponse } from "../../infra/apis/api.service";

interface CreateMenuState {
  activeCategoryID: string | null;
  activeSubCategoryID: string | null;
  activeItemID: string | null;
  activeMenu: MenuResponse | null;

  setActiveCategory: (id: string | null) => void;
  setActiveSubCategory: (id: string | null) => void;
  setActiveItem: (id: string | null) => void;
  resetSelection: () => void;
  setMenu: (menu: MenuResponse) => void;
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

  setMenu: (menu: MenuResponse) =>
    set(() => ({
      activeMenu: menu,
    })),
}));
