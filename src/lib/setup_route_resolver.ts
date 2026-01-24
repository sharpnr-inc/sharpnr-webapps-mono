export const STEP_ROUTE_MAP = {
  ORG_HQ_SETUP: "organization",
  PROPERTY_SETUP: "property",
  LEGAL_ENTITY_SETUP: "legal-entity",
  SUMMARY: "summary",
} as const;

export type StepKey = keyof typeof STEP_ROUTE_MAP;

export function resolveStepRoute(step: StepKey): string {
  const route = STEP_ROUTE_MAP[step];
  if (!route) {
    throw new Error(`Unknown setup wizard step: ${step}`);
  }
  return route;
}