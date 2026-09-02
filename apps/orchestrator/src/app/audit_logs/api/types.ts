export interface AuditLogActor {
  id?: string;
  name?: string;
  type: string;
  ipAddress?: string;
}

export interface AuditLogEntry {
  id: string;
  actor: AuditLogActor;
  module: string;
  action: string;
  resourceType?: string;
  resourceId?: string | null;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AuditLogPageResponseDto {
  logs: AuditLogEntry[];
  pagination: PaginationMeta;
}

export interface AuditLogQueryParams {
  limit?: number;
  offset?: number;
}
