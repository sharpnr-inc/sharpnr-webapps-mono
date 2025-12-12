/*************************************************************
 *                    MENU SYSTEM DTOs (JSDoc)
 *   These interfaces represent the Menu structure used in
 *   Hospitality apps: Groups → Categories → SubCategories →
 *   Items → Variants → AddOns.
 *
 *   JSDoc is added for:
 *   ✔ Better IntelliSense
 *   ✔ Stronger autocomplete
 *   ✔ Development clarity
 *************************************************************/

/**
 * Response wrapper for "Get All Menu Groups".
 * 
 * @example
 * {
 *   data: [
 *     { Id: "...", Name: "Bar Menu", Type: "BAR", Description: "..." }
 *   ]
 * }
 */
export interface Hospitality_ORG_GetAllMenuGroup_RESPONSE {
  /** List of available menu groups */
  data: Hospitality_Org_MenuGroup[];
}

/**
 * A top-level menu group.  
 * 
 * Examples:
 * - Bar Menu
 * - Room Service Menu
 * - Restaurant Menu
 */
export interface Hospitality_Org_MenuGroup {
  /** Unique ID for the menu group */
  Id: string;

  /** Display name of the menu group */
  Name: string;

  /** Type (BAR, HOTEL, RESTAURANT) */
  Type: string;

  /** Short description of the group */
  Description: string;
}

// -------------------------------------------------------------------//

/**
 * Response wrapper for "Get All Menu Categories".
 */
export interface Menu_GetAllMenuCategories_Response {
  /** List of all categories under the selected menu group */
  data: Menu_Categories_dto[];
}

/**
 * A Category inside a Menu Group.
 * 
 * Example:
 * - Starters
 * - Beverages
 * - Desserts
 */
export interface Menu_Categories_dto {
  /** Unique identifier */
  id: string;

  /** Name of the category */
  name: string;

  /** Description of the category */
  description: string;

  /** Subcategories belonging to this category */
  sub_categories: Menu_SubCategories_dto[];
}

/**
 * A Subcategory under a Category.
 * 
 * Example:
 * Category: "Beverages"
 *   → Subcategory: "Cold Drinks"
 */
export interface Menu_SubCategories_dto {
  /** Unique identifier */
  id: string;

  /** Name of the subcategory */
  name: string;

  /** Description */
  description: string;

  /**
   * List of menu items under this subcategory.
   * `null` means the backend has no items for this subcategory.
   */
  menu_items: Menu_MenuItem_dto[] | null;
}

// -------------------------------------------------------------------//

/**
 * A Menu Item that customers can order.
 * 
 * Example:
 * - Margherita Pizza
 * - Cold Coffee
 *
 * A Menu Item may include:
 * - Variant Groups (Size, Crust)
 * - Add-ons (Extra cheese, Olives)
 */
export interface Menu_MenuItem_dto {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Description of the menu item */
  description: string;

  /** Base price before variants/add-ons */
  price: number;

  /**
   * Variant groups (Size, Toppings categories)
   * `null` means there are no variants for this item.
   */
  variant_groups: Menu_VariantGroup_dto[] | null;

  /**
   * Optional add-ons for the item (extra toppings, ingredients)
   * `null` means no add-ons.
   */
  add_ons: Menu_AddOn_dto[] | null;
}

// -------------------------------------------------------------------//

/**
 * A group of selectable variants.
 *
 * Example:
 * Variant Group = "Size"
 * Variants = ["Small", "Medium", "Large"]
 *
 * @property is_multi_select
 * - `false` → user must pick ONE (e.g. Size)
 * - `true` → user may pick MANY (e.g. Toppings)
 */
export interface Menu_VariantGroup_dto {
  /** Unique ID for the variant group */
  id: string;

  /** Name (e.g., Size, Crust, Toppings) */
  name: string;

  /** Whether user can select multiple variants */
  is_multi_select: boolean;

  /** List of variant options */
  variants: Menu_Variant_dto[] | null;
}

/**
 * A single variant option inside a variant group.
 *
 * Example:
 * {
 *   id: "123",
 *   name: "Large",
 *   price: 50  // Extra charge
 * }
 */
export interface Menu_Variant_dto {
  /** Variant ID */
  id: string;

  /** Variant label shown to users */
  name: string;

  /** Price adjustment for selecting this variant */
  price: number;
}

// -------------------------------------------------------------------//

/**
 * Add-On for a Menu Item.
 *
 * Example:
 * {
 *   ID: "abc",
 *   Name: "Extra Cheese",
 *   Price: 30
 * }
 *
 * Add-ons are optional customizations.
 */
export interface Menu_AddOn_dto {
  /** Unique ID for add-on */
  ID: string;

  /** Add-on name (Extra Cheese, Olives, etc.) */
  Name: string;

  /** Price added when selected */
  Price: number;
}
