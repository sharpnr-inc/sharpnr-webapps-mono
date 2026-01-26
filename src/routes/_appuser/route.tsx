import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import MainMenuButton from "@/components/Header/MainMenuButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";

// 👇 Cult UI Dynamic Island
import {
  DynamicIslandProvider,
} from "@/components/ui/dynamic-island";

export const Route = createFileRoute("/_appuser")({
  component: RootComponent,
});

function RootComponent() {
  return (

    <div className="relative min-h-screen">
      
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
              <Link to="/_appuser/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/_appuser/settings">
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
}
