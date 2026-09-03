/**
 * Response returned from the identity service
 * when verifying whether a user session is authenticated.
 */
export interface UserAuthenticatedResponse {
  /**
   * Indicates whether the current session is authenticated
   */
  authenticated: boolean;

  /**
   * Unique identifier of the authenticated user (employee ID)
   */
  user_id: string;

  /**
   * Organization identifier the user belongs to
   */
  org_id: string;
}

/* ---------------------------------- <***> --------------------------------- */

export type UserDataResponseDto = {
  email: string;
  firstName: string;
  lastName: string;
  id: string; // UUID
  role: string;
  org_data: OrgData;
};

export type OrgData = {
  org_name: string;
  sharp_id: string;
};

/* ---------------------------------- <***> --------------------------------- */

export type SetupWizOverallSetupStatus =
  "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type SetupWizStepType =
  "SUPER_ADMIN_PROFILE" | "ORGANIZATION_DETAILS_UPDATES" | "OPERATIONS_SETUP";

export type StepWizStepProgressStatus = "IN_PROGRESS" | "COMPLETED" | "SKIPPED";

export type SetupProgressResponseDTO = {
  overall_status: SetupWizOverallSetupStatus;
  current_step?: SetupWizStepType;
  is_completed: boolean;
  steps: SetupStepProgressResponseDTO[];
};

export type SetupStepProgressResponseDTO = {
  id: string;
  step: SetupWizStepType;
  status: StepWizStepProgressStatus;
  version: number;
  started_at: string;
  completed_at?: string;
};

/* ---------------------------------- <***> --------------------------------- */

/**
 * Cables service state for the signed-in user's organisation.
 *
 * The org provisions Cables from the orchestrator, so this app can only read
 * the state — never start it.
 */
export interface CablesServiceResponseDto {
  /** The org has provisioned a Cables account at least once. */
  isStarted: boolean;
  /** The Cables service is currently live for this org. */
  isActive: boolean;
}
