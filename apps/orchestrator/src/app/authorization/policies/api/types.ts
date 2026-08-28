/** A policy as returned by the Sentinel backend (`/orchestrator/sentinel/orgpolicies`). */
export interface PolicyView {
  id: string;
  name: string;
  description: string;
  policy: string;
  /** Structured form of `policy`; shape is decided by the Cedar backend. */
  policyJson: unknown;
  enabled: boolean;
}

export type SentinelPoliciesResponse = PolicyView[];
