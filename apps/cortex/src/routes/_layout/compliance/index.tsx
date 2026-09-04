import ComplianceIndexPage from "@/app/compliance/pages/ComplianceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/compliance/")({
  component: ComplianceIndexPage,
});
