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
