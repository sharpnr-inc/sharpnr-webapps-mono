import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ModalProvider } from "./context/ModalContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";

// 🔹 TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SuspenseFallback from "./components/ui/SuspenseFallback.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { SheetProvider } from "./context/DrawerContext.tsx";
import { DialogModalProvider } from "./context/DialogModalContext.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { SpinnerProvider } from "./context/SpinnerContext.tsx";
import { FormsModalProvider } from "./context/FormModalContext.tsx";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { registerSW } from "virtual:pwa-register";
import { queryClient, router } from "./router_config.ts";

registerSW({
  onNeedRefresh() {
    console.log("New update available!");
    // updateSW(true); // auto-refresh
  },
  onOfflineReady() {
    console.log("App ready for offline use!");
  },
});


// // Create a client instance
// const queryClient = new QueryClient();
// export const router = createRouter({ routeTree, context: { queryClient } });

// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FormsModalProvider>
          <SpinnerProvider>
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
          </SpinnerProvider>
        </FormsModalProvider>
      </ThemeProvider>
      {/* <TanStackDevtools plugins={[FormDevtoolsPlugin()]} /> */}

      {/* 🔹 Show Devtools only in development */}
      {/* {import.meta.env.DEV && (
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
        />
      )} */}
    </QueryClientProvider>
  </StrictMode>,
);

