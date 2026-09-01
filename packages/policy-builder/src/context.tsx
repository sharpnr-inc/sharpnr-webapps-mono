import { createContext, useContext } from "react";

/** The live, generated Cedar policy — shared with every sub-component. */
export interface PolicyBuilderContextValue {
  text: string;
  valid: boolean;
  /** False while the Cedar engine loads; `valid` is unverified until then. */
  engineReady: boolean;
}

export const PolicyBuilderContext =
  createContext<PolicyBuilderContextValue | null>(null);

export function usePolicyBuilderContext(component: string) {
  const ctx = useContext(PolicyBuilderContext);
  if (!ctx) {
    throw new Error(
      `<PolicyBuilder.${component}> must be rendered inside <PolicyBuilder>.`,
    );
  }
  return ctx;
}
