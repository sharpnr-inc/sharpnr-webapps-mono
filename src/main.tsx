import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, router } from "./router_config";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { SheetProvider } from "./hooks/DrawerContext";
import { DialogModalProvider } from "./hooks/DialogModalContext";
import { ModalProvider } from "./hooks/ModalContext";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { FormsModalProvider } from "./hooks/FormModalContext";
import { ThemeProvider } from "./hooks/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="accounting-sharp-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <FormsModalProvider>
            <SheetProvider>
              <DialogModalProvider>
                <ModalProvider>
                  <Suspense fallback={<SuspenseFallback />}>
                    <RouterProvider router={router} />
                  </Suspense>
                </ModalProvider>
              </DialogModalProvider>
            </SheetProvider>
          </FormsModalProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
