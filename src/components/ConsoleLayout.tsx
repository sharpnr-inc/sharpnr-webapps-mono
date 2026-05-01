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
import {
  FileText,
  Home,
  Origami,
  DollarSign,
  Users,
  BriefcaseBusiness,
  LucideShoppingBasket,
  ContainerIcon,
  Bell,
  Cable,
  BoxesIcon,
  Building2Icon,
  Globe2Icon,
  Verified,
  Globe,
  Zap,
  GalleryVerticalEnd,
} from "lucide-react";
import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";
import SharpnrLauncher from "@/components/SharpnrLauncher/SharpnrLauncher";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { useSheet } from "@/hooks/useSheet";
import { cn } from "@/lib/utils";
import type { Variants, Transition } from "framer-motion";
import { UserCard } from "./header/UserCard";
import { SharpnrSidebarFooter } from "./ui/SharpnrSidebarFooter";

/* =========================
   Sidebar Configuration
========================= */

type SidebarLink = {
  label: string;
  path?: string;
  icon: React.ElementType;
  tooltip?: string;
  exact?: boolean;
};

const orchestratorLinks: SidebarLink[] = [
  { label: "Home", path: "/home", icon: Origami, tooltip: "Home", exact: true },
  {
    label: "Organization",
    path: "/organization",
    icon: Home,
    tooltip: "Organization",
    exact: true,
  },
  {
    label: "Properties",
    path: "/property",
    icon: Building2Icon,
    tooltip: "Properties",
    exact: false,
  },
  {
    label: "Legal Entity",
    path: "/legal_entity",
    icon: BriefcaseBusiness,
    tooltip: "Legal Entity",
    exact: false,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: DollarSign,
    tooltip: "Payments",
  },
  {
    label: "Inventories",
    path: "/inventory-acc",
    icon: LucideShoppingBasket,
    tooltip: "Inventories",
  },
  {
    label: "Suppliers & Vendors",
    path: "/suppliers&Vendors",
    icon: ContainerIcon,
    tooltip: "Suppliers & Vendors",
  },
  {
    label: "User Directory",
    path: "/org-users",
    icon: Users,
    tooltip: "User Directory",
  },
  {
    label: "Audit Logs",
    path: "/audit-log",
    icon: Verified,
    tooltip: "Audit Logs",
  },
  { label: "Storage", path: "/storage", icon: BoxesIcon, tooltip: "Storage" },
  { label: "Cables", path: "/cables", icon: Cable, tooltip: "Cables" },
  {
    label: "Docs & Office",
    path: "/docs_office",
    icon: FileText,
    tooltip: "Docs & Office",
  },
  {
    label: "Descovro Integration",
    path: "/",
    icon: Globe2Icon,
    tooltip: "Descovro Integration",
  },
  {
    label: "Sharp Marketplace",
    path: "/",
    icon: Globe,
    tooltip: "Sharp Marketplace",
  },
];

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
        <SidebarHeader className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <motion.div
                layout
                initial={false}
                className="flex items-center gap-3 rounded-lg  p-2"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-1 flex-col overflow-hidden text-left"
                    >
                      <span className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-50">
                        Sharpnr Engine
                      </span>
                      <span className="truncate text-[10px] uppercase tracking-wider text-zinc-500">
                        Orchestration v1.0
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
