import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";

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
          <SidebarGroup>
            <SidebarGroupLabel>Orchestrator</SidebarGroupLabel>
            <Card>
              
            </Card>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Organization</SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/orchestrator/property">Properties</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton className="text-amber-50">
                   <Link to="/orchestrator/legal_entity">Legal Entity</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>Setting</SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: "/" })}>
                    Organization
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>Reports</SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>User Directory</SidebarMenuButton>
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

        <main className="flex-1 p-4">{children ?? <Outlet />}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
