// ANCHOR This is the orchestrator's layout this component wraps the Orchestrator
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
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

type OrchestratorLayoutProps = {
  children?: React.ReactNode;
};

export function ConsoleLayout({ children }: OrchestratorLayoutProps) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar>
        <SidebarContent>
          {/* ===== Organization Card ===== */}
          <div className="p-2">
            <div
              onClick={() => navigate({ to: "/orchestrator" })}
              className="cursor-pointer rounded-lg border bg-card p-3 hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">
                    Sharp Hospitality
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Organization
                  </span>
                </div>
              </div>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>Orchestrator</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      Organization
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/orchestrator/property">
                      Properties
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/orchestrator/legal_entity">
                      Legal Entity
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: "/" })}>
                    Exit Console
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Reports
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    User Directory
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        <div className="p-4">
          <SidebarTrigger />
        </div>

        <main className="flex-1 p-4">
          {children ?? <Outlet />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
