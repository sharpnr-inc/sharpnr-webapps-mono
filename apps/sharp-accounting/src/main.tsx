import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, router } from "./router_config";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { TooltipProvider, ModalProvider, ThemeProvider, SheetProvider } from "@sharpnr/ui";
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IvaProvider>
      <ThemeProvider storageKey="accounting-sharp-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SheetProvider>
              <ModalProvider>
                <Suspense fallback={<SuspenseFallback />}>
                  <RouterProvider router={router} />
                </Suspense>
              </ModalProvider>
            </SheetProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </IvaProvider>
  </StrictMode>,
);
