// ANCHOR Orchestrator layout with collapsible icon sidebar
import * as React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@sharpnr/ui";
import { Outlet } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import SharpnrLauncher from "@/components/SharpnrLauncher/SharpnrLauncher";
import { Button, ModeToggle } from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import { UserCard } from "../header/UserCard";
import { OrchestratorShell } from "./AppSidebar";

function HeaderItem({
  children,
  className,
}: {
  children: React.ReactNode;
  index?: number; // kept for API compatibility, unused
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function NotificationBell({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative h-9 w-9 rounded-xl border border-transparent",
        "hover:border-border/60 hover:bg-accent/70",
      )}
      onClick={onClick}
    >
      <Bell className="h-4 w-4" />

      <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
    </Button>
  );
}

function ConsoleLayoutContent() {
  return (
    <>
      <OrchestratorShell />

      <SidebarInset>
        <header
          className={cn(
            "sticky top-0 z-20",
            "flex h-14 items-center justify-between gap-1.5 px-3",
            "bg-background/80 backdrop-blur-md",
            "border-b border-border/50",
          )}
        >
          <SidebarTrigger />

          <div className="flex items-center gap-3 px-6 py-1 rounded-2xl">
            <HeaderItem index={1}>
              <SharpnrLauncher />
            </HeaderItem>

            <HeaderItem index={3}>
              <NotificationBell onClick={() => console.log("")} />
            </HeaderItem>

            <HeaderItem index={4}>
              <UserCard />
            </HeaderItem>

            <HeaderItem index={5}>
              <ModeToggle />
            </HeaderItem>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}

/* =========================
   Export
========================= */

export function ConsoleLayout() {
  return (
    <SidebarProvider>
      <ConsoleLayoutContent />
    </SidebarProvider>
  );
}
