import api from "@/middlewares/axios";
import { OrchestratorConsole } from "./endpoint";

export async function GetOrganizationStatus() {
  const res = await api.get(OrchestratorConsole.status);
  return res.data;
}

export async function CreateLegalEntity(payload: any) {
  const res = await api.post(OrchestratorConsole.legalEntity.create, payload);
  return res.data;
}

export async function GetLegalEntities() {
  const res = await api.get(OrchestratorConsole.legalEntity.getAll);
  return res.data;
}
