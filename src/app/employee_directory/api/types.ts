/**
 * Employee directory domain types.
 *
 * Mirrors the shape we expect the backend org-members endpoint to return.
 * The page currently runs off mock data (see `../mock/employees`), wired so
 * swapping in a real `useEmployees()` query is a drop-in.
 */

export type EmployeeRole = "super_admin" | "admin" | "manager" | "member";

export type EmployeeStatus = "active" | "invited" | "suspended";

export interface ActivityLogEntry {
  id: string;
  /** ISO-8601 timestamp */
  timestamp: string;
  /** Short human-readable description of the action */
  action: string;
  /** Optional contextual target, e.g. "Invoice INV-2041" */
  target?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  /** Department / team label */
  department: string;
  /** ISO-8601 date the member joined */
  joinedAt: string;
  /** ISO-8601 timestamp of most recent activity */
  lastActiveAt: string;
  activity: ActivityLogEntry[];
}

export interface EmployeeResponse {
  data: Employee[];
  total: number;
}
