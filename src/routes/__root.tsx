import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"; // Use withContext
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <>
    <Outlet />
    {/* {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />} */}
  </>
);

// This is the change: call the function with your interface first
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
