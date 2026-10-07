import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import { GlobalLoader } from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { setupProgressQuery } from "@/setup_wizard/api/queries";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ConsoleLayout } from "@/components/rootLayout/ConsoleLayout";

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

    if (!authUser.success) {
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
      // location.href is path + search + hash (e.g. "/properties/42?tab=rooms").
      // Prefix the origin to get the absolute URL the user should return to.
      const returnTo = window.location.origin + location.href;

      throw redirect({
        href: `${config.authAppUrl}/?redirect_uri=${encodeURIComponent(returnTo)}`,
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
    // Same cache entry the wizard refreshes on every save — a separate key
    // here kept is_completed: false after setup finished, looping the user
    // between /home and /setup_wizard.
    const setup_progress =
      await context.queryClient.ensureQueryData(setupProgressQuery);

    if (!setup_progress.data?.is_completed) {
      throw redirect({
        to: "/setup_wizard",
      });
    }

    return { user };
  },

  component: ConsoleLayout,
});

// this is orchestrator console index user must be authenticated
