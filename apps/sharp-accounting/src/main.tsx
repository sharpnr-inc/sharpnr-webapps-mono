import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, router } from "./router_config";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider, SheetProvider } from "@sharpnr/ui";
import { ModalProvider } from "./hooks/useModal";
import { FormsModalProvider } from "./hooks/FormModalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="accounting-sharp-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SheetProvider>
            <ModalProvider>
              <FormsModalProvider>
                <Suspense fallback={<SuspenseFallback />}>
                  <RouterProvider router={router} />
                </Suspense>
              </FormsModalProvider>
            </ModalProvider>
          </SheetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
