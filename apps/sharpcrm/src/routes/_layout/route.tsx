import {
  GetAuthenticatedUser,
  GetOrganizationSetUpProgress,
  verifyUserAuthentication,
} from "@/api/api.service";
import RootLayout from "@/shared/RootLayout";
import { appUserActions } from "@/store/AppUserStore";
import { config } from "@sharpnr/env";
import { GlobalLoader } from "@sharpnr/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are authenticating user" />
  ),

  // Before load we check that the user is authenticated and that the org has
  // completed setup. An unauthenticated user is sent to the auth app; an org
  // that never finished onboarding is sent to the orchestrator's setup wizard.
  beforeLoad: async ({ context }) => {
    // 1. Verify auth
    const authUser = await context.queryClient.ensureQueryData({
      queryKey: ["auth-user"],
      queryFn: verifyUserAuthentication,
      staleTime: 1000 * 60 * 5,
    });

    if (!authUser.success) {
      throw redirect({ href: authRedirectUrl() });
    }

    // 2. Fetch user
    const userDetails = await context.queryClient.ensureQueryData({
      queryKey: ["user-details"],
      queryFn: GetAuthenticatedUser,
      staleTime: 1000 * 60 * 5,
    });

    const user = userDetails.data;

    if (!user) {
      throw redirect({ href: authRedirectUrl() });
    }

    // 3. Store user globally
    appUserActions.setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      org_data: user.org_data,
    });

    // 4. The org must have finished onboarding before it can use SharpCRM.
    // The wizard lives in the orchestrator, so send them there to finish it.
    const setupProgress = await context.queryClient.ensureQueryData({
      queryKey: ["setup-progress"],
      queryFn: GetOrganizationSetUpProgress,
    });

    if (!setupProgress.data?.is_completed) {
      throw redirect({
        href: `${config.orchestratorAppUrl}/setup_wizard`,
      });
    }

    return { user };
  },

  component: RootLayout,
});

/**
 * The auth app URL carrying the page the user was trying to reach, so they land
 * back here after signing in. sharp-auth honours `redirect_uri` only for
 * registered app origins, so the absolute URL is what it needs.
 */
function authRedirectUrl() {
  const returnTo = window.location.href;
  return `${config.authAppUrl}/?redirect_uri=${encodeURIComponent(returnTo)}`;
}
