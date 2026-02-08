import { create } from "zustand";

interface CreateMenuState {
  activeCategoryID: string | null;
  activeSubCategoryID: string | null;
  activeItemID: string | null;

  setActiveCategory: (id: string | null) => void;
  setActiveSubCategory: (id: string | null) => void;
  setActiveItem: (id: string | null) => void;
  resetSelection: () => void;
}

export const useCreateMenuStore = create<CreateMenuState>((set) => ({
  activeCategoryID: null,
  activeSubCategoryID: null,
  activeItemID: null,

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
}));
