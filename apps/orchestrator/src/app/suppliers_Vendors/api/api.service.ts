import { api } from "@sharpnr/http";

export const SupplierOrchestratorEndpoints = {
  GetAllSupplier: () => `/orchestrator/suppliers/list`,
  CreateNewSupplier: () => `/orchestrator/suppliers/add-new`,
  AddLegalEntity: (legalEntityID: string) =>
    `/orchestrator/suppliers/${legalEntityID}/add-lel`,
};

export async function GetAllOrganizationSuppliers() {
  const res = await api.get(SupplierOrchestratorEndpoints.GetAllSupplier());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface NewSupplierPayloadInterface {
  suppliers_name: string;
  email: string;
  phone: string;

  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}
export async function AddNewSupplier(payload: NewSupplierPayloadInterface) {
  const res = await api.post(
    SupplierOrchestratorEndpoints.CreateNewSupplier(),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
export interface LegalEntityLinkPayload {
  suppliers_id: string;
  legal_entity_id: string;
}
export async function AddLegalEntityLinkToSuppliers(
  payload: LegalEntityLinkPayload,
) {
  const res = await api.post(
    SupplierOrchestratorEndpoints.AddLegalEntity(payload.suppliers_id),
    payload,
  );
  return res.data;
}
