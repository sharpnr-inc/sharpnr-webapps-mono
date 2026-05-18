// ANCHOR Orchestrator layout with collapsible icon sidebar
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  useSidebar,
} from "@sharpnr/ui";

import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Building2 } from "lucide-react";

import SharpnrLauncher from "@/components/SharpnrLauncher/SharpnrLauncher";
import { Button, ModeToggle, useSheet } from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import type { Variants, Transition } from "framer-motion";
import { UserCard } from "./header/UserCard";
import { SharpnrSidebarFooter } from "@sharpnr/ui";
import { useAppUserStore } from "@/store/AppUserStore";
import { orchestratorLinks } from "./AppSidebar";

/* =========================
   Animation Variants
========================= */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE } satisfies Transition,
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: EASE,
    } satisfies Transition,
  }),
};

/* =========================
   Small Components
========================= */

function HeaderItem({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeaderDivider() {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.25 }}
      className="mx-0.5 h-5 w-px bg-border/60 rounded-full self-center"
    />
  );
}

function NotificationBell({ onClick }: { onClick: () => void }) {
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);

      const timeout = setTimeout(() => {
        setPulse(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }, 8000);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-9 w-9 rounded-xl border border-transparent",
          "hover:border-border/60 hover:bg-accent/70",
        )}
        onClick={onClick}
      >
        <motion.div
          animate={pulse ? { rotate: [0, -18, 18, -12, 12, 0] } : {}}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <Bell className="h-4 w-4" />
        </motion.div>

        <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </Button>
    </motion.div>
  );
}

/* =========================
   Sidebar Shell
========================= */

function OrchestratorShell() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const { state } = useSidebar();
  const { user } = useAppUserStore();

  const isCollapsed = state === "collapsed";

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={user?.org_data.org_name}
              className="cursor-default hover:bg-transparent"
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
                whileHover={{ scale: 1.05 }}
              >
                <Building2 className="h-4 w-4" />
              </motion.div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="flex flex-col min-w-0"
                  >
                    <span className="truncate text-sm font-bold">
                      {user?.org_data.org_name}
                    </span>

                    <span className="truncate text-xs font-mono">
                      {user?.org_data.sharp_id}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Orchestrator</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {orchestratorLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      tooltip={item.tooltip}
                      isActive={
                        item.path ? isActive(item.path, item.exact) : false
                      }
                      asChild={!!item.path}
                    >
                      {item.path ? (
                        <Link to={item.path}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <>
                          <Icon />
                          <span>{item.label}</span>
                        </>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SharpnrSidebarFooter />
    </Sidebar>
  );
}

/* =========================
   Layout Content
========================= */

function ConsoleLayoutContent() {
  const { openSheet } = useSheet();

  const { location } = useRouterState();
  const pathname = location.pathname;

  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <>
      <OrchestratorShell />

      <SidebarInset>
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "sticky top-0 z-20",
            "flex h-14 items-center gap-1.5 px-3",
            "bg-background/80 backdrop-blur-md",
            "border-b border-border/50",
          )}
        >
          <HeaderItem index={0} className="flex items-center">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              {/* no manual toggle needed */}
              <SidebarTrigger />
            </motion.div>
          </HeaderItem>

          <HeaderDivider />

          <div className="flex items-center gap-3 px-6 py-1 rounded-2xl">
            <HeaderItem index={1}>
              <SharpnrLauncher />
            </HeaderItem>

            <HeaderItem index={2}>
              <HeaderDivider />
            </HeaderItem>

            <HeaderItem index={3}>
              <NotificationBell onClick={handleOpenNotification} />
            </HeaderItem>

            <HeaderItem index={4}>
              <UserCard />
            </HeaderItem>

            <HeaderItem index={5}>
              <ModeToggle />
            </HeaderItem>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.25,
              ease: EASE,
            }}
            className="p-2.5"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </SidebarInset>
    </>
  );
}

/* =========================
   Export
========================= */

export function ConsoleLayout() {
  return (
    <SidebarProvider defaultOpen>
      <ConsoleLayoutContent />
    </SidebarProvider>
  );
}
