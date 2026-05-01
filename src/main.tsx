import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuspenseFallback from "./components/ui/SuspenseFallback.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { SheetProvider } from "./hooks/useSheet.tsx";
import { DialogModalProvider } from "./hooks/useDialog.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { FormsModalProvider } from "./hooks/useFormModal.tsx";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { registerSW } from "virtual:pwa-register";
import { queryClient, router } from "./router_config.tsx";
import { AppVersionIdentifier } from "./components/custom/AppVersionIdentifier.tsx";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

registerSW({
  onNeedRefresh() {
    console.log("New update available!");
    // updateSW(true); // auto-refresh
  },
  onOfflineReady() {
    console.log("App ready for offline use!");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppVersionIdentifier>
          <ThemeProvider>
            <FormsModalProvider>
              <SheetProvider>
                <DialogModalProvider>
                  <Suspense fallback={<SuspenseFallback />}>
                    <RouterProvider router={router} />
                    <Toaster />
                  </Suspense>
                </DialogModalProvider>
              </SheetProvider>
            </FormsModalProvider>
          </ThemeProvider>
        </AppVersionIdentifier>
      </TooltipProvider>
      <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />

      {/* 🔹 Show Devtools only in development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  </StrictMode>,
);
