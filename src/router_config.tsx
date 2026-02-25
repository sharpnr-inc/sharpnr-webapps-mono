import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import AnthropicLoader from "./components/shared_pages/anthropic_loader";
import NotFound from "./components/shared_pages/404Page";
// import {
//   hotelDetailMask,
//   propertyDetailsMask,
// } from "./lib/route_masking/Orchestrator_masking";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <AnthropicLoader />,
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
