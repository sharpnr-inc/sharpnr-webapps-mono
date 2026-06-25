// Cedar policy helpers.
//
// The `@cedar-policy/cedar-wasm` ESM build initializes its WASM module via a
// top-level await (handled by `vite-plugin-wasm` + `vite-plugin-top-level-await`
// in vite.config.ts), so the exported functions are ready to call as soon as the
// module is imported — no manual `init()` step is required.
import {
  policyToJson,
  formatPolicies,
  type PolicyJson,
  type EntityUidJson,
} from "@cedar-policy/cedar-wasm";
