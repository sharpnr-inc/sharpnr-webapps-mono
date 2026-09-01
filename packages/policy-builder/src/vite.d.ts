import type { Plugin } from "vite";

/**
 * Vite plugin required by apps that render <PolicyBuilder>. Keeps the Cedar
 * wasm module out of dev-time dependency pre-bundling so its binary resolves.
 */
export declare function policyBuilder(): Plugin;
export default policyBuilder;
