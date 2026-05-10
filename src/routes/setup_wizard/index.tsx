import { GetOrganizationSetUpProgress } from "@/setup_wizard/api/service";
import { SetupWizardWelcomePage } from "@/setup_wizard/pages/SetupWizardWelcomePage";
import { resolveSetupWizardRedirect } from "@/setup_wizard/resolver/step_resolver";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/")({
  beforeLoad: async ({ context }) => {
    console.log("Before Load Hit");
    const setupProgress = await context.queryClient.fetchQuery({
      queryKey: ["setup-progress", "SETUP_WIZARD"],
      queryFn: GetOrganizationSetUpProgress,
    });

    const resolved = resolveSetupWizardRedirect(setupProgress.data);

    switch (resolved.type) {
      case "COMPLETED":
        throw redirect({ to: "/home" });

      case "IN_PROGRESS":
        throw redirect({
          to: resolved.target.to,
          params: resolved.target.params,
        });

      case "NOT_STARTED":
      case "UNRESOLVABLE":
        // Stay on the welcome page
        return;
    }
  },
  component: SetupWizardWelcomePage,
});
