import { GetAuthenticatedUser, verifyUserAuthentication } from "@/api/service";
import AccountingRootLayout from "@/components/AccountingRootLayout";
import { config } from "@sharpnr/env";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  beforeLoad: async ({ context }) => {
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
  component: AccountingRootLayout,
});
