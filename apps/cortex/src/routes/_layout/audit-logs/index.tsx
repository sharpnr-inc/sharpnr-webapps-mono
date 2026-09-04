import AuditLogsIndexPage from "@/app/audit-logs/pages/AuditLogsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/audit-logs/")({
  component: AuditLogsIndexPage,
});
