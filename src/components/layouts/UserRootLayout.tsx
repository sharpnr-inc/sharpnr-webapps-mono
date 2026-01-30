import { Outlet } from "@tanstack/react-router";
import MainMenuButton from "../Header/MainMenuButton";
import { Button } from "../ui/button";
import { Bell, Search } from "lucide-react";
import { DynamicIslandProvider } from "../ui/dynamic-island";
import { useSheet } from "@/context/DrawerContext";
import UserRootMenu from "@/app_user/components/UserRootMenu";
import { ModeToggle } from "../ui/ThemeToggle";
import { useState } from "react";
import { GlobalSearch } from "../custom/global-search";
interface UserRootLayoutProps {}

const UserRootLayout: React.FC<UserRootLayoutProps> = () => {
  const { openSheet } = useSheet();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // TODO :..:..: Need To Create the Notification component
  // STUB API is needed to Fetch the user Notification
  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <div className="relative">
      <GlobalSearch open={isSearchOpen} setOpen={setIsSearchOpen} />
      {/* Top Right Header Controls */}
      <header
        className="
    absolute right-4 top-4 z-40
    flex items-center gap-3
    p-2 rounded-full border
    backdrop-blur-md shadow-md
    bg-[linear-gradient(120deg,#0a2540,#561DD1,#0a2540,#272EF5)]
    bg-[length:300%_300%]
    animate-[gradient_20s_ease_infinite]
  "
      >
        <MainMenuButton />

        <SearchTrigger onClick={() => setIsSearchOpen(true)} />

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

const SearchTrigger = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-56 items-center gap-2 rounded-full border border-input bg-background px-4 text-sm text-muted-foreground transition-all hover:ring-2 hover:ring-primary/20 focus:outline-none"
    >
      <Search className="h-4 w-4" />
      <span className="flex-1 text-left">Search...</span>
      <kbd className="hidden items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
};
