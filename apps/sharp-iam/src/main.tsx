import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { SheetProvider, ThemeProvider } from "@sharpnr/ui";
import { queryClient, router } from "./router_config";
import { Toaster } from "sonner";
import { TooltipProvider } from "@sharpnr/ui";
import { ModalProvider } from "./hooks/useModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="iam-ui-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <SheetProvider>
            <ModalProvider>
              <RouterProvider router={router} />
              <Toaster />
            </ModalProvider>
          </SheetProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
