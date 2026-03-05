import api from "@/middlewares/axios";
import { MenuModuleEndpoints } from "./api.endpoints";

export async function GetMenu(ownersID: string) {
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
