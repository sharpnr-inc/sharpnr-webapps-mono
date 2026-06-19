import api from "@/middlewares/axios";
import type { PropertyPayload } from "../components/AddPropertyForm";
import type { APIResponse } from "@/lib/api_response";
import type {
  AddBusinessOperationModulesPayload,
  AddInfraModulesPayload,
  fetchBusinessOperationModulesResponseType,
  fetchInfraModulesResponse,
  PropertiesOfOrganizationData,
  PropertyDetailsData,
} from "./types";

const PropertyEndpoints = {
  AddProperty: "/orchestrator/property/create",

  allProperty: "/orchestrator/property",

  propertyDetails: (propID: string | undefined) =>
    `/orchestrator/property/${propID}`,
  addOrFetchBusinessOperationModules: (propertyID: string) =>
    `/orchestrator/property/${propertyID}/business_modules`,
  addOrFetchInfraModules: (propertyID: string) =>
    `/orchestrator/property/${propertyID}/infra_modules`,
};

/* ---------------------------------- <***> --------------------------------- */

export async function AddProperty(payload: PropertyPayload) {
  const res = await api.post(PropertyEndpoints.AddProperty, payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function ListAllProperties() {
  const res = await api.get<APIResponse<PropertiesOfOrganizationData>>(
    PropertyEndpoints.allProperty,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetPropertyDetails(propertyID: string | undefined) {
  const res = await api.get<APIResponse<PropertyDetailsData>>(
    PropertyEndpoints.propertyDetails(propertyID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function addBusinessOperationModules(
  payload: AddBusinessOperationModulesPayload,
): Promise<APIResponse<null>> {
  const { propertyID, payload: body } = payload;
  const response = await api.post<APIResponse<null>>(
    PropertyEndpoints.addOrFetchBusinessOperationModules(propertyID),
    body,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function fetchBusinessOperationModules(
  propertyID: string,
): Promise<APIResponse<fetchBusinessOperationModulesResponseType>> {
  const response = await api.get<
    APIResponse<fetchBusinessOperationModulesResponseType>
  >(PropertyEndpoints.addOrFetchBusinessOperationModules(propertyID));
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function AddInfraModules(
  paylod: AddInfraModulesPayload,
): Promise<APIResponse<null>> {
  const { payload: body, propertyID } = paylod;
  const response = await api.post<APIResponse<null>>(
    PropertyEndpoints.addOrFetchInfraModules(propertyID),
    body,
  );
  return response.data;
}
/* ---------------------------------- <***> --------------------------------- */

export async function fetchInfraModules(
  propertyID: string,
): Promise<APIResponse<fetchInfraModulesResponse>> {
  const response = await api.get<APIResponse<fetchInfraModulesResponse>>(
    PropertyEndpoints.addOrFetchInfraModules(propertyID),
  );
  return response.data;
}
/* ---------------------------------- <***> --------------------------------- */
