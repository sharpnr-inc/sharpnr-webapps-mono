import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  UserCog,
  Settings,
  BellIcon,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { useNavigate } from "@tanstack/react-router";
import { useHeader } from "@/context/HeaderContext";
import MainMenuButton from "@/components/Header/MainMenuButton";
import { Badge } from "@/components/ui/badge";
import { useLogoutMutation } from "@/core-apis/mutations/Auth/useLogout";

interface DashboardHeaderProps {
  useremail: string;
  notificationCount?: number;
  onLogout?: () => void;
}

export default function DashboardHeader({
  useremail,
  notificationCount = 0,
}: DashboardHeaderProps) {
  
  const { heading, subheading, HeaderIcon } = useHeader();
  const nav = useNavigate();
  const { mutate: logout, isPending } = useLogoutMutation();

  const getUserInitials = (email: string) => {
    const name = email.split("@")[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <header
      className={cn(
        " sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <MainMenuButton />

          <div className="hidden lg:block text-sm font-semibold text-muted-foreground whitespace-nowrap">
            Dearie Clubs PVT LTD
          </div>

          <div className="hidden sm:block h-6 w-px bg-border" />

          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {HeaderIcon && (
              <div className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 bg-primary/10">
                <HeaderIcon className="w-5 h-5 text-primary" />
              </div>
            )}

            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="font-semibold text-sm sm:text-base leading-tight truncate">
                {heading}
              </h1>
              {subheading && (
                <p className="text-xs leading-tight truncate text-muted-foreground">
                  {subheading}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="User menu"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" alt={useremail} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getUserInitials(useremail)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium truncate max-w-[140px]">
                  {useremail.split("@")[0]}
                </span>
                <ChevronDown className="hidden md:block w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" alt={useremail} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getUserInitials(useremail)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {useremail.split("@")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {useremail}
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => nav({ to: "/dashboard/employee/profile" })}
                className="cursor-pointer"
              >
                <UserCog className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Leaves & Attendance</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => logout()}
                disabled={isPending}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
