import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./hooks/ToastContext";
import { queryClient, router } from "./router_config";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { LoaderProvider } from "./hooks/LoaderContext";
import { SheetProvider } from "./hooks/DrawerContext";
import { DialogModalProvider } from "./hooks/DialogModalContext";
import { ModalProvider } from "./hooks/ModalContext";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { FormsModalProvider } from "./hooks/FormModalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FormsModalProvider>
        <ToastProvider>
          <LoaderProvider>
            <SheetProvider>
              <DialogModalProvider>
                <ModalProvider>
                  <Suspense fallback={<SuspenseFallback />}>
                    <RouterProvider router={router} />
                  </Suspense>
                </ModalProvider>
              </DialogModalProvider>
            </SheetProvider>
          </LoaderProvider>
        </ToastProvider>
      </FormsModalProvider>
    </QueryClientProvider>
  </StrictMode>,
);
