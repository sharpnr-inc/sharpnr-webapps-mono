import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"; // Use withContext

interface MyRouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

// This is the change: call the function with your interface first
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
