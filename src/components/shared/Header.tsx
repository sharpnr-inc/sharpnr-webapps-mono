import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSheet } from "@/context/DrawerContext";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { openSheet } = useSheet();

  const handleOpenSheet = () => {
    openSheet(
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold">Sheet Content</h2>
        <p className="mt-2 text-sm text-gray-500">
          This content was passed from the Header component.
        </p>
        <p className="mt-4 text-sm font-medium">Size: 3/4 Width</p>
      </div>,
      "2/4" // size ("1/4" | "2/4" | "3/4")
    );
  };
  return (
    // 1. Ensure full-width, fixed position, and high Z-index.
    //    Added text-white for better contrast against the dark background.
    <header className=" h-16 border-b bg-[#021826] shadow-xl z-50 text-amber-100">
      <TooltipProvider>
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-4 h-full">
            {/* Sidebar Toggle Button (Only visible on small screens or used for collapse) */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Note: The sidebar is fixed-width in your _layout, so this button 
                  might be used to toggle a mobile sidebar or collapse the desktop one. 
                */}
                <Button
                  onClick={onToggleSidebar}
                  size="icon"
                  variant="outline"
                  className="bg-transparent hover:bg-gray-800 border-gray-700 text-amber-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Sidebar</p>
              </TooltipContent>
            </Tooltip>
            {/* Branding/Title */}
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="font-bold text-xl cursor-default text-teal-400 tracking-wider">
                  Dearie Bar & Clubs
                </h1>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dashboard Home</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={handleOpenSheet}
                >
                  Open Drawer
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open drawer</p>
              </TooltipContent>
            </Tooltip>

            {/* You could add a user avatar or notifications here */}
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
}
