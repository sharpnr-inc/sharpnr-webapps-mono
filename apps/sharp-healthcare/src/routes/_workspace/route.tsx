import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { cn } from "@sharpnr/ui";

const NAV = [
  { to: "/patients", label: "Patients" },
  { to: "/appointments", label: "Appointments" },
] as const;

function WorkspaceLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
          <Link to="/" className="font-semibold tracking-tight">
            Sharp Healthcare
          </Link>
          <nav className="flex gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
                activeProps={{ className: "bg-accent text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/_workspace")({
  component: WorkspaceLayout,
});
