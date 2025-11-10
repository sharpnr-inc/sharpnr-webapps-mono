/**
 * API endpoint paths for all Human Resource (HR) related operations.
 *
 * The `HR` object organizes API routes into logical subgroups:
 * - `Employees` → for managing employee records and profiles.
 * - `LeaveManagement` → for managing leave requests, approvals, and balances.
 * - `Payroll` → for handling salaries, payslips, and deductions.
 * - `Reports` → for generating HR-related analytics and reports.
 *
 * This modular structure ensures scalability and consistency 
 * across the HR module of your application.
 *
 * @constant {Object} HR
 * @property {Object} Employees - Endpoints related to employee management.
 * @property {string} Employees.GetAll - Fetch all employees.
 * @property {(id: string) => string} Employees.GetById - Fetch a specific employee’s details.
 * @property {string} Employees.Create - Create a new employee record.
 * @property {(id: string) => string} Employees.Update - Update employee details by ID.
 * @property {(id: string) => string} Employees.Delete - Delete an employee record by ID.
 *
 * @property {Object} LeaveManagement - Endpoints related to leave tracking.
 * @property {string} LeaveManagement.GetAll - Fetch all leave requests.
 * @property {string} LeaveManagement.Apply - Apply for leave.
 * @property {(id: string) => string} LeaveManagement.Approve - Approve leave by ID.
 * @property {(id: string) => string} LeaveManagement.Reject - Reject leave by ID.
 *
 * @property {Object} Payroll - Endpoints related to salary processing.
 * @property {string} Payroll.GetAll - Fetch all payroll records.
 * @property {(id: string) => string} Payroll.GetByEmployee - Fetch payroll details for a specific employee.
 * @property {string} Payroll.Generate - Generate monthly payroll.
 *
 * @property {Object} Reports - Endpoints related to HR reports.
 * @property {string} Reports.GetAttendanceReport - Fetch attendance summary reports.
 * @property {string} Reports.GetPayrollSummary - Fetch payroll summary reports.
 * @property {string} Reports.GetLeaveSummary - Fetch leave usage and balance reports.
 *
 * @example
 * import { HR } from "@/api/routes";
 *
 * // Fetch all employees
 * fetch(HR.Employees.GetAll);
 *
 * // Fetch payroll details for one employee
 * fetch(HR.Payroll.GetByEmployee("EMP123"));
 *
 * @exports
 */
export const HR = {
  Employees: {
    GetAll: "/hr/employees",
    GetById: (id: string) => `/hr/employees/${id}`,
    Create: "/hr/employees/create",
    Update: (id: string) => `/hr/employees/${id}/update`,
    Delete: (id: string) => `/hr/employees/${id}/delete`,
  },

  LeaveManagement: {
    GetAll: "/hr/leave",
    Apply: "/hr/leave/apply",
    Approve: (id: string) => `/hr/leave/${id}/approve`,
    Reject: (id: string) => `/hr/leave/${id}/reject`,
  },

  Payroll: {
    GetAll: "/hr/payroll",
    GetByEmployee: (id: string) => `/hr/payroll/employee/${id}`,
    Generate: "/hr/payroll/generate",
  },

  Reports: {
    GetAttendanceReport: "/hr/reports/attendance",
    GetPayrollSummary: "/hr/reports/payroll",
    GetLeaveSummary: "/hr/reports/leave",
  },
};
