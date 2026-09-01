import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { Toaster } from "sonner";
import { TooltipProvider, ModalProvider, SheetProvider } from "@sharpnr/ui";
import { ThemeProvider } from "@sharpnr/ui";
import PwaReloadPrompt from "./components/PwaReloadPrompt";
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IvaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="hospitality-ui-theme">
          <TooltipProvider>
            <ModalProvider>
              <SheetProvider>
                <Suspense fallback={<SuspenseFallback />}>
                  <RouterProvider router={router} />
                  <Toaster />
                  <PwaReloadPrompt />
                </Suspense>
              </SheetProvider>
            </ModalProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </IvaProvider>
  </StrictMode>,
);
