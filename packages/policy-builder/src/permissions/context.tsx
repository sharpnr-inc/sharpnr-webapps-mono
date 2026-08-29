import { createContext, useContext } from "react";
import type { ConditionPalette, ResourceDescriptor } from "./types";

export interface PermissionMatrixContextValue {
  /** Resources being rendered, already filtered by the toolbar's search. */
  catalog: ResourceDescriptor[];
  /** The full catalog, unfiltered — used for counts and the Cedar preview. */
  allResources: ResourceDescriptor[];
  /** Keys a restriction can be authored against. */
  palette: ConditionPalette;
  loading: boolean;
  /** True when the draft differs from what was loaded. */
  dirty: boolean;
  /** Number of ticked boxes, across the whole catalog. */
  grantedCount: number;
  /** Total number of boxes. */
  totalCount: number;
  query: string;
  setQuery: (q: string) => void;
  saving: boolean;
  onSave?: () => void;
}

export const PermissionMatrixContext =
  createContext<PermissionMatrixContextValue | null>(null);

export function usePermissionMatrixContext(component: string) {
  const ctx = useContext(PermissionMatrixContext);
  if (!ctx) {
    throw new Error(
      `<PermissionMatrix.${component}> must be rendered inside <PermissionMatrix>.`,
    );
  }
  return ctx;
}
