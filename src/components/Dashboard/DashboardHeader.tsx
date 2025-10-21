import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCog, Settings, BellIcon } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { useNavigate } from "@tanstack/react-router";
import { useHeader } from "@/context/HeaderContext";

interface DashboardHeaderProps {
  useremail: string;
  getGreeting: (email: string) => string;
}

export default function DashboardHeader({
  useremail,
  getGreeting,
}: DashboardHeaderProps) {
  const { heading, subheading, HeaderIcon } = useHeader();
  const { open, isMobile } = useSidebar();
  const nav = useNavigate();

  return (
    <header
      className={cn(
        "flex flex-wrap justify-between items-center h-auto min-h-16 shrink-0 gap-2 border-b fixed top-0 z-50  px-2 sm:px-4 transition-[width,left] duration-200 ease-linear",
        {
          "left-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))]":
            open && !isMobile,
          "w-full left-0": !open || isMobile,
        }
      )}
    >
      {/* Left Section */}
      <div className="flex items-center flex-1 min-w-0">
        <div className="flex gap-2 pr-1 sm:pr-3">
          <SidebarTrigger />
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted flex-shrink-0">
            <HeaderIcon className="w-5 h-5 text-blue-500" />
          </div>

          <div className="flex flex-col min-w-0">
            <h1 className="font-semibold text-sm sm:text-base truncate">
              {heading}
            </h1>
            {subheading && (
              <p className="text-xs text-muted-foreground truncate">
                {subheading}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-primary transition" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md p-1 transition hover:bg-muted">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback>
                  {useremail.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Hide email text on mobile */}
              <span className="hidden md:inline text-sm truncate max-w-[140px]">
                {useremail}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuItem
              onClick={() => nav({ to: "/dashboard/employee/profile" })}
              className="flex items-center gap-2"
            >
              <UserCog size={16} /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings size={16} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings size={16} /> Leaves & Attendance
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </header>
  );
}
