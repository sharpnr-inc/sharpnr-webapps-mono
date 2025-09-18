import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";

// 🔹 TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <LoaderProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </LoaderProvider>
      </ToastProvider>

      {/* 🔹 Show Devtools only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
