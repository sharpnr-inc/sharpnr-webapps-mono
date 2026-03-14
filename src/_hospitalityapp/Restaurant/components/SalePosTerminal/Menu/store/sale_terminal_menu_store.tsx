import type {
  MenuCategoryResponse,
  MenuItemResponse,
  MenuResponse,
  MenuSubCategoryResponse,
} from "@/_hospitalityapp/infra/apis/api.service";
import { create } from "zustand";

interface SalePosTerminalMenuStoreState {
  menus: MenuResponse[];
  categories: MenuCategoryResponse[];
  subCategories: MenuSubCategoryResponse[];
  items: MenuItemResponse[];

  setMenu: (menus: MenuResponse[]) => void;
  clearMenu: () => void;
}

export const useSalePosTerminalMenuStore =
  create<SalePosTerminalMenuStoreState>((set) => ({
    menus: [],
    categories: [],
    subCategories: [],
    items: [],

    setMenu: (menus) =>
      set(() => {
        const categories = menus.flatMap((m) => m.categories);

        const subCategories = categories.flatMap((c) => c.sub_categories);

        const items = subCategories.flatMap((s) => s.menu_items);

        return {
          menus,
          categories,
          subCategories,
          items,
        };
      }),

    clearMenu: () =>
      set({
        menus: [],
        categories: [],
        subCategories: [],
        items: [],
      }),
  }));
