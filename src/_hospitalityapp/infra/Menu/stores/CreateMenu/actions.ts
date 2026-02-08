import { useCreateMenuStore } from "./create-menu_store";

export const createMenuAction = {
  setActiveCategory: (id: string | null) =>
    useCreateMenuStore.getState().setActiveCategory(id),

  setActiveSubCategory: (id: string | null) =>
    useCreateMenuStore.getState().setActiveSubCategory(id),

  resetSelection: () =>
    useCreateMenuStore.getState().resetSelection(),
};
