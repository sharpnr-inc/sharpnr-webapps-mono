import { UserCard } from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { QuickAccess } from "./QuickAccess";

/** Binds this app's user store and logout mutation to the shared UserCard. */
export function AppUserCard() {
  const { user } = useAppUserStore();
  const isLoading = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending } = useLogout();

  return (
    <UserCard
      user={user}
      isLoading={isLoading}
      onLogout={() => logoutUser()}
      isLoggingOut={isPending}
      iamUrl={config.iamAppUrl}
      quickAccess={<QuickAccess />}
    />
  );
}
