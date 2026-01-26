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
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link } from "lucide-react";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Orchestrator</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/_appuser/orchestrator">Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/_appuser/orchestrator/setup-wizard">
                      Setup Wizard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        {/* <header className="flex h-14 items-center gap-2 border-b px-4">
         
          <span className="text-sm font-medium text-muted-foreground">
            Orchestrator
          </span>

        </header> */}

        <div className="p-4 ">
          <SidebarTrigger />
        </div>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// TODO Add the dashboard header and sidebar here this is the console before user load the console we check and redirect them to the setup wizard
