// FormModalContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import ReactDOM from "react-dom";

interface FormModalState {
  heading: string;
  description: string;
  isOpen: boolean;
  component: ReactNode | null;
}

interface ModalContextProps {
  showModal: (heading: string, description: string, component: ReactNode) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useFormsModal = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormsModal must be used within a FormsModalProvider");
  }
  return context;
};

export const FormsModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<FormModalState>({
    heading: "",
    description: "",
    isOpen: false,
    component: null,
  });

  const showModal = (heading: string, description: string, component: ReactNode) => {
    setModalState({ heading, description, component, isOpen: true });
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = ""; // restore scroll
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalState.isOpen) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalState.isOpen]);

  // Render modal via portal for proper stacking
  const modalContent = modalState.isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={closeModal} // click outside to close
    >
      <div
        className="bg-card rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
      >
        {/* Close button */}
        <Button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full z-50"
        >
          <XCircleIcon className="w-6 h-6 text-gray-600" />
        </Button>

        {/* Optional heading/description */}
        {modalState.heading && (
          <h2 className="text-xl font-semibold mb-2">{modalState.heading}</h2>
        )}
        {modalState.description && (
          <p className="text-sm text-gray-500 mb-4">{modalState.description}</p>
        )}

        {/* Modal component */}
        {modalState.component}
      </div>
    </div>
  ) : null;

  return (
    <FormModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {typeof document !== "undefined"
        ? ReactDOM.createPortal(modalContent, document.body)
        : null}
    </FormModalContext.Provider>
  );
};
