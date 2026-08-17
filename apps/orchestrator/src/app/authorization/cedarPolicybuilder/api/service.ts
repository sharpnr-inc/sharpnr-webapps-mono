import api from "@/middlewares/axios";

const SentinelEndpoints = {
  listAllPricipals: () => `/orchestrator/sentinel/principals`,
  listAllResources: () => `/orchestrator/sentinel/resources/SentinelPolicy`,
};

export async function GetAllOrgResources() {
  const response = await api.get(SentinelEndpoints.listAllResources());
  return response.data;
}

export async function GetAllOrgPricipals() {
  const response = await api.get(SentinelEndpoints.listAllPricipals());
  return response.data;
}
