import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ModalProvider } from "./context/ModalContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";

// 🔹 TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuspenseFallback from "./components/ui/SuspenseFallback.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { SheetProvider } from "./context/DrawerContext.tsx";
import { FormModalProvider } from "./context/FormsModalContext.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Create a client instance
const queryClient = new QueryClient();
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <LoaderProvider>
            <FormModalProvider>
              <ModalProvider>
                <SheetProvider>
                  <Suspense fallback={<SuspenseFallback />}>
                    <RouterProvider router={router} />
                  </Suspense>
                </SheetProvider>
              </ModalProvider>
            </FormModalProvider>
          </LoaderProvider>
        </ToastProvider>
      </ThemeProvider>

      {/* 🔹 Show Devtools only in development */}
      {/* {import.meta.env.DEV && <ReactQueryDevtools buttonPosition="top-left" initialIsOpen={false} />} */}
    </QueryClientProvider>
  </StrictMode>
);
