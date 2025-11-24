
export interface Hospitality_Menu_AddItemInMenu_Request {
  category_id: string;
  sub_category_id: string;
  name: string;
  description: string;
  is_veg: boolean;
  base_price: number;
  served_by: string; // optional if needed
}
