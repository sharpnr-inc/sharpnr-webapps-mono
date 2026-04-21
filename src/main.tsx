import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import { SheetProvider } from "./hooks/useSheet";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./hooks/theme-provider";
import { DialogModalProvider } from "./hooks/useDialog";
import { FormsModalProvider } from "./hooks/useFormModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="hr-app-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SheetProvider>
            <DialogModalProvider>
              <FormsModalProvider>
                <Suspense fallback={<SuspenseFallback />}>
                  <RouterProvider router={router} />
                  <Toaster />
                </Suspense>
              </FormsModalProvider>
            </DialogModalProvider>
          </SheetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
