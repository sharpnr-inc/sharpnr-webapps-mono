import Aurora from "@/components/ui/aurora-backgound";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"; // Use withContext
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <main className="relative min-h-screen w-full bg-slate-950 text-slate-50 overflow-x-hidden">
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Aurora colorStops={["#0a0a0a", "#1e1b4b", "#0a0a0a"]} amplitude={1.2} />
    </div>
    <div className="relative z-10 w-full">
      <Outlet />
    </div>
  </main>
);

// This is the change: call the function with your interface first
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
