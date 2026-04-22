import {
  GetAuthenticatedUser,
  verifyUserAuthentication,
} from "@/apis/api_service";
import { ConsoleLayout } from "@/components/ConsoleLayout";
import GlobalLoader from "@/components/ui/GlobalLoader";
import { config } from "@/configs/env";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are authenticating user" />
  ),
  beforeLoad: async ({ context }) => {
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
    await new Promise((resolve) => setTimeout(resolve, 5000));

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

  component: ConsoleLayout,
});
