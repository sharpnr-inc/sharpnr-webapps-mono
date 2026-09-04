import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listAuditLogs } from "./service";
import type { AuditLogQueryParams } from "./types";

export const auditLogKeys = {
  all: ["audit-logs"] as const,
  list: (params: AuditLogQueryParams) =>
    [...auditLogKeys.all, "list", params] as const,
};

export function useAuditLogs(params: AuditLogQueryParams = {}) {
  return useQuery({
    queryKey: auditLogKeys.list(params),
    queryFn: () => listAuditLogs(params),
    staleTime: 30_000,
    // Keep the current page on screen while the next one loads.
    placeholderData: keepPreviousData,
  });
}
