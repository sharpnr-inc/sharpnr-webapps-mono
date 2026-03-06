import api from "@/middlewares/axios";

const legalEntityEntityPoints = {
  getAll: "/orchestrator/console/legal-entity",
  create: "/orchestrator/console/legal-entity/create",
};

export async function CreateLegalEntity(payload: any) {
  const res = await api.post(legalEntityEntityPoints.create, payload);
  return res.data;
}

export async function GetLegalEntities() {
  const res = await api.get(legalEntityEntityPoints.getAll);
  return res.data;
}
