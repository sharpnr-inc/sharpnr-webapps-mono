export type SetupProgressResponseDTO = {
  overall_status: string;
  current_step?: string;
  progress_pct: number;
  is_completed: boolean;
  steps: SetupStepProgressResponseDTO[];
};

export type SetupStepProgressResponseDTO = {
  id: string; // uuid.UUID → string
  step: string;
  status: string;
  version: number;
  started_at: string; // time.Time → ISO string
  completed_at?: string; // *time.Time → optional ISO string
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
