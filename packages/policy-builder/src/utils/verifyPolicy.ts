import { checkParsePolicySet, formatPolicies, isCedarReady } from "./cedar";

export interface PolicyVerification {
  ok: boolean;
  /** Pretty-printed policy text when parsing succeeded, else the input. */
  formatted: string;
  /** Human-readable parse errors (empty when ok). */
  errors: string[];
  /**
   * False while the Cedar wasm engine is still loading, or if it failed to
   * load at all. `ok` is only meaningful once this is true.
   */
  engineReady: boolean;
}

/**
 * Parse and format a Cedar policy string using the cedar-wasm engine.
 * Returns whether it's syntactically valid plus a tidied version of the source.
 */
export function verifyPolicy(policyText: string): PolicyVerification {
  // The engine loads asynchronously. Report "not yet verified" rather than
  // "valid" -- callers gate their save button on `ok`, and claiming validity
  // we have not actually checked is how an unparseable policy gets saved.
  if (!isCedarReady()) {
    return { ok: false, formatted: policyText, errors: [], engineReady: false };
  }

  // checkParsePolicySet accepts a raw policy string as `staticPolicies`.
  const parsed = checkParsePolicySet({ staticPolicies: policyText });

  if (parsed.type === "failure") {
    return {
      ok: false,
      formatted: policyText,
      errors: parsed.errors.map((e) =>
        e.help ? `${e.message} (${e.help})` : e.message,
      ),
      engineReady: true,
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
    engineReady: true,
  };
}
