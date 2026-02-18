import { create } from "zustand";

interface OrderPayload {
  table_id: string;
  order_timestamp: string;
  notes?: string; // General order notes
  items: OrderItem[];
}

interface OrderItem {
  menu_item_id: string;
  item_name: string;
  quantity: number;

  // Array because an item can have multiple variant groups (Size, Sauce, etc.)
  selected_variants: SelectedVariant[];

  // Array for multi-select add-ons
  selected_add_ons: SelectedAddOn[];

  // Future-proofing for Bar/Kitchen routing
  module_type: "KITCHEN" | "BAR";
  special_instructions?: string;
}

interface SelectedVariant {
  variant_group_id: string;
  variant_id: string;
  variant_name: string;
  price_at_order: number; // Important for price history
}

interface SelectedAddOn {
  id: string;
  name: string;
  qty: number;
  price_at_order: number;
}

interface OrderCartState {
  table_id: string;
  items: OrderItem[];

  // Actions
  setTableId: (id: string) => void;
  addItem: (item: OrderItem) => void;
  removeItem: (menu_item_id: string, variant_ids: string[]) => void;
  updateQuantity: (
    menu_item_id: string,
    variant_ids: string[],
    delta: number,
  ) => void;
  clearCart: () => void;
}



export const useOrderCart = create<OrderCartState>((set) => ({
  table_id: "",
  items: [],

  setTableId: (id) => set({ table_id: id }),

  addItem: (newItem) =>
    set((state) => {
      // Check if an item with the exact same variants already exists
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.menu_item_id === newItem.menu_item_id &&
          JSON.stringify(item.selected_variants) ===
            JSON.stringify(newItem.selected_variants) &&
          JSON.stringify(item.selected_add_ons) ===
            JSON.stringify(newItem.selected_add_ons),
      );

      if (existingItemIndex !== -1) {
        // If it exists, just increase the quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return { items: updatedItems };
      }

      // If it's a new configuration, add as a new row
      return { items: [...state.items, newItem] };
    }),

  updateQuantity: (menu_item_id, variant_ids, delta) =>
    set((state) => ({
      items: state.items
        .map((item) => {
          const itemVariantIds = item.selected_variants.map(
            (v) => v.variant_id,
          );
          const isMatch =
            item.menu_item_id === menu_item_id &&
            JSON.stringify(itemVariantIds.sort()) ===
              JSON.stringify(variant_ids.sort());

          if (isMatch) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0), // Remove item if qty hits 0
    })),

  removeItem: (menu_item_id, variant_ids) =>
    set((state) => ({
      items: state.items.filter((item) => {
        const itemVariantIds = item.selected_variants.map((v) => v.variant_id);
        return !(
          item.menu_item_id === menu_item_id &&
          JSON.stringify(itemVariantIds.sort()) ===
            JSON.stringify(variant_ids.sort())
        );
      }),
    })),

  clearCart: () => set({ items: [] }),
}));
