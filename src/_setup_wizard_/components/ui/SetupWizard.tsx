import type React from "react";
import { createContext, useContext } from "react";
import { useParams } from "@tanstack/react-router";

type WizardContextType = {};

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within SetupWizard");
  }
  return context;
};

export function SetupWizardLayout({}: {
  status: any;
  children: React.ReactNode;
}) {
  const {} = useParams({ strict: false });

  return <div></div>;
}
