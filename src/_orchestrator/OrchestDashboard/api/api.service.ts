import api from "@/middlewares/axios";
import { OrchestratorConsole } from "./endpoint";

export async function GetOrganizationStatus() {
  const res = await api.get(OrchestratorConsole.status);
  return res.data;
}


export async function GetOrganizationsProperties(){
  const res =  await api.get(OrchestratorConsole.property.getAll)
  return res.data
}