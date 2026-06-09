import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { MDXProvider } from "@mdx-js/react";
import "@xyflow/react/dist/style.css";

// Create router instance
const router = createRouter({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MDXProvider>
      <RouterProvider router={router} />
    </MDXProvider>
  </StrictMode>,
);
