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
