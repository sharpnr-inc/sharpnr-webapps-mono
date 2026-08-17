import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// TanStack Start entry point — called once per request on the server
// and once on the client. Must be named getRouter.
export function getRouter() {
  return createRouter({ routeTree });
}

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
