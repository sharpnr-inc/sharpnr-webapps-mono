import api from "@/middlewares/axios";

export async function FetchOrchestratorOverview() {
  const res = await api.get("");
  return res.data;
}
