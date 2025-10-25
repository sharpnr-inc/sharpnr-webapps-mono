// FormModalContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
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
    throw new Error("useFormModal must be used within a FormModalProvider");
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
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <FormModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalState.isOpen && (
        <div className="fixed inset-12 flex items-center justify-center bg-card bg-opacity-20 backdrop-blur-80 z-50">
          {/* Close button */}
          <Button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full z-50"
          >
            <XCircleIcon className="w-6 h-6 text-gray-600" />
          </Button>

          {/* Modal content */}
          <div className="border border-white rounded-lg shadow-lg w-full h-[calc(100vh-6rem)] p-6 overflow-y-auto">
            {modalState.component}
          </div>
        </div>
      )}
    </FormModalContext.Provider>
  );
};
