import { SetupWizardPage } from "@/setup_wizard/pages/SetupWizardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/")({
  component: SetupWizardPage,
});
