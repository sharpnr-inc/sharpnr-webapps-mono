import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import { GlobalLoader } from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { setupProgressQuery } from "@/setup_wizard/api/queries";
import { resolveSetupWizardRedirect } from "@/setup_wizard/resolver/step_resolver";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are authenticating user" />
  ),
  beforeLoad: async ({ context, location }) => {
    // 1. Verify Authentication
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

    // 2. Keep the user on the step the backend says is current.
    // fetchQuery, not ensureQueryData: ensureQueryData returns the cached copy
    // even after a save has invalidated it, which bounced users back onto the
    // step they had just finished.
    const setupProgress =
      await context.queryClient.fetchQuery(setupProgressQuery);

    const resolved = resolveSetupWizardRedirect(setupProgress.data);
    const onWelcomePage =
      location.pathname.replace(/\/+$/, "") === "/setup_wizard";

    switch (resolved.type) {
      case "COMPLETED":
        throw redirect({ to: "/home" });

      case "UNRESOLVABLE":
        // No step to resume — the welcome page explains and offers a retry.
        if (!onWelcomePage) throw redirect({ to: "/setup_wizard" });
        return;

      case "NOT_STARTED":
      case "IN_PROGRESS": {
        // The welcome page is only shown before the first step is done.
        if (onWelcomePage && resolved.type === "NOT_STARTED") return;

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
    }
  },

  loader: async ({ context }) => {
    // This only runs if the user IS authenticated AND the setup IS NOT finished
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

    return { user };
  },
  component: Outlet,
});
