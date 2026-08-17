import { api } from "@sharpnr/http";

const legalEntityEntityPoints = {
  getAll: "/orchestrator/console/legal-entity",
  create: "/orchestrator/console/legal-entity/create",
  addTaxRegistration: (legalEntityID: string) =>
    `/orchestrator/console/legal-entity/tax-registration/${legalEntityID}/add`,
  GetAllTaxRegistration: (legalEntityID: string) =>
    `/orchestrator/console/legal-entity/tax-registration/${legalEntityID}`,
  AddTaxCategoryORTaxCode: (legalEntityID: string) =>
    `/orchestrator/console/legal-entity/tax-category/${legalEntityID}/add `,
  GetAllTaxCategory: (legalEntityID: string) =>
    `orchestrator/console/legal-entity/tax-category/${legalEntityID}`,
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

export interface AddTaxCategoryPayload {
  legal_entity_id: string;
  category_name: string;
  code: string;
  description?: string;

  accounting_book_id: string;
  receivable_account_id: string;
  income_account_id: string;

  rule: AddTaxCategoryRulePayload;
}

export interface AddTaxCategoryRulePayload {
  legal_entity_tax_registration_id: string;

  tax_type: string;
  rate: number;

  min_value?: number;
  max_value?: number;

  effective_from: string;
  effective_to?: string;

  components: TaxComponentPayload[];
}

export interface TaxComponentPayload {
  component_code: string;
  rate: number;
  liability_account_id: string;
}

interface AddTaxCategoryInLegalEntity {
  legalEntityID: string;
  payload: AddTaxCategoryPayload;
}

export async function AddTaxCategoryOrCodeInLegalEntity({
  legalEntityID,
  payload,
}: AddTaxCategoryInLegalEntity) {
  const res = await api.post(
    legalEntityEntityPoints.AddTaxCategoryORTaxCode(legalEntityID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAllTaxCategoryOfLegalEntity(legalEntityID: string) {
  const res = await api.get(
    legalEntityEntityPoints.GetAllTaxCategory(legalEntityID),
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
