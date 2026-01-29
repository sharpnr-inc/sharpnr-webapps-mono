import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Hotel,
  Beer, // Better icon for Bar
  UtensilsCrossed, // Better icon for Restaurant
  Settings2, // Better icon for Orchestrator
  Wallet,
  Megaphone, // Better icon for Marketing
  Users, // Better icon for HR
  type LucideIcon,
} from "lucide-react";
import sharpnrLogo from "../../../public/AppIcon.png";

// --- Types ---
interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  to: string;
  colorClass: string; // New: Specific color for the app tile
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

// --- Navigation Data Configuration ---
const APP_MODULES: NavSection[] = [
  // 1. Core Domain Modules
  {
    id: "domain_hospitality",
    title: "Hospitality",
    items: [
      {
        id: "hotel_index",
        label: "Hotel",
        icon: Hotel,
        to: "/dashboard/sharp_hospitality/hotel",
        colorClass: "bg-blue-500 text-white", // Blue for Hotel
      },
      {
        id: "hotel_bar",
        label: "Bar",
        icon: Beer,
        to: "/dashboard/sharp_hospitality/bar",
        colorClass: "bg-amber-500 text-white", // Amber/Gold for Bar
      },
      {
        id: "hotel_restaurant",
        label: "Restaurant",
        icon: UtensilsCrossed,
        to: "/dashboard/sharp_hospitality/restaurant",
        colorClass: "bg-orange-500 text-white", // Orange for Food
      },
      // Future: Kitchen (Red or similar)
    ],
  },

  // 2. Common Shared Services
  {
    id: "sharp_services",
    title: "Services",
    items: [
      {
        id: "hr_employee",
        label: "HR",
        icon: Users,
        to: "/dashboard/sharp_hr/",
        colorClass: "bg-rose-500 text-white", // Rose/Pink for People
      },
      {
        id: "acc_overview",
        label: "Accounting",
        icon: Wallet,
        to: "/dashboard/sharp_accounting",
        colorClass: "bg-emerald-600 text-white", // Green for Money
      },
      {
        id: "mkt_campaigns",
        label: "Marketing",
        icon: Megaphone,
        to: "/dashboard/sharp_marketing/",
        colorClass: "bg-purple-600 text-white", // Purple for Creative
      },
    ],
  },

  // 3. Admin / Configuration
  {
    id: "admin_console",
    title: "Admin",
    items: [
      {
        id: "org_config",
        label: "Orchestrator",
        icon: Settings2,
        to: "/orchestrator",
        colorClass: "bg-slate-800 text-white dark:bg-slate-700", // Dark/Neutral for Admin
      },
    ],
  },
];

// --- Main Component ---
export default function MainMenuButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Keyboard shortcut (Cmd+M or Ctrl+M)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isModifierPressed = isMac ? e.metaKey : e.ctrlKey;

      if (isModifierPressed && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full p-0 transition-transform hover:scale-105 hover:bg-transparent"
          aria-label="Open apps"
        >
          {/* Main Logo Trigger */}
          <img
            src={sharpnrLogo}
            alt="SharpNR"
            className="h-9 w-9 rounded-full object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-full rounded-2xl border-border/50 bg-background/95 p-3 shadow-2xl backdrop-blur-sm supports-[backdrop-filter]:bg-background/80"
        sideOffset={12}
      >
        <div className="">
          {APP_MODULES.map((section, index) => (
            <DropdownMenuGroup key={section.id} className="mb-1">
              {/* Section Header */}
              <DropdownMenuLabel className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                {section.title}
              </DropdownMenuLabel>

              {/* The App Grid */}
              <div className="grid grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.to)}
                    className="
                      group flex flex-col items-center justify-center gap-2 
                      rounded-xl py-3 px-1
                      transition-all duration-200
                      hover:bg-accent/60
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
                    "
                  >
                    {/* The "App Icon" Tile */}
                    <div
                      className={`
                        flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm
                        transition-transform duration-200 group-hover:scale-110 group-hover:shadow-md
                        ${item.colorClass}
                      `}
                    >
                      <item.icon className="h-6 w-6" strokeWidth={2} />
                    </div>

                    {/* App Label */}
                    <span className="text-[11px] font-medium leading-tight text-foreground/80 group-hover:text-foreground">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Separator between groups */}
              {index < APP_MODULES.length - 1 && (
                <DropdownMenuSeparator className="my-4 bg-border/40" />
              )}
            </DropdownMenuGroup>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}