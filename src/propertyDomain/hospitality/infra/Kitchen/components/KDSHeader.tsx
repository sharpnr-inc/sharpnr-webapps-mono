import { Power, Pause, Play, Printer, Settings2, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { useState } from "react";

export default function KDSHeader() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex w-full items-center gap-5 border-b pb-4">
      <div className="flex items-center gap-4">
        {/* Main KDS Controls Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl shadow-sm"
            >
              <Settings2 size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 rounded-2xl p-2 shadow-xl"
          >
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-50">
              Terminal Controls
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 py-2.5 rounded-lg cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play size={16} className="text-green-600" />
                  <span>Resume Terminal</span>
                </>
              ) : (
                <>
                  <Pause size={16} className="text-yellow-600" />
                  <span>Pause Incoming</span>
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 py-2.5 rounded-lg cursor-pointer">
              <Printer size={16} />
              <span>Print All Active</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 py-2.5 rounded-lg cursor-pointer">
              <History size={16} />
              <span>Recall Last Order</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2 py-2.5 rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer">
              <Power size={16} />
              <span>Shutdown Station</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight leading-none">
            KDS Terminal
          </h1>
          <span className="text-sm font-mono font-medium uppercase mt-1">
            Station: Main Kitchen
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isPaused && (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-600 gap-1 animate-pulse px-3"
          >
            <Pause size={10} fill="currentColor" /> PAUSED
          </Badge>
        )}
        <Badge
          variant="default"
          className=" gap-1.5 py-1 px-3 rounded-full border"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Live Feed
        </Badge>
      </div>
    </div>
  );
}
