export const SETUP_STEPS = [
  "organization",
  "property",
  "domain",
  "modules",
  "legal-entity",
  "linked-modules",
] as const;

export type SetupStep = typeof SETUP_STEPS[number];

// Version 1