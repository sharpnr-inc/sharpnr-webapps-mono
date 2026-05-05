import { Outlet, useRouteContext } from "@tanstack/react-router";
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
import { config } from "@/configs/env";

const RootLayout: React.FC = () => {
  const { openSheet } = useSheet();
  const { showSetupOverlay } = useRouteContext({ from: "/_user" });

  const handleOpenNotification = () => {
    openSheet(<>HI</>, "1/4");
  };
  return (
    <>
      {showSetupOverlay && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center ">
          <div className=" p-6 rounded-xl shadow-lg text-center max-w-md">
            <h2 className="text-lg font-bold mb-2">
              Your Org Setup is Not Complete
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Please complete the setup to continue using the platform.
            </p>

            <button
              className="px-4 py-2 bg-black rounded-md"
              onClick={() =>
                window.location.replace(
                  config.orchestratorAppUrl + "/setup_wizard",
                )
              }
            >
              Continue Setup
            </button>
          </div>
        </div>
      )}
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
    </>
  );
};

export default RootLayout;
