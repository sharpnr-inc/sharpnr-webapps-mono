import api from "@/middlewares/axios";

const legalEntityEntityPoints = {
  getAll: "/orchestrator/console/legal-entity",
  create: "/orchestrator/console/legal-entity/create",
  addTaxRegistration: (legalEntityID: string) =>
    `/orchestrator/console/legal-entity/tax-registration/${legalEntityID}/add`,
  GetAllTaxRegistration: (legalEntityID: string) =>
    `/orchestrator/console/legal-entity/tax-registration/${legalEntityID}`,
};

export async function CreateLegalEntity(payload: any) {
  const res = await api.post(legalEntityEntityPoints.create, payload);
  return res.data;
}

export async function GetLegalEntities() {
  const res = await api.get(legalEntityEntityPoints.getAll);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface AddTaxRegistrationPayload {
  legal_entity_id: string;
  tax_type: string;
  registration_number: string;

  country: string;
  state: string;

  effective_from: string;
  effective_to?: string;
}

interface AddTaxRegistrationMutationPayload {
  legalEntityID: string;
  payload: AddTaxRegistrationPayload;
}

export async function AddTaxRegistration({
  legalEntityID,
  payload,
}: AddTaxRegistrationMutationPayload) {
  const res = await api.post(
    legalEntityEntityPoints.addTaxRegistration(legalEntityID),
    payload,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAllTaxRegistration(legalEntityID: string) {
  const res = await api.get(
    legalEntityEntityPoints.GetAllTaxRegistration(legalEntityID),
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
