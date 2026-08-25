import init, {
  checkParsePolicySet,
  formatPolicies,
  policyToJson,
  type PolicyJson,
} from "@cedar-policy/cedar-wasm/web";

/**
 * Cedar ships three builds. We deliberately use the `web` one.
 *
 * The default (`esm`) entry does `import * as wasm from "./cedar_wasm_bg.wasm"`,
 * a bare ESM wasm import that only resolves with `vite-plugin-wasm` plus
 * `vite-plugin-top-level-await` -- which would force every consuming app to
 * change its vite.config just to render a policy form.
 *
 * The `web` build instead resolves the binary with
 * `new URL("cedar_wasm_bg.wasm", import.meta.url)`, a pattern Vite understands
 * natively and emits as an asset. The trade is that it must be initialised
 * before use, which this module owns so callers never see it.
 */

let ready = false;
let pending: Promise<void> | null = null;

/** Starts (or joins) wasm initialisation. Safe to call repeatedly. */
export function initCedar(): Promise<void> {
  if (!pending) {
    pending = init()
      .then(() => {
        ready = true;
      })
      .catch((err: unknown) => {
        // Leave `ready` false; callers fall back to passthrough validation
        // rather than taking the whole form down.
        console.error("[policy-builder] cedar wasm failed to load", err);
      });
  }
  return pending;
}

/** True once the engine can parse/format. */
export function isCedarReady(): boolean {
  return ready;
}

export { checkParsePolicySet, formatPolicies, policyToJson };
export type { PolicyJson };
