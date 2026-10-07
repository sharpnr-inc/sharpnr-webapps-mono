import { SetupWizardWelcomePage } from "@/setup_wizard/pages/SetupWizardWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

// Redirects to the current step (or /home) happen in the parent route's
// beforeLoad, so this route only ever renders the welcome page.
export const Route = createFileRoute("/setup_wizard/")({
  component: SetupWizardWelcomePage,
});
