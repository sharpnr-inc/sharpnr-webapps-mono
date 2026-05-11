import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import { ConsoleLayout } from "@/components/ConsoleLayout";

import GlobalLoader from "@/components/ui/GlobalLoader";
import { config } from "@/configs/env";
import { GetOrganizationSetUpProgress } from "@/setup_wizard/api/service";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are authenticating user" />
  ),
  beforeLoad: async ({ context }) => {
    // This method verify the user is authenticated or not
    // before we need to verify the organization is configured or Not
    // If not then it must be route to the setup wizard
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
  },

  /* ------------------- In Loader We Fetch the User Details ------------------ */
  loader: async ({ context }) => {
    // Debugger for testing loaders
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
      org_data: user.org_data,
    });

    // This is the Method for fetching the Setup Progress
    const setup_progress = await context.queryClient.ensureQueryData({
      queryKey: ["setup-progress"],
      queryFn: GetOrganizationSetUpProgress,
    });

    if (!setup_progress.data?.is_completed) {
      throw redirect({
        to: "/setup_wizard",
      });
    }

    return { user };
  },

  component: ConsoleLayout,
});
