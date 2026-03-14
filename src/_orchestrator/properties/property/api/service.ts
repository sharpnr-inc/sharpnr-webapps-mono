import api from "@/middlewares/axios";
import type { PropertyPayload } from "../forms/AddPropertyForm";
import type { APIResponse } from "@/utilities/api_response";

const PropertyEndpoints = {
  AddProperty: "/orchestrator/console/property/create",
  allProperty: "/orchestrator/console/property",
  PropertyDetails: (propID: string | undefined) =>
    `/orchestrator/console/property/${propID}`,
  AddDomain: (propertyID: string) =>
    `/orchestrator/console/property/${propertyID}/add-domain`,
  AddModules: (propertyID: string) =>
    `/orchestrator/console/property/${propertyID}/add-modules`,
  AddInfra: (propertyID: string) =>
    `/orchestrator/console/property/${propertyID}/add-infra`,
  ConfigureHotel: (propertyID: string) =>
    `/orchestrator/console/property/${propertyID}/configure-hotel`,
  utils: {
    allDomain: "/orchestrator/console/property/utils/domains",
  },
};

/* ---------------------------------- <***> --------------------------------- */

export interface PropertyDomain {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
}

export async function GetAllDomain(): Promise<APIResponse<PropertyDomain[]>> {
  const res = await api.get<APIResponse<PropertyDomain[]>>(
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

export interface PropertiesOfOrganizationData {
  properties: Property[];
}

export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  domain: string;
  is_configured: boolean;
  code: string;
}

export async function ListAllProperties(): Promise<
  APIResponse<PropertiesOfOrganizationData>
> {
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

export interface PropertyModule {
  id: string;
  name: string;
  status: boolean;
  module_type: string;
  is_configured: boolean;
}

export interface PropertyInfra {
  id: string;
  name: string;
  status: boolean;
  infra_type: string;
}

export interface PropertyDetailsData {
  name: string;
  code: string;
  city: string;
  address_line: string;
  state: string;
  country: string;
  domain: string;
  __modules__data__: PropertyModule[];
  infra: PropertyInfra[];
}

export async function GetPropertyDetails(
  propertyID: string | undefined,
): Promise<APIResponse<PropertyDetailsData>> {
  const res = await api.get<APIResponse<PropertyDetailsData>>(
    PropertyEndpoints.PropertyDetails(propertyID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

type AddDomainPayload = {
  propertyID: string;
  domain: string;
};

export async function SetDomainOfProperty({
  propertyID,
  domain,
}: AddDomainPayload) {
  const res = await api.post(PropertyEndpoints.AddDomain(propertyID), {
    domain, // 👈 MUST be an object
  });
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
  request_payload: any;
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
  request_payload: any;
}

export async function ConfigureHotel(payload: ConfigureHotelPayload) {
  const res = await api.post(
    PropertyEndpoints.ConfigureHotel(payload.propertyID),
    payload.request_payload,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
