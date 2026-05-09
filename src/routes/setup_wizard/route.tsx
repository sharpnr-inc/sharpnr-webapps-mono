import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import GlobalLoader from "@/components/ui/GlobalLoader";
import { config } from "@/configs/env";
import { GetOrganizationSetUpProgress } from "@/setup_wizard/api/service";
import { resolveSetupWizardRedirect } from "@/setup_wizard/resolver/step_resolver";
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

    if (setupProgress.data?.is_completed) {
      throw redirect({
        to: "/home",
      });
    }

    const resolved = resolveSetupWizardRedirect(setupProgress.data);

    switch (resolved.type) {
      case "COMPLETED":
        throw redirect({ to: "/home" });

      case "NOT_STARTED":
        return;

      case "IN_PROGRESS": {
        const resolvedPathname = resolved.target.to.replace(
          "$stepID",
          resolved.target.params.stepID,
        );
        if (!location.pathname.startsWith(resolvedPathname)) {
          throw redirect({
            to: resolved.target.to,
            params: resolved.target.params,
          });
        }
        return;
      }

      case "UNRESOLVABLE":
        return;
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

    // Fetch fresh setup progress for the loader data
    const setupProgress = await context.queryClient.ensureQueryData({
      queryKey: ["setup-progress"],
      queryFn: GetOrganizationSetUpProgress,
    });

    return { user, setupProgress: setupProgress.data };
  },
  component: Outlet,
});
