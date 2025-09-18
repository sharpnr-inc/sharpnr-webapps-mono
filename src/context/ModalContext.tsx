// src/context/ModalContext.tsx
import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";

type ModalType = "success" | "warning" | "error" | null;

interface ModalState {
  type: ModalType;
  message: string;
  isOpen: boolean;
}

interface ModalContextProps {
  showModal: (type: ModalType, message: string) => void;
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
    isOpen: false,
  });

  const showModal = (type: ModalType, message: string) => {
    setModal({ type, message, isOpen: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {/* Global Modal UI */}
      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div
            className={`p-6 rounded-lg shadow-lg text-white ${
              modal.type === "success"
                ? "bg-green-500"
                : modal.type === "warning"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            <p>{modal.message}</p>
            <button
              className="mt-4 px-4 py-2 bg-white text-black rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
