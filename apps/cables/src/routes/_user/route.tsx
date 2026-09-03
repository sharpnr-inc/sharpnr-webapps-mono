import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { GetAuthenticatedUser, verifyUserAuthentication } from "@/api/service";
import { cablesAccountStatusQuery, setupProgressQuery } from "@/api/queries";
import { appUserActions } from "@/store/userStore";
import { Sidebar } from "@/components/Sidebar";
import { CablesServiceUnavailable } from "@/components/CablesServiceUnavailable";

export const Route = createFileRoute("/_user")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are connecting you to Cables" />
  ),
  // in before load we first the verify authenticate the user if not then we send them auth.sharpnr.test(dev) from package/env
  // then we check the setup progress of the org, if it is setup is complete then we proceed
  // then we will check the Cables Account status is Org have started the service, if not we will tell to start from orchestrator
  // then we have last the is Cables Account is active is Yes then we proced to outlet, if not then we show the cables service is not active, please contact the admin.
  beforeLoad: async ({ context }) => {
    /* ── 1. Verify the session ─────────────────────────────────────────── */
    const authUser = await context.queryClient.ensureQueryData({
      queryKey: ["auth-user"],
      queryFn: verifyUserAuthentication,
      staleTime: 1000 * 60 * 5,
    });

    if (!authUser.success) {
      throw redirect({ href: config.authAppUrl });
    }

    /* ── 2. Pull the profile and put it in the store ───────────────────── */
    const userDetails = await context.queryClient.ensureQueryData({
      queryKey: ["user-details"],
      queryFn: GetAuthenticatedUser,
      staleTime: 1000 * 60 * 5,
    });

    const user = userDetails.data;

    if (!user) {
      // Send them back here once they've signed in.
      const returnTo = window.location.origin + location.href;

      throw redirect({
        href: `${config.authAppUrl}/?redirect_uri=${encodeURIComponent(returnTo)}`,
      });
    }

    appUserActions.setUser(user);

    /* ── 3. The org has to be fully set up before Cables is usable ─────── */
    const setupProgress =
      await context.queryClient.ensureQueryData(setupProgressQuery);

    if (!setupProgress.data?.is_completed) {
      // Setup only happens in the orchestrator, so there is nothing to show here.
      throw redirect({ href: config.orchestratorAppUrl });
    }

    /* ── 4. Read the org's Cables service state ────────────────────────── */
    // Not a redirect: the two blocked states are rendered by the layout below,
    // so the user gets an explanation instead of being bounced to another app.
    const cablesStatus = await context.queryClient.ensureQueryData(
      cablesAccountStatusQuery,
    );

    return {
      user,
      cablesStatus: cablesStatus.data,
    };
  },
  component: UserLayout,
});

function UserLayout() {
  const { cablesStatus } = Route.useRouteContext();

  // The org never started Cables — it can only be started from the orchestrator.
  if (!cablesStatus?.isStarted) {
    return <CablesServiceUnavailable reason="NOT_STARTED" />;
  }

  // Started, but switched off right now — an admin has to bring it back.
  if (!cablesStatus.isActive) {
    return <CablesServiceUnavailable reason="INACTIVE" />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
