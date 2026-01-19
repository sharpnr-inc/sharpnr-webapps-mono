import api from "@/middlewares/axios";
import { OrchestratorEndpoints } from "./endpoints";

export async function FetchOrchestratorOverview() {
  const res = await api.get("");
  return res.data;
}

export async function FetchSetupProgress() {
  const res = await api.get(OrchestratorEndpoints.SetupWiz.Progress);
  return res.data;
}
