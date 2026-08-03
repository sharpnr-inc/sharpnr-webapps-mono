import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import NotFound from "./components/ui/404Page";
import GlobalLoader from "./components/ui/GlobalLoader";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <GlobalLoader />,
  defaultNotFoundComponent: () => <NotFound />,
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
