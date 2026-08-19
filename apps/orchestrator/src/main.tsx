import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { queryClient, router } from "./router_config.tsx";
import { Toaster } from "sonner";
import {
  GlobalLoader,
  SheetProvider,
  ThemeProvider,
  TooltipProvider,
} from "@sharpnr/ui";
import { ModalProvider } from "./hooks/useModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ModalProvider>
            <SheetProvider>
              <Suspense fallback={<GlobalLoader />}>
                <RouterProvider router={router} />
                <Toaster />
              </Suspense>
            </SheetProvider>
          </ModalProvider>
        </ThemeProvider>
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
