import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useMenuGroupStore = create<any>()(
  devtools((set) => ({
    menuGroups: [],
    selectedGroupId: null,

    setMenuGroups: (groups: any) =>
      set({ menuGroups: groups }, false, "MenuGroupStore/setMenuGroups"),

    setSelectedGroupId: (id: string) =>
      set({ selectedGroupId: id }, false, "MenuGroupStore/setSelectedGroupId"),
  }))
);

export const selectMenuGroups = (s: any) => s.menuGroups;
export const selectSelectedGroupId = (s: any) => s.selectedGroupId;
export const selectSetMenuGroups = (s: any) => s.setMenuGroups;
export const selectSetSelectedGroupId = (s: any) => s.setSelectedGroupId;

//----------------------------------------------------------------------------------------------//

/**********************************
 * Store for MenuGroup Categories *
 **********************************/

export const useMenuCategoriesStore = create<any>()(
  devtools((set) => ({
    menuCategories: [],
    selectedMenuCategoryId: null,

    setMenuCategory: (category: any) =>
      set({ menuCategories: category }, false, "MenuCategoryStore/setCategory"),
  }))
);

export const selectMenuCategories = (mc: any) => mc.menuCategories;
export const selectSetMenuCategories = (mc: any) => mc.setMenuCategory;

//----------------------------------------------------------------------------------------------//

export const useMenuSubCategoryStore = create<any>()(
  devtools((set) => ({
    menuSubCategories: [],
    selectedMenuSubCategory: null,

    setMenuSubCategory: (subCategory: any) =>
      set(
        { menuSubCategories: subCategory },
        false,
        "MenuSubCategoryStore/setMenuSubCategory"
      ),
  }))
);

export const selectMenuSubCategories = (sc: any) => sc.menuSubCategories;

export const selectSetMenuSubCategory = (sc: any) => sc.setMenuSubCategory;

//----------------------------------------------------------------------------------------------//

export const useMenuTerminalSheetStore = create<any>()(
  devtools((set) => ({
    // -----------------------
    // STATE
    // -----------------------
    isMenuSheetOpen: false,

    // -----------------------
    // ACTIONS
    // -----------------------
    setMenuTerminalSheet: (open: boolean) => set({ isMenuSheetOpen: open }),

    toggleMenuTerminalSheet: () =>
      set((state: any) => ({
        isMenuSheetOpen: !state.isMenuSheetOpen,
      })),
  }))
);

// -----------------------
// STATE SELECTORS
// -----------------------
export const selectIsMenuTerminalSheetOpen = (state: any) =>
  state.isMenuSheetOpen;

// -----------------------
// ACTION SELECTORS
// -----------------------
export const selectSetMenuTerminalSheet = (state: any) =>
  state.setMenuTerminalSheet;

export const selectToggleMenuTerminalSheet = (state: any) =>
  state.toggleMenuTerminalSheet;

//----------------------------------------------------------------------------------------------//

export const useMenuItemStore = create<any>()(
  devtools(
    (set) => ({
      menuItem: null,

      setMenuItem: (item: any) =>
        set(
          { menuItem: item },
          false,
          "menuItem/set",
        ),

      clearMenuItem: () =>
        set(
          { menuItem: null },
          false,
          "menuItem/clear",
        ),
    }),
    {
      name: "MenuItemStore",
    },
  ),
);

// ✅ selectors
export const selectMenuItem = (s: any) => s.menuItem;
export const selectSetMenuItem = (s: any) => s.setMenuItem;
export const selectClearMenuItem = (s: any) => s.clearMenuItem;
