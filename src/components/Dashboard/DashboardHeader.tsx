import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCog, Settings } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { useNavigate, useRouter } from "@tanstack/react-router";

interface DashboardHeaderProps {
  useremail: string;
  getGreeting: (email: string) => string;
}

export default function DashboardHeader({
  useremail,
  getGreeting,
}: DashboardHeaderProps) {
  const greeting = getGreeting(useremail);
  const { open, isMobile } = useSidebar();
  const nav = useNavigate();
  return (
    <header
      className={cn(
        "flex justify-between h-14 shrink-0 items-center gap-2 border-b fixed top-0 z-50  transition-[width,left] duration-200 ease-linear",
        {
          "left-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))]":
            open && !isMobile,
          "w-full left-0": !open || isMobile,
        }
      )}
    >
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
      </div>
      <p className="text-xs py-2 px-4 border rounded-2xl">{greeting}</p>

      <div className="pr-6 flex gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md p-1 hover:bg-neutral-800 transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                <AvatarFallback>
                  {useremail.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm">{useremail}</span>
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
        <ModeToggle></ModeToggle>
      </div>
    </header>
  );
}
