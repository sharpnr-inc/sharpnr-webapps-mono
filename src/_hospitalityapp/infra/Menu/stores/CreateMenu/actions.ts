import { useCreateMenuStore } from "./create-menu_store";

export const createMenuAction = {
  setActiveCategory: (id: string | null) =>
    useCreateMenuStore.getState().setActiveCategory(id),

  setActiveSubCategory: (id: string | null) =>
    useCreateMenuStore.getState().setActiveSubCategory(id),

  setActiveItem: (id: string | null) =>
    useCreateMenuStore.getState().setActiveItem(id),

  resetSelection: () => useCreateMenuStore.getState().resetSelection(),

  setModulesMenu: (menu: any) => useCreateMenuStore.getState().setMenus(menu),
};
