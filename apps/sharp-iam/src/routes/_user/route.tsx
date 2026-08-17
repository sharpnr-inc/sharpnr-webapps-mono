import {
  GetAuthenticatedUser,
  GetOrganizationSetUpProgress,
  verifyUserAuthentication,
} from "@/api/api.service";
import RootLayout from "@/components/rootLayout/RootLayout";
import { config } from "@sharpnr/env";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  beforeLoad: async ({ context }) => {
    // 1. Verify auth
    const authUser = await context.queryClient.ensureQueryData({
      queryKey: ["auth-user"],
      queryFn: verifyUserAuthentication,
      staleTime: 1000 * 60 * 5,
    });

    if (!authUser.success) {
      throw redirect({
        href: config.iamAppUrl,
      });
    }

    // 2. Fetch user
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

    // 3. Store user globally
    appUserActions.setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      org_data: user.org_data,
    });

    // 4. Fetch setup progress
    const setupProgress = await context.queryClient.ensureQueryData({
      queryKey: ["setup-progress"],
      queryFn: GetOrganizationSetUpProgress,
    });

    const showSetupOverlay =
      !setupProgress.data?.is_completed && user.role === "SUPER_ADMIN";

    return {
      user,
      showSetupOverlay,
    };
  },

  component: RootLayout,
});
