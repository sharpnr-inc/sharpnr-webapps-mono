import api from "@/middlewares/axios";

const sentinelEndpoints = {
  listPolicies: () => `/orchestrator/sentinel/policies`,
};

export async function GetAllOrgPolcies() {
  const res = await api.get(sentinelEndpoints.listPolicies());
  return res.data;
}

export async function GetAllOrgRolesPolicy() {
  const res = await api.get(sentinelEndpoints.listPolicies());
  return res.data;
}
