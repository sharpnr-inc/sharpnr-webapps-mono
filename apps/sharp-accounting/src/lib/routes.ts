/**
 * Route paths shared between a route file and the code that redirects to it.
 * Kept out of `src/routes` so importing the constant doesn't pull a whole
 * (code-split) route module along with it.
 */

/** The legal-entity chooser -- the entry point of the accounting workspace. */
export const LEGAL_ENTITY_CHOOSER_PATH = "/legal-entities" as const;
