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
