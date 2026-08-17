import { createConfig } from "@sharpnr/env";

/**
 * Suite-wide env config. The schema, validation and the full app-URL reference
 * live in `@sharpnr/env` -- this file only supplies this app's `import.meta.env`,
 * which Vite substitutes at build time and so cannot be read from the package.
 */
export const config = createConfig(import.meta.env);
