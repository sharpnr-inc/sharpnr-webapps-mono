import type { SetupProgressResponseDTO } from "../api/types";

export function resolveSetupWizardStep(
  apiresponse: SetupProgressResponseDTO | undefined,
) {
  if (!apiresponse) return "start"; // If we don't have data, assume we're at the start
  const { steps, is_completed, current_step } = apiresponse;

  // 1. If the whole thing is marked complete, return null to handle redirection
  if (is_completed) {
    return null;
  }

  // 2. Find the first step that is NOT complete
  // We prioritize the array order because it represents your business logic flow
  const nextStep = steps.find((s) => s.status !== "COMPLETE");

  // 3. Fallback to the 'current_step' provided by the backend if no incomplete step is found in the array
  const activeStep = nextStep?.step || current_step;

  if (!activeStep) return "start"; // Default fallback

  // 4. Return the step ID formatted for your URL (lowercase)
  return activeStep.toLowerCase();
}

/**
 * Utility to format the ISO strings from your API
 */
export const formatSetupDate = (dateString?: string) => {
  if (!dateString) return "Pending";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};
