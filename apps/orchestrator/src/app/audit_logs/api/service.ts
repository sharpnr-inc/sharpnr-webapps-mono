import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type { AuditLogPageResponseDto, AuditLogQueryParams } from "./types";

const auditLogsEndpoints = {
  getAuditLogs: ({ limit, offset }: AuditLogQueryParams = {}) => {
    const query = new URLSearchParams();
    if (limit !== undefined) query.set("limit", String(limit));
    if (offset !== undefined) query.set("offset", String(offset));

    const qs = query.toString();
    return `/orchestrator/audit-logs${qs ? `?${qs}` : ""}`;
  },
};

export async function listAuditLogs(
  params: AuditLogQueryParams = {},
): Promise<APIResponse<AuditLogPageResponseDto>> {
  const response = await api.get(auditLogsEndpoints.getAuditLogs(params));
  return response.data;
}
