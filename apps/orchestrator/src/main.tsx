import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./router_config.tsx";
import { Toaster } from "sonner";
import {
  GlobalLoader,
  SheetProvider,
  ThemeProvider,
  TooltipProvider,
  ModalProvider,
} from "@sharpnr/ui";
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IvaProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <ModalProvider>
              <SheetProvider>
                <Suspense fallback={<GlobalLoader />}>
                  <RouterProvider router={router} />
                  <Toaster />
                </Suspense>
              </SheetProvider>
            </ModalProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </IvaProvider>
  </StrictMode>,
);
