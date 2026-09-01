/**
 * Vite integration for @sharpnr/policy-builder.
 *
 * Plain JS on purpose: vite.config.ts is evaluated by Node, which cannot load
 * a raw .ts file from a workspace package, and this repo's packages ship
 * source with no build step. Types live in vite.d.ts next to this file.
 *
 * The package loads Cedar through wasm-bindgen's `web` build, which finds its
 * binary with `new URL("cedar_wasm_bg.wasm", import.meta.url)`. Vite handles
 * that natively in a build, but its dev-time dependency optimiser would
 * pre-bundle the module into `.vite/deps` *without* copying the .wasm next to
 * it, so the URL would 404 in `vite dev`.
 *
 * Excluding the dep from pre-bundling is the whole fix. Apps get it by adding
 * this plugin rather than having to know any of the above.
 *
 * @example
 * import { policyBuilder } from "@sharpnr/policy-builder/vite";
 * export default defineConfig({ plugins: [react(), policyBuilder()] });
 */
export function policyBuilder() {
  return {
    name: "sharpnr:policy-builder",
    config: () => ({
      optimizeDeps: { exclude: ["@cedar-policy/cedar-wasm"] },
    }),
  };
}

export default policyBuilder;
