import { ComplianceAndPoliciesPage } from "@/app/pages/ComplianceAndPolicies/ComplianceAndPoliciesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/compliance_policies/")({
  component: ComplianceAndPoliciesPage,
});
