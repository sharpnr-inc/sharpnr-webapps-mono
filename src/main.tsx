import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ModalProvider } from "./context/ModalContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";

// 🔹 TanStack Query
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuspenseFallback from "./components/ui/SuspenseFallback.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { SheetProvider } from "./context/DrawerContext.tsx";
import { DialogModalProvider } from "./context/DialogModalContext.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { FormsModalProvider } from "./context/FormModalContext.tsx";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { registerSW } from "virtual:pwa-register";
import { queryClient, router } from "./router_config.tsx";
import { AppVersionIdentifier } from "./components/custom/AppVersionIdentifier.tsx";
import { Toaster } from "sonner";

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
      <AppVersionIdentifier>
        <ThemeProvider>
          <FormsModalProvider>
            <LoaderProvider>
              <SheetProvider>
                <DialogModalProvider>
                  <ModalProvider>
                    <Suspense fallback={<SuspenseFallback />}>
                      <RouterProvider router={router} />
                      <Toaster />
                    </Suspense>
                  </ModalProvider>
                </DialogModalProvider>
              </SheetProvider>
            </LoaderProvider>
          </FormsModalProvider>
        </ThemeProvider>
      </AppVersionIdentifier>
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
