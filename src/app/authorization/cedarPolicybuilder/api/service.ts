import api from "@/middlewares/axios";

const SentinelEndpoints = {
  listAllResources: () => `/orchestrator/sentinel/principals`,
};

export async function GetAllOrgResources() {
  const response = await api.get(SentinelEndpoints.listAllResources());
  return response.data;
}
