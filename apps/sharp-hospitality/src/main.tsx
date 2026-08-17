import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import { SheetProvider } from "./hooks/useSheet";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { FormsModalProvider } from "./hooks/FormModalContext";
import { ThemeProvider } from "./components/ui/theme-provider";
import PwaReloadPrompt from "./components/PwaReloadPrompt";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="hospitality-ui-theme">
        <TooltipProvider>
          <FormsModalProvider>
            <SheetProvider>
              <Suspense fallback={<SuspenseFallback />}>
                <RouterProvider router={router} />
                <Toaster />
                <PwaReloadPrompt />
              </Suspense>
            </SheetProvider>
          </FormsModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
