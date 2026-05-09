import type { SetupProgressResponseDTO, SetupWizStepType } from "../api/types";

export const SetupStepStatus = {
  InProgress: "IN_PROGRESS",
  Completed: "COMPLETED",
} as const;

export const SetupSteps = {
  SuperAdminDetailsStep: "SUPER_ADMIN_PROFILE",
  OrganizationDetailsUpdates: "ORGANIZATION_DETAILS_UPDATES",
  BaseOperationStep: "OPERATIONS_SETUP",
} as const;

export type SetupStepRedirect = {
  to:
    | "/setup_wizard/$stepID/userinfo"
    | "/setup_wizard/$stepID/base_setup"
    | "/setup_wizard/$stepID/org_update";
  params: { stepID: string };
};

export type ResolvedRedirect =
  | { type: "NOT_STARTED"; target: SetupStepRedirect } // overall_status === NOT_STARTED, but step id exists
  | { type: "IN_PROGRESS"; target: SetupStepRedirect } // active step found
  | { type: "COMPLETED" } // is_completed === true
  | { type: "UNRESOLVABLE" }; // no step to redirect to

export const SetupStepPaths: Record<SetupWizStepType, SetupStepRedirect["to"]> =
  {
    SUPER_ADMIN_PROFILE: "/setup_wizard/$stepID/userinfo",
    ORGANIZATION_DETAILS_UPDATES: "/setup_wizard/$stepID/org_update",
    OPERATIONS_SETUP: "/setup_wizard/$stepID/base_setup",
  };

export function resolveSetupWizardRedirect(
  apiresponse: SetupProgressResponseDTO | undefined,
): ResolvedRedirect {
  if (!apiresponse) return { type: "UNRESOLVABLE" };

  const { is_completed, overall_status, steps } = apiresponse;

  if (is_completed || overall_status === "COMPLETED")
    return { type: "COMPLETED" };

  // Find the first step that isn't done yet
  const step = steps.find((s) => s.status !== "COMPLETED");

  if (!step) return { type: "UNRESOLVABLE" };

  const to = SetupStepPaths[step.step];

  if (!to) return { type: "UNRESOLVABLE" };

  const target: SetupStepRedirect = {
    to,
    params: { stepID: step.id },
  };

  // Keep NOT_STARTED distinct so the welcome page can stay mounted
  // while still knowing exactly where Continue should go
  if (overall_status === "NOT_STARTED") {
    return { type: "NOT_STARTED", target };
  }

  return { type: "IN_PROGRESS", target };
}

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
