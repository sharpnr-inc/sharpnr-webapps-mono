import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";

const sentinelPolicyResorces = {
  listAllPrincipal: () => `/orchestrator/sentinel/principals`,
  listAllOrgResources: () => `/orchestrator/sentinel/resources/Property`,
};

export async function GetOrgPrincipals(): Promise<APIResponse<any>> {
  const response = await api.get(sentinelPolicyResorces.listAllPrincipal());
  return response.data;
}

export async function GetOrgResources(): Promise<APIResponse<any>> {
  const response = await api.get(sentinelPolicyResorces.listAllOrgResources());
  return response.data;
}
