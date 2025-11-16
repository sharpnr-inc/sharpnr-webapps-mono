"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircleIcon } from "lucide-react";

interface FormModalState {
  heading: string;
  description: string;
  isOpen: boolean;
  component: ReactNode | null;
}

interface ModalContextProps {
  showModal: (
    heading: string,
    description: string,
    component: ReactNode
  ) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const useFormsModal = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormsModal must be used within a FormsModalProvider");
  }
  return context;
};

export const FormsModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<FormModalState>({
    heading: "",
    description: "",
    isOpen: false,
    component: null,
  });

  const showModal = (
    heading: string,
    description: string,
    component: ReactNode
  ) => {
    setModalState({ heading, description, component, isOpen: true });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <FormModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      
      <DialogPrimitive.Root 
        open={modalState.isOpen} 
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
          
          {/* Content */}
          <DialogPrimitive.Content
            className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[90vw] max-h-[90vh] bg-background rounded-xl border-2 border-stone-700 flex flex-col overflow-hidden shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            onInteractOutside={closeModal}
          >
            {/* Close button */}
            <DialogPrimitive.Close
              className="absolute top-4 right-4 z-50 hover:opacity-70 transition-opacity hover:scale-110 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-stone-400"
              aria-label="Close modal"
            >
              <XCircleIcon className="w-6 h-6" />
            </DialogPrimitive.Close>

            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-stone-700 p-6">
              {modalState.heading && (
                <DialogPrimitive.Title className="text-2xl font-semibold mb-2">
                  {modalState.heading}
                </DialogPrimitive.Title>
              )}
              {modalState.description && (
                <DialogPrimitive.Description className="text-sm text-muted-foreground leading-relaxed">
                  {modalState.description}
                </DialogPrimitive.Description>
              )}
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-6">
              {modalState.component}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </FormModalContext.Provider>
  );
};