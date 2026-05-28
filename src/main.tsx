import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import { Toaster } from "sonner";
import {
  GlobalLoader,
  SheetProvider,
  ThemeProvider,
  TooltipProvider,
} from "@sharpnr/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SheetProvider>
            <Suspense fallback={<GlobalLoader />}>
              <RouterProvider router={router} />
              <Toaster />
            </Suspense>
          </SheetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>,
);
