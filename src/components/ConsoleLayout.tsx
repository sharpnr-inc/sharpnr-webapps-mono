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
} from "@/components/ui/sidebar";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Building2 } from "lucide-react";
import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";
import SharpnrLauncher from "@/components/SharpnrLauncher/SharpnrLauncher";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { useSheet } from "@/hooks/useSheet";
import { cn } from "@/lib/utils";
import type { Variants, Transition } from "framer-motion";
import { UserCard } from "./header/UserCard";
import { SharpnrSidebarFooter } from "./ui/SharpnrSidebarFooter";
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
   Sub-Components
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

function NotificationBell({ onClick }: { onClick: () => void }) {
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-9 w-9 rounded-xl border border-transparent hover:border-border/60 hover:bg-accent/70 transition-colors duration-200",
        )}
        onClick={onClick}
        aria-label="Open notifications"
      >
        <motion.div
          animate={pulse ? { rotate: [0, -18, 18, -12, 12, 0] } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Bell className="h-[17px] w-[17px]" />
        </motion.div>
        <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </Button>
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

/* =========================
   Internal Layout Shell
========================= */

function OrchestratorShell() {
  const { location } = useRouterState();
  const { openSheet } = useSheet();
  const pathname = location.pathname;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useAppUserStore();

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="cursor-default hover:bg-transparent active:bg-transparent"
                tooltip={user?.org_data.org_name}
              >
                {/* Icon badge — always visible */}
                <motion.div
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {/* Subtle top-left sheen */}
                  <div className="pointer-events-none absolute inset-0" />
                  <Building2 className="h-4 w-4 relative z-10" />
                </motion.div>

                {/* Text block — animates out on collapse */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      key="org-text"
                      className="flex min-w-0 flex-col leading-tight"
                      initial={{ opacity: 0, x: -6, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, x: -6, width: 0 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.span
                        className="truncate text-sm  tracking-tight font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12, delay: 0.04 }}
                      >
                        {user?.org_data.org_name}
                      </motion.span>
                      <motion.span
                        className="truncate text-xs font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12, delay: 0.06 }}
                      >
                        {user?.org_data.sharp_id}
                      </motion.span>
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
                        asChild={!!item.path}
                        isActive={
                          item.path ? isActive(item.path, item.exact) : false
                        }
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

      <SidebarInset>
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "sticky top-0 z-20 flex h-14 items-center gap-1.5 px-3",
            "bg-background/80 backdrop-blur-md border-b border-border/50",
            "shadow-[0_1px_8px_-2px_hsl(var(--foreground)/0.06)]",
          )}
        >
          <HeaderItem index={0} className="flex items-center">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <SidebarTrigger className="rounded-lg hover:bg-accent/70 transition-colors" />
            </motion.div>
          </HeaderItem>

          <HeaderDivider />

          <HeaderItem index={1} className="flex-1 min-w-0">
            <RouteBreadcrumbs />
          </HeaderItem>

          <div className="flex items-center gap-3 px-6 py-1 rounded-2xl">
            <HeaderItem index={2}>
              <SharpnrLauncher />
            </HeaderItem>
            <HeaderItem index={3}>
              <HeaderDivider />
            </HeaderItem>
            <HeaderItem index={4}>
              <NotificationBell onClick={handleOpenNotification} />
            </HeaderItem>
            <HeaderItem index={5}>
              <UserCard />
            </HeaderItem>
            <HeaderItem index={6}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <ModeToggle />
              </motion.div>
            </HeaderItem>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
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
   Main Export
========================= */

export function ConsoleLayout() {
  return (
    <SidebarProvider>
      <OrchestratorShell />
    </SidebarProvider>
  );
}
