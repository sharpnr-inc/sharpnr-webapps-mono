export type MenuTerminalState = {
  selectedMenuGroupId?: string;
  selectedSubCategoryId?: string;
};

export type MenuTerminalActions = {
  setMenuGroup: (id: string) => void;
  setSubCategory: (id: string) => void;
  resetMenuTerminal: () => void;
};


// store/menuItem/menuItem.types.ts

export type Variant = {
  id: string;
  name: string;
  price: number;
};

export type VariantGroup = {
  id: string;
  name: string;
  is_multi_select: boolean;
  variants: Variant[];
};

export type AddOn = {
  ID: string;
  Name: string;
  Price: number;
};

export type SelectedAddOn = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  variant_groups: VariantGroup[] | null;
  add_ons: AddOn[] | null;
};

export type MenuItemState = {
  item?: MenuItem;

  selectedVariants: Record<string, Variant[]>; 
  selectedAddOns: SelectedAddOn[];
  note: string;
};
