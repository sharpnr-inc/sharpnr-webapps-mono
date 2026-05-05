import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import GlobalLoader from "@/components/ui/GlobalLoader";
import { config } from "@/configs/env";
import { GetOrganizationSetUpProgress } from "@/setup_wizard/api/service";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are authenticating user" />
  ),
  beforeLoad: async ({ context }) => {
    // 1. Verify Authentication
    const authUser = await context.queryClient.ensureQueryData({
      queryKey: ["auth-user"],
      queryFn: verifyUserAuthentication,
      staleTime: 1000 * 60 * 5,
    });

    if (!authUser.data?.authenticated) {
      throw redirect({
        href: config.authAppUrl,
      });
    }

    // 2. Check Organization Setup Progress
    // We do this here so we can redirect BEFORE the loader delay
    const setupProgress = await context.queryClient.ensureQueryData({
      queryKey: ["setup-progress"],
      queryFn: GetOrganizationSetUpProgress,
    });

    // const nextStepSlug = resolveSetupWizardStep(setupProgress?.data);

    // If the organization is already configured, redirect to home
    // (Adjust the property name 'isConfigured' to match your API response)
    if (setupProgress.data?.is_completed) {
      throw redirect({
        to: "/home",
      });
    }
  },

  loader: async ({ context }) => {
    // This only runs if the user IS authenticated AND the setup IS NOT finished
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const userDetails = await context.queryClient.ensureQueryData({
      queryKey: ["user-details"],
      queryFn: GetAuthenticatedUser,
      staleTime: 1000 * 60 * 5,
    });

    const user = userDetails.data;

    if (!user) {
      throw redirect({
        href: config.authAppUrl,
      });
    }

    appUserActions.setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    return { user };
  },
  component: Outlet,
});
