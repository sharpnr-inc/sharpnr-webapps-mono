import { SetupWizardWelcomePage } from "@/setup_wizard/pages/SetupWizardWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/")({
  component: SetupWizardWelcomePage,
});
