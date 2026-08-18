import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalLoader, Toaster } from "@sharpnr/ui";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, router } from "./router_config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<GlobalLoader />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
);
