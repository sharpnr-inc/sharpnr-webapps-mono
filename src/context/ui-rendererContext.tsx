import { createContext, useContext, useMemo, type ReactNode } from "react";
import { ui_render, type UIRendererTree } from "@/dummy_data/ui_render_tree";

interface UIRendererContextType {
  renderTree: UIRendererTree;
  hasAccess: (module: string) => boolean;
}

const UIRendererContext = createContext<UIRendererContextType | undefined>(
  undefined
);

export function UIRendererProvider({ children }: { children: ReactNode }) {
  console.log("Api call")
  const value = useMemo(() => {
    const hasAccess = (module: string): boolean => {
      if (ui_render.main_menu_render_tree[module]) {
        return true;
      }

      const sharpModules = ui_render.main_menu_render_tree.sharp_modules_render_tree;
      if (sharpModules && sharpModules[module]) {
        return Object.keys(sharpModules[module]).length > 0;
      }

      return false;
    };

    return { renderTree: ui_render, hasAccess };
  }, []); // Empty deps = value never changes

  return (
    <UIRendererContext.Provider value={value}>
      {children}
    </UIRendererContext.Provider>
  );
}
//Hook
export function useUIRenderer() {
  const context = useContext(UIRendererContext);
  if (!context) {
    throw new Error("useUIRenderer must be used within UIRendererProvider");
  }
  return context;
}