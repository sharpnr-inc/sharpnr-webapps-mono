import api from "@/middlewares/axios";
import { MenuModuleEndpoints } from "./api.endpoints";
import type { MenuOutput } from "../createMenu/types";

export async function GetMenu(ownersID: string): Promise<MenuOutput[]> {
  const res = await api.get(MenuModuleEndpoints.GetMenu(ownersID));
  return res.data.data;
}

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

export async function AddCategoryInMenu(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddCategory(ownersID));
  return res.data;
}

export async function AddSubCategoryInCategory(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddSubCategory(ownersID));
  return res.data;
}

export async function AddMenuItemInSubCategory(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddMenuItem(ownersID));
  return res.data;
}

export async function AddVariantGroup(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddVariantGroup(ownersID));
  return res.data;
}

export async function AddVariantsInVariantGroup(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddVariant(ownersID));
  return res.data;
}

export async function AddAddon(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddAddon(ownersID));
  return res.data;
}
