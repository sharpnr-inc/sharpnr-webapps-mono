import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import AnthropicLoader from "./components/loaders/anthropic_loader";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPendingComponent:() => (<AnthropicLoader/>),
  defaultViewTransition:true,
  
  context: {
    queryClient:queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}