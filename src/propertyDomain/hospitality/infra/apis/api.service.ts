import api from "@/middlewares/axios";
import { MenuModuleEndpoints } from "./api.endpoints";
import type { APIResponse } from "@/lib/api_response";

/* ---------------------------------- <***> --------------------------------- */

export interface MenuResponse {
  id: string;
  menu_name: string;
  menu_description: string;
  preferred_kitchen: string | null;
  categories: MenuCategoryResponse[];
}

export interface MenuCategoryResponse {
  id: string;
  menu_id: string;
  category_name: string;
  category_description: string;
  preferred_kitchen: string | null;
  sub_categories: MenuSubCategoryResponse[];
}

export interface MenuSubCategoryResponse {
  id: string;
  menu_category_id: string;
  sub_cat_name: string;
  sub_cat_description: string;
  preferred_kitchen: string | null;
  menu_items: MenuItemResponse[];
}

export interface MenuItemResponse {
  id: string;
  menu_id: string;
  menu_sub_category_id: string;
  name: string;
  description: string;
  unit: string;
  base_price: number;
  tax_category: TaxComponentBreakdown[];
  dietary_type: DietaryType;
  variant_groups: VariantGroupResponse[];
  add_ons: AddOnResponse[];
  served_by: string;
}

export interface TaxComponentBreakdown {
  tax_component_name: string;
  tax_rate: number;
}

export interface VariantGroupResponse {
  id: string;
  menu_item_id: string;
  variant_group_name: string;
  variants: VariantResponse[];
}

export interface VariantResponse {
  id: string;
  variant_group_id: string;
  menu_item_id: string;
  name: string;
  price: number;
}

export interface AddOnResponse {
  id: string;
  menu_item_id: string;
  name: string;
  price: number;
}

export type DietaryType = "VEGETARIAN" | "NON_VEGETARIAN" | "VEGAN";

export async function GetMenu(
  ownersID: string,
): Promise<APIResponse<MenuResponse[]>> {
  const res = await api.get(MenuModuleEndpoints.GetMenu(ownersID));
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddMenuPayload {
  ownersID: string;
  request_payload: any;
}
export async function CreateMenu(payLoad: AddMenuPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddMenu(payLoad.ownersID),
    payLoad.request_payload,
  );
  return res.data;
}

interface AddCategoryInMenuPayload {
  OwnersID: string;
  request_payload: any;
}
export async function AddCategoryInMenu(payLoad: AddCategoryInMenuPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddCategory(payLoad.OwnersID),
    payLoad.request_payload,
  );
  return res.data;
}

interface AddSubCategoryInCategoryPayload {
  ownersID: string;
  request_payload: any;
}
export async function AddSubCategoryInCategory(
  payLoad: AddSubCategoryInCategoryPayload,
) {
  const res = await api.post(
    MenuModuleEndpoints.AddSubCategory(payLoad.ownersID),
    payLoad.request_payload,
  );
  return res.data;
}

interface AddMenuItemPayload {
  ownersID: string;
  request_payload: any;
}

export async function AddMenuItemInSubCategory(payLoad: AddMenuItemPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddMenuItem(payLoad.ownersID),
    payLoad.request_payload,
  );
  return res.data;
}

interface AddVariantGroupPayload {
  ownersID: string;
  request_payload: any;
}

export async function AddVariantGroup(payload: AddVariantGroupPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddVariantGroup(payload.ownersID),
    payload.request_payload,
  );
  return res.data;
}

interface AddVariantsPayload {
  ownersID: string;
  request_payload: any;
}
export async function AddVariantsInVariantGroup(payload: AddVariantsPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddVariant(payload.ownersID),
    payload.request_payload,
  );
  return res.data;
}

interface AddonPayload {
  ownersID: string;
  payload: any;
}

export async function AddAddon(payload: AddonPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddAddon(payload.ownersID),
    payload.payload,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddPreferredKitchenToMenuGroupPayload {
  ownersID: string;
  payload: any;
}

export async function AddPreferredKitchenToMenuGroup({
  ownersID,
  payload,
}: AddPreferredKitchenToMenuGroupPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddPreferredKitchenToMenuGroup(ownersID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddPreferredKitchenToMenuCategoryPayload {
  ownersID: string;
  payload: any;
}

export async function AddPreferredKitchenToMenuCategory({
  ownersID,
  payload,
}: AddPreferredKitchenToMenuCategoryPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddPreferredKitchenToMenuCategory(ownersID),
    payload,
  );

  return res.data;
}
/* ---------------------------------- <***> --------------------------------- */

interface AddPreferredKitchenToMenuSubCategoryPayload {
  ownersID: string;
  payload: any;
}

export async function AddPreferredKitchenToMenuSubCategory({
  ownersID,
  payload,
}: AddPreferredKitchenToMenuSubCategoryPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddPreferredKitchenToMenuSubCategory(ownersID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddPreferredKitchenToMenuItemPayload {
  ownersID: string;
  payload: any;
}

export async function AddPreferredKitchenToMenuItem({
  ownersID,
  payload,
}: AddPreferredKitchenToMenuItemPayload) {
  const res = await api.post(
    MenuModuleEndpoints.AddPreferredKitchenToMenuItem(ownersID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddTaxCategoryOfMenuGroup {
  ownerID: string;
  payload: {
    menuGroupId: string;
    taxCategoryId: string;
    legalEntityId: string;
  };
}

export async function AddTacCategoryOfMenuGroup({
  ownerID,
  payload,
}: AddTaxCategoryOfMenuGroup) {
  const res = await api.post(
    MenuModuleEndpoints.AddTaxCategoryForMenuGroup(ownerID),
    payload,
  );

  return res.data;
}
