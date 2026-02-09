import api from "@/middlewares/axios";
import { MenuModuleEndpoints } from "./api.endpoints";

export async function GetMenu(ownersID: string) {
  const res = await api.get(MenuModuleEndpoints.GetMenu(ownersID));
  return res.data;
}

export async function CreateMenu(ownersID: string) {
  const res = await api.get(MenuModuleEndpoints.AddMenu(ownersID));
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
