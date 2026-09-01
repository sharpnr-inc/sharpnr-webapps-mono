/** An organization role as returned by `/orchestrator/sentinel/roles`. */
export interface OrgRole {
  id: string;
  slug: string;
  name: string;
  description: string;
}

// Note: For Now we are not using the or adding the policyID[] in this
// we will circle back to it.
export interface CreateNewSentinelRoleRequestDto {
  name: string;
  description: string;
}
