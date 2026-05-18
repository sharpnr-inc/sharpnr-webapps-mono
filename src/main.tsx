import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { queryClient, router } from "./router_config.tsx";
import { AppVersionIdentifier } from "./components/custom/AppVersionIdentifier.tsx";
import { Toaster } from "sonner";
import {
  DialogModalProvider,
  FormsModalProvider,
  GlobalLoader,
  SheetProvider,
  ThemeProvider,
  TooltipProvider,
} from "@sharpnr/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppVersionIdentifier>
          <ThemeProvider>
            <FormsModalProvider>
              <SheetProvider>
                <DialogModalProvider>
                  <Suspense fallback={<GlobalLoader />}>
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
