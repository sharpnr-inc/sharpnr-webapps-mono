import { policyToJson, type PolicyJson } from "@cedar-policy/cedar-wasm";

export interface PolicyJsonResult {
  ok: boolean;
  json: PolicyJson | null;
  errors: string[];
}

/**
 * Convert Cedar policy source text into its JSON (AST) representation via
 * cedar-wasm. Useful for persisting a structured form of the policy.
 */
export function convertPolicyToJson(policyText: string): PolicyJsonResult {
  const answer = policyToJson(policyText);

  if (answer.type === "failure") {
    return {
      ok: false,
      json: null,
      errors: answer.errors.map((e) => e.message),
    };
  }

  return { ok: true, json: answer.json, errors: [] };
}
