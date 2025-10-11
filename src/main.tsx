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
      <ToastProvider>
        <LoaderProvider>
          <ModalProvider>
            <SheetProvider>
              <Suspense fallback={<SuspenseFallback />}>
                <RouterProvider router={router} />
              </Suspense>
            </SheetProvider>
          </ModalProvider>
        </LoaderProvider>
      </ToastProvider>

      {/* 🔹 Show Devtools only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
