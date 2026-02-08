import { create } from "zustand";

interface CreateMenuState {
  activeCategoryID: string | null;
  activeSubCategoryID: string | null;

  setActiveCategory: (id: string | null) => void;
  setActiveSubCategory: (id: string | null) => void;
  resetSelection: () => void;
}

export const useCreateMenuStore = create<CreateMenuState>((set) => ({
  activeCategoryID: null,
  activeSubCategoryID: null,

  setActiveCategory: (id) =>
    set(() => ({
      activeCategoryID: id,
      activeSubCategoryID: null, // reset sub when category changes
    })),

  setActiveSubCategory: (id) =>
    set(() => ({
      activeSubCategoryID: id,
    })),

  resetSelection: () =>
    set(() => ({
      activeCategoryID: null,
      activeSubCategoryID: null,
    })),
}));
