import { createRootRoute, Outlet } from "@tanstack/react-router";
import Aurora from "@/components/ui/aurora-backgound";

const RootLayout = () => (
  <main className="relative w-full bg-slate-950 text-slate-50 overflow-x-hidden">
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Aurora colorStops={["#0a0a0a", "#1e1b4b", "#0a0a0a"]} amplitude={1.2} />
    </div>
    <div className="relative z-10 w-full">
      <Outlet />
    </div>
  </main>
);

export const Route = createRootRoute({
  component: RootLayout,
});
