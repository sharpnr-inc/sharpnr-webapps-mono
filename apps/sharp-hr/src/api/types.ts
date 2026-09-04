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

export interface UserDataResponseDto {
  email: string;
  firstName: string;
  lastName: string;
  id: string; // uuid.UUID → string in TypeScript
  role: string;
  org_data: OrgData;
}

/** The organization the signed-in user belongs to. */
export interface OrgData {
  org_name: string;
  sharp_id: string;
}

export interface OrgEmployeeList {
  id: string;
  employeeName: string;
  employeeRole: string;
  employeeID: string;
  status: string;
}

