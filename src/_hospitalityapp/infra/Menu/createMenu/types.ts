export interface MenuOutput {
  id: string;
  menu_name: string;
  menu_description: string | null;
  categories: CategoryOutput[];
}

export interface CategoryOutput {
  id: string;
  menu_id: string;
  category_name: string;
  category_description: string;
  sub_categories: SubCategoryOutput[];
}

export interface SubCategoryOutput {
  id: string;
  menu_category_id: string;
  sub_cat_name: string;
  sub_cat_description: string;
  menu_items: MenuItemOutput[];
}

export interface MenuItemOutput {
  id: string;
  menu_id: string;
  menu_sub_category_id: string;
  name: string;
  description: string;
  unit: string;
  base_price: number;
  dietary_type:string;
  variant_groups: VariantGroupOutput[];
  add_ons: AddOnOutput[];
}

export interface VariantGroupOutput {
  id: string;
  menu_item_id: string;
  variant_group_name: string;
  variants: VariantOutput[];
}

export interface VariantOutput {
  id: string;
  variant_group_id: string;
  menu_item_id: string;
  name: string;
  price: number;
}

export interface AddOnOutput {
  id: string;
  menu_item_id: string;
  name: string;
  price: number;
}