// ANCHOR Orchestrator layout with collapsible icon sidebar
import * as React from "react";
import {
  DropdownMenu,
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
} from "@/components/ui/sidebar";
import {
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  Building2,
  Boxes,
  Settings,
  FileText,
  Users,
  Home,
  ChevronsUpDown,
} from "lucide-react";

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
  {
    label: "Dashboard Home",
    path: "/orchestrator",
    icon: Home,
    tooltip: "Dashboard Home",
    exact: true,
  },
  {
    label: "Organization",
    path: "/orchestrator/organization",
    icon: Home,
    tooltip: "Organization",
    exact: true,
  },
  {
    label: "Properties",
    path: "/orchestrator/property",
    icon: Boxes,
    tooltip: "Properties",
    exact: false,
  },
  {
    label: "Legal Entity",
    path: "/orchestrator/legal_entity",
    icon: FileText,
    tooltip: "Legal Entity",
    exact: false,
  },
  {
    label: "Settings",
    path:"",
    icon: Settings,
    tooltip: "Settings",
  },
  {
    label: "Reports",
    path:"",
    icon: FileText,
    tooltip: "Reports",
  },
  {
    label: "User Directory",
    path:"/orchestrator/org-users",
    icon: Users,
    tooltip: "User Directory",
  },
];

/* =========================
   Layout Component
========================= */

type OrchestratorLayoutProps = {
  children?: React.ReactNode;
};

export function ConsoleLayout({ children }: OrchestratorLayoutProps) {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* ===== Organization Card ===== */}
          <div className="p-2 border rounded-xl">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="
                    cursor-not-allowed
                    data-[state=open]:bg-sidebar-accent
                    data-[state=open]:text-sidebar-accent-foreground
                  "
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium truncate">
                      Sharp Hospitality
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Organization
                    </span>
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
                          item.path
                            ? isActive(item.path, item.exact)
                            : false
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
      </Sidebar>

      {/* ===== Main Content ===== */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="text-sm font-semibold">Orchestrator</span>
        </header>

        <main className="p-4 mt-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
