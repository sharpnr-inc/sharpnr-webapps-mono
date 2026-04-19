// ANCHOR Orchestrator layout with collapsible icon sidebar
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  FileText,
  Home,
  ChevronsUpDown,
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
} from "lucide-react";
import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";
import SharpnrLauncher from "@/components/SharpnrLauncher/SharpnrLauncher";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { useSheet } from "@/hooks/DrawerContext";
import { cn } from "@/lib/utils";
import type { Variants, Transition } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  {
    label: "Storage",
    path: "/storage",
    icon: BoxesIcon,
    tooltip: "Storage",
  },
  {
    label: "Cables",
    path: "/cables",
    icon: Cable,
    tooltip: "Cables",
  },
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
    tooltip: "Descovro Integration",
  },
];

/* =========================
   Animation Variants
========================= */

// ✅ Fix: assert the cubic-bezier tuple type
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ✅ Fix: annotate explicitly as Variants — no function, use `custom` via motion prop
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE, // ✅ typed tuple, not number[]
    } satisfies Transition,
  },
};

// ✅ Fix: cast the whole object as Variants so TS accepts the resolver function
const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  // Framer Motion passes `custom` as the first arg to resolver functions
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: EASE, // ✅ typed tuple
    } satisfies Transition,
  }),
};
/* =========================
   Animated Header Items
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

/* =========================
   Notification Bell
========================= */

function NotificationBell({ onClick }: { onClick: () => void }) {
  const [pulse, setPulse] = React.useState(false);

  // Subtle ping every 8s to draw attention
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
          "relative h-9 w-9 rounded-xl",
          "border border-transparent",
          "hover:border-border/60 hover:bg-accent/70",
          "transition-colors duration-200",
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

        {/* Badge dot */}
        <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </Button>
    </motion.div>
  );
}

/* =========================
   Divider
========================= */

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
   Layout Component
========================= */

type OrchestratorLayoutProps = {
  children?: React.ReactNode;
};

export function ConsoleLayout({}: OrchestratorLayoutProps) {
  const { location } = useRouterState();
  const { openSheet } = useSheet();
  const pathname = location.pathname;

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* ===== Organization Card ===== */}
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="cursor-not-allowed data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium truncate">
                      Sharp Hospitality
                    </span>
                    <span className="text-xs">Organization</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 opacity-40" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>

          {/* ===== Orchestrator Menu ===== */}
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
        <SidebarFooter className="border-t p-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-md shrink-0">
              <Zap className="size-3" />
            </div>
            <p className="text-xs text-muted-foreground truncate group-data-[collapsible=icon]:hidden">
              Powered by{" "}
              <span className="font-semibold text-foreground">Sharpnr</span>
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* ===== Main Content ===== */}
      <SidebarInset>
        {/* ─── Animated Header ─── */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "sticky top-0 z-20",
            "flex h-14 items-center gap-1.5 px-3",
            /* Glassmorphism surface */
            "bg-background/80 backdrop-blur-md",
            /* Hairline bottom border */
            "border-b border-border/50",
            /* Smooth shadow */
            "shadow-[0_1px_8px_-2px_hsl(var(--foreground)/0.06)]",
          )}
        >
          {/* Sidebar Toggle */}
          <HeaderItem index={0} className="flex items-center">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <SidebarTrigger className="rounded-lg hover:bg-accent/70 transition-colors" />
            </motion.div>
          </HeaderItem>

          <HeaderDivider />

          {/* Breadcrumbs — grows to fill available space */}
          <HeaderItem index={1} className="flex-1 min-w-0">
            <RouteBreadcrumbs />
          </HeaderItem>

          {/* Right-side actions */}
          <div className="flex items-center gap-3 px-6 py-1 rounded-2xl">
            <HeaderItem index={2}>
              <SharpnrLauncher />
            </HeaderItem>

            <HeaderItem index={3}>
              <HeaderDivider />
            </HeaderItem>

            {/* Notification Bell */}
            <HeaderItem index={4}>
              <NotificationBell onClick={handleOpenNotification} />
            </HeaderItem>

            {/* Theme Toggle */}
            <HeaderItem index={5}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <ModeToggle />
              </motion.div>
            </HeaderItem>
            <HeaderItem index={6}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src="/avatars/user.png" alt="User avatar" />
                      <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </HeaderItem>
          </div>
        </motion.header>

        {/* ─── Page Content ─── */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="p-2.5"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  );
}
