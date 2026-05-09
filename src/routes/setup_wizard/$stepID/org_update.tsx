import { OrgNameSetupPage } from "@/setup_wizard/pages/OrganizationUpdatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/$stepID/org_update")({
  component: OrgNameSetupPage,
});
