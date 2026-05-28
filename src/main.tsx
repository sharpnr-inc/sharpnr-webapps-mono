import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { SheetProvider, ThemeProvider } from "@sharpnr/ui";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { queryClient, router } from "./router_config";
import { Toaster } from "sonner";
import { TooltipProvider } from "@sharpnr/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="iam-ui-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <SheetProvider>
            <RouterProvider router={router} />
            <Toaster />
          </SheetProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
