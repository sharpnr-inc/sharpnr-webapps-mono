export const STEP_ROUTE_MAP = {
  ORG_HQ_SETUP: "organization",
  PROPERTY_SETUP: "property",
  LEGAL_ENTITY_SETUP: "legal-entity",
  SUMMARY: "summary",
} as const;

export type StepKey = keyof typeof STEP_ROUTE_MAP;

type SetupStep = {
  id: string
  step: StepKey
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED"
}

type SetupProgress = {
  overall_status: string
  current_step?: StepKey
  steps: SetupStep[]
}

export function resolveSetupWizardRoute(progress: SetupProgress) {
  // 1️⃣ Find the active step
  const activeStep =
    progress.steps.find((s) => s.status === "IN_PROGRESS") ??
    progress.steps.find((s) => s.status === "BLOCKED")

  if (!activeStep) {
    throw new Error("No active setup step found")
  }

  // 2️⃣ Resolve route segment
  const routeSegment = STEP_ROUTE_MAP[activeStep.step]
  if (!routeSegment) {
    throw new Error(`Unknown setup wizard step: ${activeStep.step}`)
  }

  return {
    routeSegment,
    stepId: activeStep.id,
  }
}
