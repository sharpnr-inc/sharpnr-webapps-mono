import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarVisible: boolean;
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-[#021826] shadow-sm z-50 flex items-center px-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h1 className="font-semibold cursor-default">
              Dearie Bar and Clubs
            </h1>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dashboard Home</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              // onClick={onToggleSidebar}
              size="icon"
              variant="outline"
              className="ml-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {/* <p>{isSidebarVisible ? "Hide sidebar" : "Show sidebar"}</p> */}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
}
