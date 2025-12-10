import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  MenuTerminalState,
  MenuTerminalActions,
  MenuItemState,
  MenuItem,
  Variant,
  AddOn,
} from "./menuTerminal.types";

export const useMenuTerminalStore = create<
  MenuTerminalState & MenuTerminalActions
>((set) => ({
  selectedMenuGroupId: undefined,
  selectedSubCategoryId: undefined,

  setMenuGroup: (id) =>
    set({
      selectedMenuGroupId: id,
      selectedSubCategoryId: undefined, // reset sub-category
    }),

  setSubCategory: (id) => set({ selectedSubCategoryId: id }),

  resetMenuTerminal: () =>
    set({
      selectedMenuGroupId: undefined,
      selectedSubCategoryId: undefined,
    }),
}));

type MenuItemActions = {
  openItem: (item: MenuItem) => void;
  closeItem: () => void;

  selectVariant: (groupId: string, variant: Variant, isMulti: boolean) => void;

  addAddOn: (addOn: AddOn) => void;
  removeAddOn: (addOnId: string) => void;

  setNote: (note: string) => void;
  reset: () => void;
};

export const useMenuItemStore = create<MenuItemState & MenuItemActions>()(
  devtools(
    (set) => ({
      /* -----------------------------
          STATE
      ------------------------------ */
      item: undefined,
      selectedVariants: {},
      selectedAddOns: [],
      note: "",

      /* -----------------------------
          ACTIONS
      ------------------------------ */
      openItem: (item) =>
        set(
          {
            item,
            selectedVariants: {},
            selectedAddOns: [],
            note: "",
          },
          false,
          "menuItem/openItem"
        ),

      closeItem: () =>
        set(
          {
            item: undefined,
            selectedVariants: {},
            selectedAddOns: [],
            note: "",
          },
          false,
          "menuItem/closeItem"
        ),

      selectVariant: (groupId, variant, isMulti) =>
        set(
          (state) => {
            const current = state.selectedVariants[groupId] ?? [];

            return {
              selectedVariants: {
                ...state.selectedVariants,
                [groupId]: isMulti
                  ? current.some((v) => v.id === variant.id)
                    ? current.filter((v) => v.id !== variant.id)
                    : [...current, variant]
                  : [variant],
              },
            };
          },
          false,
          "menuItem/selectVariant"
        ),

      addAddOn: (addOn) =>
        set(
          (state) => {
            const existing = state.selectedAddOns.find(
              (a) => a.id === addOn.ID
            );

            return {
              selectedAddOns: existing
                ? state.selectedAddOns.map((a) =>
                    a.id === addOn.ID ? { ...a, qty: a.qty + 1 } : a
                  )
                : [
                    ...state.selectedAddOns,
                    {
                      id: addOn.ID,
                      name: addOn.Name,
                      price: addOn.Price,
                      qty: 1,
                    },
                  ],
            };
          },
          false,
          "menuItem/addAddOn"
        ),

      removeAddOn: (addOnId) =>
        set(
          (state) => ({
            selectedAddOns: state.selectedAddOns
              .map((a) => (a.id === addOnId ? { ...a, qty: a.qty - 1 } : a))
              .filter((a) => a.qty > 0),
          }),
          false,
          "menuItem/removeAddOn"
        ),

      setNote: (note) => set({ note }, false, "menuItem/setNote"),

      reset: () =>
        set(
          {
            item: undefined,
            selectedVariants: {},
            selectedAddOns: [],
            note: "",
          },
          false,
          "menuItem/reset"
        ),
    }),
    {
      name: "MenuItemStore",
      enabled: import.meta.env.DEV,
    }
  )
);
