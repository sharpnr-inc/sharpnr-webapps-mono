import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CreateSentinelUserGroupRequestDto,
  GroupDetailsResponseDto,
  GroupDetailsWire,
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

// The details endpoint answers in PascalCase and sends `null` rather than an
// empty array for an untouched group, so normalize both here.
function toGroupDetails(
  wire?: GroupDetailsWire,
): GroupDetailsResponseDto | undefined {
  if (!wire) return undefined;

  return {
    id: wire.ID,
    name: wire.Name,
    description: wire.Description,
    createdAt: wire.CreatedAt,
    updatedAt: wire.UpdatedAt,
    user: (wire.User ?? []).map((user) => ({
      id: user.ID,
      name: user.Name,
    })),
    polices: (wire.Polices ?? []).map((policy) => ({
      id: policy.ID,
      name: policy.Name,
      description: policy.Description,
      createdAt: policy.CreatedAt,
    })),
  };
}

// this fetches the User Group Details.
export async function getUserGroupDetails(
  userGroupID: string,
): Promise<APIResponse<GroupDetailsResponseDto>> {
  const response = await api.get<APIResponse<GroupDetailsWire>>(
    userGroupEndpoints.getUserGroupDetails(userGroupID),
  );
  return { ...response.data, data: toGroupDetails(response.data.data) };
}
/* ---------------------------------- <***> --------------------------------- */
