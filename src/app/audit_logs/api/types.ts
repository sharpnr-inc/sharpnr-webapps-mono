/**
 * Audit log domain types.
 *
 * These mirror the shape we expect the backend audit endpoint to return.
 * The index page currently runs off mock data (see `../mock/auditLogs`),
 * but is wired so swapping in a real `useAuditLogs()` query is a drop-in.
 */

export type AuditSeverity = "info" | "warning" | "critical";

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "login"
  | "logout"
  | "export"
  | "permission_change"
  | "config_change";

export type AuditStatus = "success" | "failure";

export interface AuditActor {
  id: string;
  name: string;
  email: string;
  /** e.g. "Owner", "Admin", "Member", or "System" for automated events */
  role: string;
}

export interface AuditTarget {
  /** Human label, e.g. "Legal Entity", "Payment Account" */
  type: string;
  /** Display name of the affected resource */
  name: string;
  /** Underlying resource id, when applicable */
  id?: string;
}

export interface AuditLogEntry {
  id: string;
  action: AuditAction;
  status: AuditStatus;
  severity: AuditSeverity;
  actor: AuditActor;
  target: AuditTarget;
  /** Short human-readable summary of what happened */
  summary: string;
  /** ISO-8601 timestamp */
  timestamp: string;
  ipAddress: string;
  /** Parsed user-agent / device label */
  device: string;
  /** Arbitrary before/after or contextual key-values for the detail view */
  metadata?: Record<string, string>;
}

export interface AuditLogQuery {
  search?: string;
  action?: AuditAction | "all";
  severity?: AuditSeverity | "all";
  page?: number;
  pageSize?: number;
}

export interface AuditLogResponse {
  data: AuditLogEntry[];
  total: number;
  page: number;
  pageSize: number;
}
