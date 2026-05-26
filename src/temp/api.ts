import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";

const legalEntityEntityPoints = {
  getAll: "/accounting/e",
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

export interface AllLegalEntityListResposne {
  id: string;
  display_name: string;
  legal_name: string;
  status: boolean;
  entity_type: string;
  inc_date: string;
}

export async function GetLegalEntities() {
  const res = await api.get<APIResponse<AllLegalEntityListResposne[]>>(
    legalEntityEntityPoints.getAll,
  );
  return res.data;
}
