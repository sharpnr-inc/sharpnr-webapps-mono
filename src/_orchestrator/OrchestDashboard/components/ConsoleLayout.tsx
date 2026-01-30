// ANCHOR Orchestrator layout with collapsible icon sidebar
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
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Link,
  Outlet,
  useNavigate,
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

type OrchestratorLayoutProps = {
  children?: React.ReactNode;
};

export function ConsoleLayout({ children }: OrchestratorLayoutProps) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname.startsWith(path);

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
                  {/* Icon */}
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium truncate">
                      Sharp Hospitality
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Organization
                    </span>
                  </div>

                  {/* Chevron (visual only) */}
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
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Organization"
                    asChild
                    isActive={isActive("/orchestrator")}
                  >
                    <Link to="/orchestrator">
                      <Home />
                      <span>Organization</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Properties"
                    asChild
                    isActive={isActive("/orchestrator/property")}
                  >
                    <Link to="/orchestrator/property">
                      <Boxes />
                      <span>Properties</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Legal Entity"
                    asChild
                    isActive={isActive("/orchestrator/legal_entity")}
                  >
                    <Link to="/orchestrator/legal_entity">
                      <FileText />
                      <span>Legal Entity</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Reports">
                    <FileText />
                    <span>Reports</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="User Directory">
                    <Users />
                    <span>User Directory</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
