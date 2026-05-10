import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCardStore } from "./user_card_store";
import { LogOut } from "lucide-react";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutations";

export function UserCard() {
  const { isOpen, setIsOpen } = useUserCardStore();
  const isLoading = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending } = useLogout();
  const { user } = useAppUserStore();

  // Derive initials only when user data is available and valid
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : null;
  const initials = (firstName[0] ?? "") + (lastName[0] ?? "") || null;

  // Show a skeleton trigger while the user is being fetched
  if (isLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded outline-none ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-85 active:scale-95">
          <Avatar className="h-9 w-9 border-2 border-border shadow-sm">
            {user?.email ? (
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}`}
                alt={fullName ?? "User avatar"}
              />
            ) : null}
            <AvatarFallback className="text-sm font-semibold">
              {initials ?? "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0 shadow-xl rounded-xl border border-border/60 overflow-hidden"
        align="end"
        sideOffset={8}
      >
        {/* ── Header ── */}
        <div className="relative bg-linear-to-br from-muted/60 to-muted px-5 pt-5 pb-4">
          <div className="flex items-center gap-3.5">
            <Avatar className="h-14 w-14 border-2 border-background shadow-md ring-2 ring-primary/20">
              {user?.email ? (
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}`}
                  alt={fullName ?? "User avatar"}
                />
              ) : null}
              <AvatarFallback className="text-lg font-bold">
                {initials ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-foreground truncate">
                {fullName ?? "—"}
              </span>

              <span className="text-xs text-muted-foreground truncate">
                {user?.email ?? "—"}
              </span>

              {user?.role ? (
                <Badge
                  variant="secondary"
                  className="mt-1.5 w-fit text-[10px] px-1.5 py-0 h-4 font-medium"
                >
                  {user.role}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="p-2 space-y-1">
          <button
            onClick={() => logoutUser()}
            disabled={isPending}
            className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            <span className="flex-1 text-left">
              {isPending ? "Logging out..." : "Log out"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
