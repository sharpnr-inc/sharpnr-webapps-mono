import { Outlet } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { IamSidebar } from "./IamSidebar";
import { ModeToggle } from "./ui/mode-toggle";

const IamRootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <IamSidebar />
        </Sidebar>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center px-4 gap-2 border-b">
            <SidebarTrigger />
            <ModeToggle />
            <span className="text-sm font-semibold">IAM</span>
          </header>

          <main className="flex-1 p-3">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default IamRootLayout;
