export interface SentinelUserGroupResponseDto {
  id: string;
  name: string;
  description: string;
  parentGroupId: string | null;
}

export interface CreateSentinelUserGroupRequestDto {
  name: string;
  description: string;
  parentGroupId: string | null;
}

export interface GroupUserResponseDto {
  id: string;
  name: string;
}

export interface GroupPolicesResponseDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface GroupDetailsResponseDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: GroupUserResponseDto[];
  polices: GroupPolicesResponseDto[];
}

/* -------------------------------------------------------------------------- */
/*  Wire shapes                                                               */
/*                                                                            */
/*  The group-details endpoint serializes its Go structs without json tags,   */
/*  so it comes back PascalCase — unlike the group list, which is camelCase.  */
/*  These mirror the raw payload; the service maps them onto the DTOs above   */
/*  so the UI only ever sees camelCase.                                       */
/* -------------------------------------------------------------------------- */

export interface GroupUserWire {
  ID: string;
  Name: string;
}

export interface GroupPolicyWire {
  ID: string;
  Name: string;
  Description: string;
  CreatedAt: string;
}

export interface GroupDetailsWire {
  ID: string;
  Name: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  User: GroupUserWire[] | null;
  Polices: GroupPolicyWire[] | null;
}
