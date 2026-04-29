import { Outlet } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import SharpnrLauncher from "./header/SharpnrLauncher";
import { NotificationBell } from "./header/NotificationButton";
import { UserCard } from "./header/UserCard";
import { useSheet } from "@/hooks/useSheets";

const RootLayout: React.FC = () => {
  const { openSheet } = useSheet();

  const handleOpenNotification = () => {
    openSheet(<>HI</>, "1/4");
  };
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <AppSidebar />
        </Sidebar>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-12 items-center justify-between border-b px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
            </div>
            <div className="flex items-center gap-3 px-4">
              <SharpnrLauncher />
              <NotificationBell onClick={() => handleOpenNotification()} />
              <UserCard />
              <ModeToggle />
            </div>
          </header>

          <main className="flex-1 p-3">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
