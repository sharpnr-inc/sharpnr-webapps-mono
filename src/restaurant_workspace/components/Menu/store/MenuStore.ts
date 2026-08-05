import { create } from "zustand";
import type { Menu, MenuCategory, MenuItem } from "../types";

export const ALL_CATEGORY_ID = "ALL";

interface MenuState {
  menu: Menu | null;
  categories: MenuCategory[];
  allItems: MenuItem[];

  activeCategoryId: string;
  activeSubCategoryId: string | null;

  selectedItem: MenuItem | null;

  isVariantOpen: boolean;
  isAddonOpen: boolean;

  setMenuData: (menu: Menu) => void;
  setActiveCategory: (id: string) => void;
  setActiveSubCategory: (id: string) => void;

  openVariant: (item: any) => void;
  closeVariant: () => void;
  openAddon: () => void;
  closeAddon: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: null,
  categories: [],
  allItems: [],

  activeCategoryId: ALL_CATEGORY_ID,
  activeSubCategoryId: null,

  selectedItem: null,

  isVariantOpen: false,
  isAddonOpen: false,

  setMenuData: (menu) => {
    const allItems = menu.categories.flatMap((cat) =>
      cat.sub_categories.flatMap((sub) => sub.menu_items),
    );

    const allCategory: MenuCategory = {
      id: ALL_CATEGORY_ID,
      category_name: "All",
      sub_categories: [],
      menu_id: "",
      category_description: "",
    };

    set({
      menu,
      categories: [allCategory, ...menu.categories],
      allItems,
      activeCategoryId: ALL_CATEGORY_ID,
    });
  },

  setActiveCategory: (id) =>
    set({ activeCategoryId: id, activeSubCategoryId: null }),

  setActiveSubCategory: (id) => set({ activeSubCategoryId: id }),

  openVariant: (item: any) =>
    set({
      isVariantOpen: true,
      selectedItem: item,
    }),
  closeVariant: () => set({ isVariantOpen: false }),

  openAddon: () => set({ isAddonOpen: true }),
  closeAddon: () => set({ isAddonOpen: false }),
}));
