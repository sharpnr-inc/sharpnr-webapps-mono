import { createContext, useContext } from "react";
import type { MenuOutput } from "./types";

interface CreateMenuContextType {
  Menus: MenuOutput[] | undefined;
  isMenuLoading: boolean;
  isMenuLoaded: boolean;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;

  ownersID: string;
  ownersType: string;
  propertyID?: string;
  owners_legal_entity_ID: string | null | undefined;
}

const CreateMenuContext = createContext<CreateMenuContextType | null>(null);

export const useCreateMenuCtx = () => {
  const ctx = useContext(CreateMenuContext);
  if (!ctx) throw new Error("Must be used inside <CreateMenu>");
  return ctx;
};

export default CreateMenuContext;
