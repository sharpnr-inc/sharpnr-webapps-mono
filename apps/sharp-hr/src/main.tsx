import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import { Toaster } from "sonner";
import { TooltipProvider, ModalProvider, GlobalLoader, SheetProvider, ThemeProvider } from "@sharpnr/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="hr-app-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SheetProvider>
            <ModalProvider>
              <Suspense fallback={<GlobalLoader />}>
                <RouterProvider router={router} />
                <Toaster />
              </Suspense>
            </ModalProvider>
          </SheetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
