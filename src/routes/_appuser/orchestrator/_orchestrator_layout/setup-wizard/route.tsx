import { SetupWizardLayout } from "@/_setup_wizard_/SetupWizard/components/ui/SetupWizard";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/setup-wizard",
)({
  component: RouteComponent,
});

// This is layout for the setup wizard
// this is version one

const mockWizardStatus = {
  step_id: "step-org-hq",
  status: "IN_PROGRESS",
  current_step: "ADD_ORGANIZATION_DETAILS",
  completed_steps: ["VERIFY_EMAIL"],
  total_steps: 5,
  completed_count: 1,
} as const;

function RouteComponent() {
  return (
    <SetupWizardLayout status={mockWizardStatus}>
      <Outlet />
    </SetupWizardLayout>
  );
}

// * This is the Page which Calls the API for the fetching the Steps of Setup Wizards
// * This SHOULD Call the API for the Steps it need
