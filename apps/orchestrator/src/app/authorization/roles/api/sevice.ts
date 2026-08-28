import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type { CreateNewSentinelRoleRequestDto, OrgRole } from "./types";

const sentinelEndpoints = {
  listRoles: () => `/orchestrator/sentinel/roles`,
};

export async function GetAllOrgRoles(): Promise<APIResponse<OrgRole[]>> {
  const res = await api.get(sentinelEndpoints.listRoles());
  return res.data;
}

export async function createSentinelRoleInOrg(
  req: CreateNewSentinelRoleRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(sentinelEndpoints.listRoles(), req);
  return response.data;
}
