import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  Badge,
  ModeToggle,
  NotificationBell,
  SharpnrLauncher,
  UserCard,
} from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { Bookmark, Store } from "lucide-react";

import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { useMarketplaceStore } from "@/store/MarketplaceStore";
import { CompareTray } from "@/marketplace/components/CompareTray";

/**
 * The marketplace shell.
 *
 * Deliberately a top nav rather than the sidebar the other Sharpnr apps use: a
 * sidebar frames a console you administer, and this is a storefront you browse.
 * Horizontal nav keeps the full width for listings, which is what people came
 * for.
 */

type MarketplaceNavItem = {
  label: string;
  to: NonNullable<LinkProps["to"]>;
};

const navItems: MarketplaceNavItem[] = [
  { label: "Browse", to: "/browse" },
  { label: "RFQs", to: "/rfqs" },
  { label: "Orders", to: "/orders" },
  { label: "Selling", to: "/selling" },
];

const MarketplaceLayout: React.FC = () => {
  const { location } = useRouterState();
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
  const savedCount = useMarketplaceStore((s) => s.savedIds.length);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <Link to="/browse" className="flex shrink-0 items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="size-4" />
            </div>
            <span className="hidden font-semibold tracking-tight sm:inline">
              Marketplace
            </span>
          </Link>

          <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/browse"
              search={{ saved: true }}
              className="relative hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Bookmark className="size-4" />
              Saved
              {savedCount > 0 && (
                <Badge variant="secondary" className="ml-0.5 px-1.5">
                  {savedCount}
                </Badge>
              )}
            </Link>

            <SharpnrLauncher currentApp="marketplace" />
            <NotificationBell onClick={() => {}} />
            <UserCard
              user={user}
              isLoading={isLoadingUser}
              onLogout={() => logoutUser()}
              isLoggingOut={isLoggingOut}
              iamUrl={config.iamAppUrl}
            />
            <ModeToggle />
          </div>
        </div>

        {/* The org you are trading as. In an O2O marketplace the counterparty
            needs to know who they are dealing with, so it stays on screen. */}
        <div className="border-t bg-muted/40">
          <div className="mx-auto flex h-8 max-w-7xl items-center gap-2 px-4 text-xs text-muted-foreground">
            <span>Trading as</span>
            <span className="font-medium text-foreground">
              {user?.org_data.org_name ?? "—"}
            </span>
            <span className="font-mono">{user?.org_data.sharp_id}</span>
            <Badge variant="secondary" className="ml-1">
              Verified
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <CompareTray />
    </div>
  );
};

export default MarketplaceLayout;
