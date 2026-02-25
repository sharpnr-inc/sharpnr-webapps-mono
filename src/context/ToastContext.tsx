// src/context/ToastContext.tsx
import { createContext, useContext } from "react";
import { toast, Toaster } from "sonner";
import type { ReactNode } from "react";

interface ToastContextProps {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastService = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToastService must be used within ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const warning = (message: string) => toast.warning(message);
  const info = (message: string) => toast(message);

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      {/* This must be mounted once at root */}
      <Toaster richColors position="top-left" />
    </ToastContext.Provider>
  );
};
