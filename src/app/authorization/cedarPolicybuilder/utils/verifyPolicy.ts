import { checkParsePolicySet, formatPolicies } from "@cedar-policy/cedar-wasm";

export interface PolicyVerification {
  ok: boolean;
  /** Pretty-printed policy text when parsing succeeded, else the input. */
  formatted: string;
  /** Human-readable parse errors (empty when ok). */
  errors: string[];
}

/**
 * Parse and format a Cedar policy string using the cedar-wasm engine.
 * Returns whether it's syntactically valid plus a tidied version of the source.
 */
export function verifyPolicy(policyText: string): PolicyVerification {
  // checkParsePolicySet accepts a raw policy string as `staticPolicies`.
  const parsed = checkParsePolicySet({ staticPolicies: policyText });

  if (parsed.type === "failure") {
    return {
      ok: false,
      formatted: policyText,
      errors: parsed.errors.map((e) =>
        e.help ? `${e.message} (${e.help})` : e.message,
      ),
    };
  }

  const formattedAnswer = formatPolicies({
    policyText,
    lineWidth: 80,
    indentWidth: 2,
  });
  return {
    ok: true,
    formatted:
      formattedAnswer.type === "success"
        ? formattedAnswer.formatted_policy
        : policyText,
    errors: [],
  };
}
