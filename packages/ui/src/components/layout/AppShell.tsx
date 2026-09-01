import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";

export interface AppShellProps {
  /**
   * The app's own <Sidebar>…</Sidebar>. Nav content stays entirely with the
   * app -- this shell only owns the surrounding structure.
   */
  sidebar: ReactNode;
  /** Right-hand header cluster (launcher, notifications, user, theme). */
  headerActions?: ReactNode;
  /** Optional extra content beside the sidebar trigger, e.g. breadcrumbs. */
  headerLeft?: ReactNode;
  /** Routed page content. */
  children: ReactNode;
  headerClassName?: string;
  mainClassName?: string;
  /** Extra classes on the <SidebarInset> element. */
  insetClassName?: string;
  /** Whether the sidebar starts expanded. Defaults to true. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * The standard console layout: sidebar + inset with a fixed-height header and
 * a scrolling main area.
 *
 * Every app grew its own copy of this and they drifted -- differing header
 * heights, some hand-rolling flex wrappers instead of <SidebarInset>, and one
 * nesting <Sidebar> inside <Sidebar>. The structure is identical in intent
 * everywhere, so it lives here once and apps supply only what differs.
 */
export function AppShell({
  sidebar,
  headerActions,
  headerLeft,
  children,
  headerClassName,
  mainClassName,
  insetClassName,
  defaultOpen,
  className,
}: AppShellProps) {
  return (
    <SidebarProvider className={className} defaultOpen={defaultOpen}>
      {sidebar}

      <SidebarInset className={insetClassName}>
        <header
          className={cn(
            "flex h-12 shrink-0 items-center justify-between border-b px-4",
            headerClassName,
          )}
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            {headerLeft}
          </div>

          {headerActions ? (
            <div className="flex items-center gap-3">{headerActions}</div>
          ) : null}
        </header>

        {/* A div, not <main>: SidebarInset already renders the <main>
            landmark, and the old per-app layouts nested one inside the other. */}
        <div className={cn("flex-1 overflow-auto p-4", mainClassName)}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
