// FormModalContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

import { XCircleIcon } from "lucide-react";
import ReactDOM from "react-dom";

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
  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-6"
  onClick={closeModal}
>
  <div
    className="relative w-full max-w-[90vw] max-h-[90vh] bg-background rounded-xl backdrop-blur-3xl border-2 border-stone-700 flex flex-col overflow-hidden"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close button */}
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 z-50 hover:opacity-70 transition-opacity hover:scale-120 cursor-pointer"
      aria-label="Close modal"
    >
      <XCircleIcon className="w-6 h-6 " />
    </button>

    {/* Sticky header */}
    <div className="sticky top-0 z-10 backdrop-blur-3xl border-b border-stone-700 p-4 ">
      {modalState.heading && (
        <h2 className="text-2xl font-semibold mb-2">
          {modalState.heading}
        </h2>
      )}
      {modalState.description && (
        <p className="text-sm  leading-relaxed">
          {modalState.description}
        </p>
      )}
    </div>

    {/* Scrollable content */}
    <div className="overflow-y-auto p-2 z-[9999]">
      {modalState.component}
    </div>
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
