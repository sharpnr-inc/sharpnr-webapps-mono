import type {
  MenuCategoryResponse,
  MenuItemResponse,
  MenuResponse,
  MenuSubCategoryResponse,
} from "@/_hospitalityapp/infra/apis/api.service";
import { create } from "zustand";

interface SalePosTerminalMenuStoreState {
  // Raw data (all across all menus)
  menus: MenuResponse[];
  categories: MenuCategoryResponse[];
  subCategories: MenuSubCategoryResponse[];
  items: MenuItemResponse[];

  // Selection state
  selectedMenuId: string | "all";
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;

  // Derived filtered data (re-computed on selection change)
  filteredCategories: MenuCategoryResponse[];
  filteredSubCategories: MenuSubCategoryResponse[];
  filteredItems: MenuItemResponse[];

  // Actions
  setMenu: (menus: MenuResponse[]) => void;
  clearMenu: () => void;
  selectMenu: (menuId: string | "all") => void;
  selectCategory: (categoryId: string | null) => void;
  selectSubCategory: (subCategoryId: string | null) => void;
}

/**
 * Pure function to derive filtered categories, subcategories, and items
 * based on current selection state. Called on every selection change.
 */
function deriveFiltered(
  menus: MenuResponse[],
  allCategories: MenuCategoryResponse[],
  selectedMenuId: string | "all",
  selectedCategoryId: string | null,
  selectedSubCategoryId: string | null,
) {
  // Step 1: Filter categories by selected menu group
  const filteredCategories =
    selectedMenuId === "all"
      ? allCategories
      : (menus.find((m) => m.id === selectedMenuId)?.categories ?? []);

  // Step 2: Filter subcategories by selected category (or flatten all)
  const filteredSubCategories = selectedCategoryId
    ? (filteredCategories.find((c) => c.id === selectedCategoryId)
        ?.sub_categories ?? [])
    : filteredCategories.flatMap((c) => c.sub_categories);

  // Step 3: Filter items by selected subcategory (or flatten all)
  const filteredItems = selectedSubCategoryId
    ? (filteredSubCategories.find((s) => s.id === selectedSubCategoryId)
        ?.menu_items ?? [])
    : filteredSubCategories.flatMap((s) => s.menu_items);

  return { filteredCategories, filteredSubCategories, filteredItems };
}

export const useSalePosTerminalMenuStore =
  create<SalePosTerminalMenuStoreState>((set) => ({
    menus: [],
    categories: [],
    subCategories: [],
    items: [],

    selectedMenuId: "all",
    selectedCategoryId: null,
    selectedSubCategoryId: null,

    filteredCategories: [],
    filteredSubCategories: [],
    filteredItems: [],

    setMenu: (menus) =>
      set(() => {
        const categories = menus.flatMap((m) => m.categories);
        const subCategories = categories.flatMap((c) => c.sub_categories);
        const items = subCategories.flatMap((s) => s.menu_items);

        const derived = deriveFiltered(menus, categories, "all", null, null);

        return {
          menus,
          categories,
          subCategories,
          items,
          selectedMenuId: "all",
          selectedCategoryId: null,
          selectedSubCategoryId: null,
          ...derived,
        };
      }),

    clearMenu: () =>
      set({
        menus: [],
        categories: [],
        subCategories: [],
        items: [],
        selectedMenuId: "all",
        selectedCategoryId: null,
        selectedSubCategoryId: null,
        filteredCategories: [],
        filteredSubCategories: [],
        filteredItems: [],
      }),

    selectMenu: (menuId) =>
      set((state) => {
        // Switching menu resets category and subcategory
        const derived = deriveFiltered(
          state.menus,
          state.categories,
          menuId,
          null,
          null,
        );
        return {
          selectedMenuId: menuId,
          selectedCategoryId: null,
          selectedSubCategoryId: null,
          ...derived,
        };
      }),

    selectCategory: (categoryId) =>
      set((state) => {
        // Switching category resets subcategory
        const derived = deriveFiltered(
          state.menus,
          state.categories,
          state.selectedMenuId,
          categoryId,
          null,
        );
        return {
          selectedCategoryId: categoryId,
          selectedSubCategoryId: null,
          ...derived,
        };
      }),

    selectSubCategory: (subCategoryId) =>
      set((state) => {
        const derived = deriveFiltered(
          state.menus,
          state.categories,
          state.selectedMenuId,
          state.selectedCategoryId,
          subCategoryId,
        );
        return {
          selectedSubCategoryId: subCategoryId,
          ...derived,
        };
      }),
  }));