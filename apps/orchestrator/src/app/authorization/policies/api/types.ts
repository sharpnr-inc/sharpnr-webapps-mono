/** A policy as returned by the Sentinel backend (`/orchestrator/sentinel/policies`). */
export interface SentinelPolicy {
  id: string;
  name: string;
  description?: string;
  /** Cedar policy source text. */
  statement: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SentinelPoliciesResponse = SentinelPolicy[];
