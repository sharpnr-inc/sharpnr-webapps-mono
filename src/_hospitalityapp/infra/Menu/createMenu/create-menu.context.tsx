import type { MenuInterface } from "@/lib/create_menu";
import { createContext, useContext } from "react";

interface CreateMenuContextType {
  dummyMenuData: MenuInterface;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const CreateMenuContext = createContext<CreateMenuContextType | null>(null);

export const useCreateMenuCtx = () => {
  const ctx = useContext(CreateMenuContext);
  if (!ctx) throw new Error("Must be used inside <CreateMenu>");
  return ctx;
};

export default CreateMenuContext;
