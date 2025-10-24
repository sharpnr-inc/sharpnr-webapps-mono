import { createContext, useContext, useMemo, type ReactNode } from "react";
import { ui_render, type UIRendererTree } from "@/dummy_data/ui_render_tree";

interface UIRendererContextType {
  renderTree: UIRendererTree;
  hasModuleAccess: (module: string) => boolean;
  hasSectionAccess: (module: string, section: string) => boolean;
  hasSubSectionAccess: (module: string, section: string, subSection: string) => boolean;
}

const UIRendererContext = createContext<UIRendererContextType | undefined>(
  undefined
);

export function UIRendererProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    // Check if org has access to a main module (e.g., "sharp_hospitality")
    const hasModuleAccess = (module: string): boolean => {
      const moduleData = ui_render.main_menu_render_tree[module];
      if (!moduleData) return false;
      return moduleData.has_access === true;
    };

    // Check if org has access to a section within a module
    // e.g., hasModuleAccess("sharp_hospitality", "hotel")
    const hasSectionAccess = (module: string, section: string): boolean => {
      const moduleData = ui_render.main_menu_render_tree[module];
      if (!moduleData || !moduleData.has_access) return false;

      const sectionData = moduleData.sub_module_section?.[section];
      if (!sectionData) return false;

      return sectionData.has_access === true;
    };

    // Check if org has access to a sub-section
    // e.g., hasSubSectionAccess("sharp_hospitality", "hotel", "booking")
    const hasSubSectionAccess = (
      module: string,
      section: string,
      subSection: string
    ): boolean => {
      const moduleData = ui_render.main_menu_render_tree[module];
      if (!moduleData || !moduleData.has_access) return false;

      const sectionData = moduleData.sub_module_section?.[section];
      if (!sectionData || !sectionData.has_access) return false;

      const subSectionAccess = sectionData.sub_section_access?.[subSection];
      return subSectionAccess === true;
    };

    return {
      renderTree: ui_render,
      hasModuleAccess,
      hasSectionAccess,
      hasSubSectionAccess,
    };
  }, []);

  return (
    <UIRendererContext.Provider value={value}>
      {children}
    </UIRendererContext.Provider>
  );
}

// Hook
export function useUIRenderer() {
  const context = useContext(UIRendererContext);
  if (!context) {
    throw new Error("useUIRenderer must be used within UIRendererProvider");
  }
  return context;
}