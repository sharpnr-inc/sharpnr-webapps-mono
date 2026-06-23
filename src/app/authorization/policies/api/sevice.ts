import api from "@/middlewares/axios";

const sentinelEndpoints = {
  listPermisions: () => `/orchestrator/sentinel/policies`,
};

export async function GetAllPermissions() {
  const res = await api.get(sentinelEndpoints.listPermisions());
  return res.data;
}
