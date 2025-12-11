import api from "@/api_service/axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

/**
 * Description
 * This is Function fetches the All the Menu Group of the Organization
 * @async
 * @function
 * @name getAllMenuGroup
 * @kind variable
 * @returns {Promise<ApiResponse<any>>}
 * @exports
 */
export const getAllMenuGroup = async (): Promise<ApiResponse<any>> => {
  const res = await api.get<ApiResponse<any>>(
    HospitalityApiEndpoint.Menu.getAllMenuGroup
  );

  return res.data;
};

export const createCategoryInMenuGroup = async (req: any) => {
  const res = await api.post(
    HospitalityApiEndpoint.Menu.createCategoryInMenuGroup,
    req
  );
  return res.data;
};

export const getMenuGroup = async (id: string) => {
  const res = await api.get(
    HospitalityApiEndpoint.Menu.GetMenuGroupDetailsById(id)
  );
  return res.data;
};

export const createSubCategoryINCategory = async (req: any) => {
  const res = await api.post(
    HospitalityApiEndpoint.Menu.CreateSubCategoryInCategory,
    req
  );
  return res.data;
};

export const createItemInMenu = async (req: any) => {
  const res = await api.post(HospitalityApiEndpoint.Menu.CreateItemInMenu, req);
  return res.data;
};

export const createVariantInMenuItem = async (req: any) => {
  const res = await api.post(
    HospitalityApiEndpoint.Menu.CreateVariantInMenuItem,
    req
  );
  return res.data;
};

export const createAddOnInMenuItem = async (req: any) => {
  const res = await api.post(
    HospitalityApiEndpoint.Menu.CreateAddonsINMenuItem,
    req
  );
  return res.data;
};

export const getVariantOfMenuItem = async (id: string) => {
  const res = await api.get(
    HospitalityApiEndpoint.Menu.GetVariantByMenuItemId(id)
  );
  return res.data;
};
