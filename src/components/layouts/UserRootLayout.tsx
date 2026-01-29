import { Outlet } from "@tanstack/react-router";
import MainMenuButton from "../Header/MainMenuButton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { DynamicIslandProvider } from "../ui/dynamic-island";
import { useSheet } from "@/context/DrawerContext";
import UserRootMenu from "@/app_user/components/UserRootMenu";
import { ModeToggle } from "../Dashboard/ThemeToggle";
interface UserRootLayoutProps {}

const UserRootLayout: React.FC<UserRootLayoutProps> = () => {
  const { openSheet } = useSheet();

  // TODO :..:..: Need To Create the Notification component
  // STUB API is needed to Fetch the user Notification
  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <div className="relative">
      {/* Top Right Header Controls */}
      <header
        className="
    absolute right-4 top-4 z-40
    flex items-center gap-3
    p-2 rounded-full border
    text-white
    backdrop-blur-md shadow-md
    bg-[linear-gradient(120deg,#0a2540,#ffffff,#0a2540,#14b8a6)]
    bg-[length:300%_300%]
    animate-[gradient_20s_ease_infinite]
  "
      >
        <MainMenuButton />

        {/* Search */}
        <label htmlFor="global-search" className="sr-only">
          Search
        </label>
        <Input
          id="global-search"
          type="search"
          placeholder="Search"
          className="h-10 w-56 rounded-full px-4"
        />

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full"
          onClick={handleOpenNotification}
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
            aria-label="You have unread notifications"
          />
        </Button>

        {/* User Menu */}
        <UserRootMenu />
        <ModeToggle />
      </header>

      {/* Routed Content */}
      <DynamicIslandProvider>
        <Outlet />
      </DynamicIslandProvider>
    </div>
  );
};

export default UserRootLayout;
