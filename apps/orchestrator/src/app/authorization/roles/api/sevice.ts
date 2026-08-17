import { api } from "@sharpnr/http";
import type { APIResponse } from "@/lib/api_response";
import type { OrgRole } from "./types";

const sentinelEndpoints = {
  listRoles: () => `/orchestrator/sentinel/roles`,
};

export async function GetAllOrgRoles(): Promise<APIResponse<OrgRole[]>> {
  const res = await api.get(sentinelEndpoints.listRoles());
  return res.data;
}
