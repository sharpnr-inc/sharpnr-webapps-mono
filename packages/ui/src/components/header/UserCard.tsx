import type { ReactNode } from "react";
import { LogOut, ExternalLink, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { useUserCardStore } from "./user_card_store";

/** The subset of the app user this card actually renders. */
export interface UserCardUser {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  role?: string | null;
}

export interface UserCardProps {
  user?: UserCardUser | null;
  /** Renders a skeleton trigger instead of the avatar while the user loads. */
  isLoading?: boolean;
  onLogout?: () => void;
  isLoggingOut?: boolean;
  /**
   * When provided, renders the "Go to SharpIAM" shortcut pointing here.
   * Omit inside SharpIAM itself, where the link would be a no-op.
   */
  iamUrl?: string;
  /**
   * Optional app-specific block rendered between the identity header and the
   * actions -- e.g. hospitality's Kitchen/Bar shortcuts.
   */
  quickAccess?: ReactNode;
}

export function UserCard({
  user,
  isLoading = false,
  onLogout,
  isLoggingOut = false,
  iamUrl,
  quickAccess,
}: UserCardProps) {
  const { isOpen, setIsOpen } = useUserCardStore();

  // Derive initials only when user data is available and valid
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : null;
  const initials = (firstName[0] ?? "") + (lastName[0] ?? "") || null;

  const avatarSrc = user?.email
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}`
    : null;

  // Show a skeleton trigger while the user is being fetched
  if (isLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded outline-none ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-85 active:scale-95">
          <Avatar className="h-9 w-9 border-2 border-border shadow-sm">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={fullName ?? "User avatar"} />
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
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={fullName ?? "User avatar"} />
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

        {/* ── Quick Access (app-supplied) ── */}
        {quickAccess ? (
          <>
            <Separator />
            <div className="p-2">
              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Quick Access
              </p>
              {quickAccess}
            </div>
            <Separator />
          </>
        ) : null}

        {/* ── Actions ── */}
        <div className="p-2 space-y-1">
          {iamUrl ? (
            <Button
              onClick={() => (window.location.href = iamUrl)}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2.5 h-9 font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 hover:text-primary transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              Go to SharpIAM
              <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
            </Button>
          ) : null}

          <button
            onClick={() => onLogout?.()}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            <span className="flex-1 text-left">
              {isLoggingOut ? "Logging out..." : "Log out"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
