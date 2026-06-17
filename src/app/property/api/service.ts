import api from "@/middlewares/axios";
import type { PropertyPayload } from "../components/AddPropertyForm";
import type { APIResponse } from "@/lib/api_response";
import type {
  PropertiesOfOrganizationData,
  PropertyDetailsData,
  PropertyDomainResponse,
} from "./types";

const PropertyEndpoints = {
  AddProperty: "/orchestrator/property/create",

  allProperty: "/orchestrator/property",

  PropertyDetails: (propID: string | undefined) =>
    `/orchestrator/property/${propID}`,

  AddModules: (propertyID: string) =>
    `/orchestrator/property/${propertyID}/add-modules`,
  AddInfra: (propertyID: string) =>
    `/orchestrator/property/${propertyID}/add-infra`,
  ConfigureHotel: (propertyID: string) =>
    `/orchestrator/property/${propertyID}/configure-hotel`,
  utils: {
    allDomain: "/orchestrator/property/utils/domains",
  },
};

/* ---------------------------------- <***> --------------------------------- */

export async function GetAllDomain() {
  const res = await api.get<APIResponse<PropertyDomainResponse>>(
    PropertyEndpoints.utils.allDomain,
  );
  return res.data;
}
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

export async function GetHospitalityDomainMods(domain: string) {
  const res = await api.get(`/utils/${domain}`);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetPropertyDetails(propertyID: string | undefined) {
  const res = await api.get<APIResponse<PropertyDetailsData>>(
    PropertyEndpoints.PropertyDetails(propertyID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface PropertyInfraConfigurationPayload {
  infra_name: string;
  qty: number;
}

export interface PropertyModuleConfigurationPayload {
  property_id: string;
  domain: string;
  modules?: string[];
  infrastructure?: PropertyInfraConfigurationPayload[];
}
export interface AddModulesInPropertyInput {
  propertyID: string;
  payload: PropertyModuleConfigurationPayload;
}

export async function AddModulesInProperty({
  payload,
  propertyID,
}: AddModulesInPropertyInput) {
  const res = await api.post(PropertyEndpoints.AddModules(propertyID), payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface AddInfraInPropPayload {
  request_payload: Record<string, unknown>;
  propertyID: string;
}
export async function AddInfraInProperty(payload: AddInfraInPropPayload) {
  const res = await api.post(
    PropertyEndpoints.AddInfra(payload.propertyID),
    payload.request_payload,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface ConfigureHotelPayload {
  propertyID: string;
  request_payload: Record<string, unknown>;
}

export async function ConfigureHotel(payload: ConfigureHotelPayload) {
  const res = await api.post(
    PropertyEndpoints.ConfigureHotel(payload.propertyID),
    payload.request_payload,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
