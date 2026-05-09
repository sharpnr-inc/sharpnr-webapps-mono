import type { SetupProgressResponseDTO } from "../api/types";

export const SetupStepStatus = {
  InProgress: "IN_PROGRESS",
  Completed: "COMPLETED",
} as const;

export const SetupSteps = {
  SuperAdminDetailsStep: "SUPER_ADMIN_PROFILE",
  BaseOperationStep: "OPERATIONS_SETUP",
} as const;

export type SetupStepRedirect = {
  to: "/setup_wizard/$stepID/userinfo" | "/setup_wizard/$stepID/base_setup";
  params: { stepID: string };
};

/**
 * Maps each backend step key to its TanStack Router redirect descriptor.
 * stepID is the lowercased step key — matches the dynamic segment in the URL.
 */
export const SetupStepPaths: Record<
  (typeof SetupSteps)[keyof typeof SetupSteps],
  SetupStepRedirect
> = {
  SUPER_ADMIN_PROFILE: {
    to: "/setup_wizard/$stepID/userinfo",
    params: { stepID: "super_admin_profile" },
  },

  OPERATIONS_SETUP: {
    to: "/setup_wizard/$stepID/base_setup",
    params: { stepID: "operations_setup" },
  },
};

const FIRST_STEP = SetupStepPaths[SetupSteps.SuperAdminDetailsStep];

/*

This is the example for the apiresponse
{
    "success": true,
    "message": "setup progress fetched successfully",
    "data": {
        "overall_status": "IN_PROGRESS",
        "progress_pct": 0,
        "is_completed": false,
        "steps": [
            {
                "id": "dce22b7e-ebdb-44e3-9884-c5f138cf00d0",
                "step": "SUPER_ADMIN_PROFILE",
                "status": "COMPLETE",
                "version": 1,
                "started_at": "2026-01-24T17:14:39.32994+05:30"
            },
            {
                "id": "0b647e85-84d2-49fe-88f4-feae13ce062d",
                "step": "OPERATIONS_SETUP",
                "status": "IN_PROGRESS",
                "version": 1,
                "started_at": "2026-01-26T10:35:17.931139+05:30"
            }
        ]
    },
    "timestamp": "2026-05-07T11:41:42.412474986+05:30"
}

*/

/**
 * @description
 * This is the method which resolves and return the stepID and Path where user have to go
 * to Complete the setup process
 *
 * @param {SetupProgressResponseDTO | undefined} apiresponse - [this is the response that we get from the progress api it tell the How much progress we have made for the setup]
 */
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

//

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

// So the goal of the this method is to check if the overall status is "IN_PROGRESS" && is_completed if both are point to setup being not complete
// we process the apiresponse and skip the complete step and move to "IN_PROGRESS" step we return the steps's associated url stated above and its stepID
// we use tanstack router
//
