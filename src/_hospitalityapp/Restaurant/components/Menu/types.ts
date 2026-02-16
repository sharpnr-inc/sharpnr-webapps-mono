export interface Menu {
  id: string;
  menu_name: string;
  menu_description: string;
  categories: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  menu_id: string;
  category_name: string;
  category_description: string;
  sub_categories: MenuSubCategory[];
}

export interface MenuSubCategory {
  id: string;
  menu_category_id: string;
  sub_cat_name: string;
  sub_cat_description: string;
  menu_items: MenuItem[];
}

export type DietaryType =
  | "VEGETARIAN"
  | "NON_VEGETARIAN"
  | "VEGAN"
  | "EGGETARIAN";

export interface MenuItem {
  id: string;
  menu_id: string;
  menu_sub_category_id: string;

  name: string;
  description: string;
  unit: string;

  base_price: number;
  dietary_type: DietaryType;

  variant_groups: VariantGroup[];
  add_ons: AddOn[];

  served_by: string;
}

export interface VariantGroup {
  id: string;
  menu_item_id: string;
  variant_group_name: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  variant_group_id: string;

  name: string;
  price_modifier: number; // +20, +50 etc
  is_default?: boolean;
}

export interface AddOn {
  id: string;
  menu_item_id: string;

  name: string;
  price: number;
}
