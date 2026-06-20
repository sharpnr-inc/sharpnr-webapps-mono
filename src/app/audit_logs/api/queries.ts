import { useQuery } from "@tanstack/react-query";
import { MOCK_AUDIT_LOGS } from "../mock/auditLogs";
import type { AuditLogEntry, AuditLogResponse } from "./types";

/**
 * Mock-backed audit log query.
 *
 * Replace the `queryFn` body with a real `auditLogsService.list()` call when the
 * backend endpoint is available — the component contract (`AuditLogResponse`)
 * does not need to change.
 */
async function fetchAuditLogs(): Promise<AuditLogResponse> {
  // Simulate network latency so loading/skeleton states are exercised.
  await new Promise((resolve) => setTimeout(resolve, 600));

  const data: AuditLogEntry[] = [...MOCK_AUDIT_LOGS].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return {
    data,
    total: data.length,
    page: 1,
    pageSize: data.length,
  };
}

export const auditLogKeys = {
  all: ["audit-logs"] as const,
  list: () => [...auditLogKeys.all, "list"] as const,
};

export function useAuditLogs() {
  return useQuery({
    queryKey: auditLogKeys.list(),
    queryFn: fetchAuditLogs,
    staleTime: 30_000,
  });
}
