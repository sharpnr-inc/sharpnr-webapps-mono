import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient, router } from "./router_config";
import { Toaster } from "sonner";
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IvaProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </IvaProvider>
  </StrictMode>,
);
