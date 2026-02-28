import api from "@/middlewares/axios";
import { OrchestratorConsole } from "./endpoint";

export async function GetOrganizationStatus() {
  const res = await api.get(OrchestratorConsole.status);
  return res.data;
}

export async function GetOrganizationsProperties() {
  const res = await api.get(OrchestratorConsole.property.getAll);
  return res.data;
}

export async function GetPropertyDetails(propertyID: string) {
  const res = await api.get(
    OrchestratorConsole.property.PropertyDetails(propertyID),
  );
  return res.data;
}

type AddDomainPayload = {
  propertyID: string;
  domain: string;
};

export async function SetDomainOfProperty({
  propertyID,
  domain,
}: AddDomainPayload) {
  const res = await api.post(
    OrchestratorConsole.property.AddDomain(propertyID),
    {
      domain, // 👈 MUST be an object
    },
  );
  return res.data;
}

//================================================================================//
export interface PropertyInfraConfigurationPayload {
  infra_name: string;
  qty: number;
}

export interface PropertyModuleConfigurationPayload {
  property_id: string;
  domain: string;
  modules?: string[]; // maps to *[]string + omitempty
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
  const res = await api.post(
    OrchestratorConsole.property.AddModules(propertyID),
    payload,
  );
  return res.data;
}

//================================================================================//

interface ConfigureHotelPayload {
  propertyID: string;
  request_payload: any;
}
export async function ConfigureHotel(payload: ConfigureHotelPayload) {
  const res = await api.post(
    OrchestratorConsole.property.ConfigureHotel(payload.propertyID),
    payload.request_payload,
  );
  return res.data;
}

/* -------------------------------------------------------------------------- */
/*                          Legal Entity API services                         */
/* -------------------------------------------------------------------------- */

export async function CreateLegalEntity(payload: any) {
  const res = await api.post(OrchestratorConsole.legalEntity.create, payload);
  return res.data;
}

export async function GetLegalEntities() {
  const res = await api.get(OrchestratorConsole.legalEntity.getAll);
  return res.data;
}

/* -------------------------------------------------------------------------- */
/*                       Legal Entity API services Ends                       */
/* -------------------------------------------------------------------------- */
