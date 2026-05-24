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

export interface SuperAdminDetailspayload {
  payload: SetupSuperAdminDetailsReqDTO;
}

export interface SetupSuperAdminDetailsReqDTO {
  step_id: string; // uuid.UUID
  first_name: string;
  last_name: string;
  secondary_email: string;
  employee_id?: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface UpdateOrganizationNamePayload {
  payload: SetupWizUpdateOrgNameRequestDto;
}

export interface SetupWizUpdateOrgNameRequestDto {
  step_id: string;
  org_name: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface SetupWizAddPropertyPayload {
  payload: SetupOrgPropertyReqDTO;
}

export interface SetupOrgPropertyReqDTO {
  step_id: string;
  name?: string;
  property_code: string;
  address_line?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;

  // Optional geolocation fields
  longitude?: number;
  latitude?: number;
  accuracy_m?: number;
}
