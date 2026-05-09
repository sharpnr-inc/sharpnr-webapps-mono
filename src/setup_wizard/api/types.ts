export type SetupWizOverallSetupStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

export type SetupWizStepType =
  | "SUPER_ADMIN_PROFILE"
  | "ORGANIZATION_DETAILS_UPDATES"
  | "OPERATIONS_SETUP";

export type StepWizStepProgressStatus = "IN_PROGRESS" | "COMPLETED";

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

export interface AddPropertySetupRequestDTO {
  stepId: string;
  orgId: string;
  name: string;
  code: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface SetupLegalEntityRequestDTO {
  stepId: string;
  orgId: string;
  legalName: string;
  type: string; // e.g., 'LLC', 'Private Limited', etc.
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface SetupSuperAdminDetailsReqDTO {
  step_id: string; // uuid.UUID
  first_name: string;
  last_name: string;
  secondary_email: string;
  employee_id?: string;
}
