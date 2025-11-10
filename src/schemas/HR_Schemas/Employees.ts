/**
 * @description
 * Request schema for adding a new employee to an organization.
 * This interface defines the required fields for creating an employee record
 * within the HR module of the system.
 *
 * @interface HR_AddEmployeeInOrganizationRequest
 * @example
 * {
 *   "employee_email": "john.doe@example.com",
 *   "employee_phone": "+919876543210",
 *   "employee_fullName": "John Doe"
 * }
 */
export interface HR_AddEmployeeInOrganizationRequest {
  /**
   * Employee's official email address.
   * This should be unique within the organization.
   * @example "john.doe@example.com"
   */
  employee_email: string;

  /**
   * Employee's phone number, including country code if applicable.
   * @example "+919876543210"
   */
  employee_phone: string;

  /**
   * Full name of the employee as it should appear in records.
   * @example "John Doe"
   */
  employee_fullName: string;
}


