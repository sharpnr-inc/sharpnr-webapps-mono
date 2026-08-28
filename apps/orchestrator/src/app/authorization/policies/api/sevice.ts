import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type { SentinelPoliciesResponse } from "./types";

const sentinelEndpoints = {
  listPolicies: () => `/orchestrator/sentinel/orgpolicies`,
};

export async function GetAllOrgPolcies(): Promise<
  APIResponse<SentinelPoliciesResponse>
> {
  const res = await api.get(sentinelEndpoints.listPolicies());
  return res.data;
}
