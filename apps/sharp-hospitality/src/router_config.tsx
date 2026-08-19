import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import NotFound from "./components/ui/404Page";
import AppLauncher from "./components/header/AppLauncher";
// import {
//   hotelDetailMask,
//   propertyDetailsMask,
// } from "./lib/route_masking/Orchestrator_masking";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <AppLauncher />,
  defaultNotFoundComponent: () => <NotFound />,
  // routeMasks: [propertyDetailsMask, hotelDetailMask],
  defaultViewTransition: true,
  context: {
    queryClient: queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    breadcrumb?: string;
  }
}
