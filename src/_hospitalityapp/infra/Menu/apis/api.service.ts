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

export async function AddVariantsInVariantGroup(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddVariant(ownersID));
  return res.data;
}

export async function AddAddon(ownersID: string) {
  const res = await api.post(MenuModuleEndpoints.AddAddon(ownersID));
  return res.data;
}
