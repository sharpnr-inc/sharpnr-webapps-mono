import AuditLogIndexPage from "@/app/audit-log/pages/AuditLogIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/audit-log/")({
  component: AuditLogIndexPage,
});
