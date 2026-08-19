import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalLoader, Toaster } from "@sharpnr/ui";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, router } from "./router_config";
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IvaProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<GlobalLoader />}>
          <RouterProvider router={router} />
          <Toaster />
        </Suspense>
      </QueryClientProvider>
    </IvaProvider>
  </StrictMode>,
);
