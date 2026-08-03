import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"; // Use withContext

interface MyRouterContext {
  queryClient: QueryClient;
}

// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => (
  <div className="min-h-svh w-full overflow-x-hidden bg-background text-foreground">
    <Outlet />
  </div>
);

// This is the change: call the function with your interface first
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
