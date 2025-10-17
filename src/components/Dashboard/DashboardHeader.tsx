import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
  return (
    <header
      className={cn(
        "flex justify-between h-14 shrink-0 items-center gap-2 border-b fixed top-0 z-50 bg-neutral-900 transition-[width,left] duration-200 ease-linear",
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
      <p className="text-xs pr-4">{greeting}</p>
    </header>
  );
}
