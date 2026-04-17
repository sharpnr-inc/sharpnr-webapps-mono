import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient, router } from "./router_config";
import { SheetProvider } from "./hooks/DrawerContext";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SheetProvider>
          <Suspense fallback={<SuspenseFallback />}>
            <RouterProvider router={router} />
            <Toaster />
          </Suspense>
        </SheetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>,
);
