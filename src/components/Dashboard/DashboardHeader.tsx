import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  useremail: string;
  getGreeting: (email: string) => string;
}

export default function DashboardHeader({
  useremail,
  getGreeting,
}: DashboardHeaderProps) {
  const greeting = getGreeting(useremail);
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b fixed top-0  w-full z-50 bg-neutral-900">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
      
      </div>
      <p className="text-xs">{greeting}</p>
    </header>
  );
}
