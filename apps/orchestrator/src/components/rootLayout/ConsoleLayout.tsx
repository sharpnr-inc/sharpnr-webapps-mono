// ANCHOR Orchestrator layout with collapsible icon sidebar
import { useSheet } from "@sharpnr/ui";
import { Outlet } from "@tanstack/react-router";
import {
  AppShell,
  ModeToggle,
  NotificationBell,
  SharpnrLauncher,
  UserCard,
} from "@sharpnr/ui";
import { OrchestratorShell } from "./AppSidebar";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/apis/mutation";
import { config } from "@sharpnr/env";
import { CablesWindow, STACKED_ABOVE_IVA } from "@sharpnr/cables-window";

function ConsoleLayoutContent() {
  const { openSheet } = useSheet();
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const handleOpen = () => {
    openSheet(
      <iframe
        src="https://docs.sharpnr.com/orchestrator"
        className="h-dvw w-full border-0"
      ></iframe>,
      "2/4",
    );
  };
  return (
    <AppShell
      sidebar={<OrchestratorShell />}
      // Orchestrator's header is sticky with a blurred backdrop; the shared
      // default is a plain bordered bar. Keeping the look here rather than
      // silently regressing it -- drop this prop to match the other apps.
      headerClassName="sticky top-0 z-20 h-14 gap-1.5 border-border/50 bg-background/80 px-3 backdrop-blur-md"
      headerActions={
        <>
          <SharpnrLauncher currentApp="orchestrator" />
          <NotificationBell onClick={() => handleOpen()} />
          <UserCard
            user={user}
            isLoading={isLoadingUser}
            onLogout={() => logoutUser()}
            isLoggingOut={isLoggingOut}
            iamUrl={config.iamAppUrl}
          />
          <ModeToggle />
        </>
      }
    >
      <Outlet />

      {/* Cables direct messages, docked. Renders nothing unless the org has
          cables live, so it is safe to mount unconditionally. Stacked above the
          IVA launcher, which owns the same corner. */}
      <CablesWindow bottom={STACKED_ABOVE_IVA} />
    </AppShell>
  );
}

/* =========================
   Export
========================= */

export function ConsoleLayout() {
  return <ConsoleLayoutContent />;
}
