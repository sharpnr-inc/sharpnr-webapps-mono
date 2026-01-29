import { Link, Outlet } from "@tanstack/react-router";
import MainMenuButton from "../Header/MainMenuButton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DynamicIslandProvider } from "../ui/dynamic-island";
import { useSheet } from "@/context/DrawerContext";
interface UserRootLayoutProps {}

const UserRootLayout: React.FC<UserRootLayoutProps> = () => {
  const { openSheet} = useSheet();

  // TODO :..:..: Need To Create the Notification component
  // STUB API is needed to Fetch the user Notification
  const handleOpenNotification = () => {
    openSheet(<div>This is Notification</div>, "2/4");
  };

  return (
    <div className="relative">
      {/* Top Right Header Controls */}
      <div className="absolute right-4 top-4 z-40 flex items-center gap-3">
        <MainMenuButton />

        {/* 🔍 Search */}
        <Input placeholder="Search" className="h-10 w-56 rounded-full px-4" />

        {/* 🔔 Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full grid place-items-center relative"
          onClick={() => handleOpenNotification()}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 grid place-items-center cursor-pointer">
              <AvatarFallback className="text-xs font-medium">U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to="/">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => {
                // logout()
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Routed Content */}
      <DynamicIslandProvider>
        <Outlet />
      </DynamicIslandProvider>
    </div>
  );
};

export default UserRootLayout;
