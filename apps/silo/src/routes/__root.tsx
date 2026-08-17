import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"; // Use withContext
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

// This is the change: call the function with your interface first
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />} */}
    </>
  ),
});
