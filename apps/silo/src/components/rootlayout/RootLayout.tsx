import { Outlet } from "@tanstack/react-router";
import {
  AppShell,
  ModeToggle,
  NotificationBell,
  SharpnrLauncher,
  UserCard,
} from "@sharpnr/ui";
import { config } from "@sharpnr/env";

import { AppSidebar } from "./sidebar";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";

const RootLayout: React.FC = () => {
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  return (
    <AppShell
      sidebar={<AppSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="silo" />
          <NotificationBell onClick={() => {}} />
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
    </AppShell>
  );
};

export default RootLayout;
