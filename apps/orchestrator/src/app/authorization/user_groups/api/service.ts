import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CreateSentinelUserGroupRequestDto,
  SentinelUserGroupResponseDto,
} from "./types";

const userGroupEndpoints = {
  listAllGroups: () => `/orchestrator/sentinel/groups`,
  getUserGroupDetails: (userGroupID: string) =>
    `/orchestrator/sentinel/groups/${userGroupID}`,
};

// this method fetches the list of all the Groups in the organization.
export async function getUserGroupsOfOrganization(): Promise<
  APIResponse<SentinelUserGroupResponseDto[]>
> {
  const response = await api.get(userGroupEndpoints.listAllGroups());
  return response.data;
}
/* ---------------------------------- <***> --------------------------------- */

export async function createSentinelUserGroup(
  request: CreateSentinelUserGroupRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(userGroupEndpoints.listAllGroups(), request);
  return response.data;
}

// this fetches the User Group Details.
export async function getUserGroupDetails(
  userGroupID: string,
): Promise<APIResponse<any>> {
  const response = await api.get(
    userGroupEndpoints.getUserGroupDetails(userGroupID),
  );
  return response.data;
}
/* ---------------------------------- <***> --------------------------------- */
