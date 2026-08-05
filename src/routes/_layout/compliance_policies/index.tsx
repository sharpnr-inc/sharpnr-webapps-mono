import { ComplianceAndPoliciesPage } from "@/app/ComplianceAndPolicies/ComplianceAndPoliciesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/compliance_policies/")({
  component: ComplianceAndPoliciesPage,
});
