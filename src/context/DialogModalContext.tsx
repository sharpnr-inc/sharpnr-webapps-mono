import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Define the shape of the context
interface DialogModalContextType {
  openModal: (content: ReactNode, title?: string, description?: string) => void;
  closeModal: () => void;
}

// Create the context
const FormModalContext = createContext<DialogModalContextType | undefined>(undefined);

// Provider component
export const DialogModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalDescription, setModalDescription] = useState<string>("");

  const openModal = (content: ReactNode, title?: string, description?: string) => {
    setModalContent(content);
    if (title) setModalTitle(title);
    if (description) setModalDescription(description);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
    setModalDescription("");
  };

  return (
    <FormModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className=" overflow-y-auto rounded-2xl">
          <DialogHeader>
            {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
            {modalDescription && (
              <DialogDescription>{modalDescription}</DialogDescription>
            )}
          </DialogHeader>

          <div className="mt-4">{modalContent}</div>

          <DialogFooter>
            {/* You can include common footer buttons here if desired */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormModalContext.Provider>
  );
};

// Hook for consuming the context
export const useDialogModal = (): DialogModalContextType => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormModal must be used within a FormModalProvider");
  }
  return context;
};
