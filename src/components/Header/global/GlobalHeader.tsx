import { Link } from "@tanstack/react-router";
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
import { LayoutGrid, Building2, LogOut, User } from "lucide-react";

export function GlobalHeader() {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      {/* Left: Brand + App Switcher */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="font-semibold text-lg">
          Sharpnr
        </Link>

        {/* App Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Applications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to="/dashboard/sharp_accounting">Accounting</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/dashboard/sharp_hospitality/hotel">Hospitality</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/dashboard">HR</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Admin app (conditionally render in real app) */}
            <DropdownMenuItem asChild>
              <Link to="/orchestrator">Orchestrator</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Org + Profile */}
      <div className="flex items-center gap-3">
        {/* Organization */}
        <Button variant="outline" size="sm" className="gap-2">
          <Building2 className="h-4 w-4" />
          Demo Corp
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-8 w-8">
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to="/employee/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
