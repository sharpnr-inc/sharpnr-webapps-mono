import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import "@/middlewares/interceptor.ts";
import "@/middlewares/unauthorized.ts";
import { queryClient, router } from "./router_config";
import { SheetProvider } from "./hooks/useSheets";
import { Toaster } from "sonner";
import { DialogModalProvider } from "./hooks/useDialog";
import { FormsModalProvider } from "./hooks/useFormModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="iam-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SheetProvider>
          <FormsModalProvider>
            <DialogModalProvider>
              <RouterProvider router={router} />
            </DialogModalProvider>
          </FormsModalProvider>
          <Toaster />
        </SheetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
