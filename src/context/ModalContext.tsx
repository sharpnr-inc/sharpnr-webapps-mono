// src/context/ModalContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

type ModalType = "success" | "warning" | "error" | null;

interface ModalState {
  type: ModalType;
  message: string;
  title?: string;
  isOpen: boolean;
}

interface ModalContextProps {
  showModal: (type: ModalType, message: string, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({
    type: null,
    message: "",
    title: undefined,
    isOpen: false,
  });

  const showModal = (type: ModalType, message: string, title?: string) => {
    setModal({ type, message, title, isOpen: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Get icon and colors based on modal type
  const getModalConfig = () => {
    switch (modal.type) {
      case "success":
        return {
          icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
          title: modal.title || "Success",
          iconBg: "bg-green-100",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
          title: modal.title || "Warning",
          iconBg: "bg-yellow-100",
        };
      case "error":
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-600" />,
          title: modal.title || "Error",
          iconBg: "bg-red-100",
        };
      default:
        return {
          icon: null,
          title: modal.title || "Notification",
          iconBg: "bg-gray-100",
        };
    }
  };

  const config = getModalConfig();

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      
      <Dialog open={modal.isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {config.icon && (
                <div className={`p-2 rounded-full ${config.iconBg}`}>
                  {config.icon}
                </div>
              )}
              <DialogTitle className="text-xl">{config.title}</DialogTitle>
            </div>
            <DialogDescription className="pt-2 text-base">
              {modal.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant={modal.type === "error" ? "destructive" : "default"}
              onClick={closeModal}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};