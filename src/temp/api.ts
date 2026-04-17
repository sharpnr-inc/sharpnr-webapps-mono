import api from "@/middlewares/axios";

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

export async function GetLegalEntities() {
  const res = await api.get(legalEntityEntityPoints.getAll);
  return res.data;
}
