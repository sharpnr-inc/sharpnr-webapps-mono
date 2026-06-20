import AuditLogsIndexPage from "@/app/audit_logs/pages/AuditLogsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/audit-log/")({
  component: AuditLogsIndexPage,
});
