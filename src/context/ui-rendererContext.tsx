import { createContext, useContext, useMemo, type ReactNode } from "react";
import { type UIRendererTree } from "@/dummy_data/ui_render_tree";
import { useOrgUIRenderer } from "@/api_service/queries/Shared/useUtils";
import AnthropicLoader from "@/components/test/anthropic_loader";

interface UIRendererContextType {
  renderTree: UIRendererTree | null;
  hasModuleAccess: (module: string) => boolean;
  hasSectionAccess: (module: string, section: string) => boolean;
  hasSubSectionAccess: (
    module: string,
    section: string,
    subSection: string
  ) => boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const UIRendererContext = createContext<UIRendererContextType | undefined>(
  undefined
);

export function UIRendererProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error, refetch } = useOrgUIRenderer();
  console.log(data)
  const value = useMemo(() => {
    // Check if org has access to a main module (e.g., "sharp_hospitality")
    const hasModuleAccess = (module: string): boolean => {
      if (!data?.data) return false;
      const moduleData = data.data.main_menu_render_tree?.[module];
      if (!moduleData) return false;
      return moduleData.has_access === true;
    };

    // Check if org has access to a section within a module
    // e.g., hasSectionAccess("sharp_hospitality", "hotel")
    const hasSectionAccess = (module: string, section: string): boolean => {
      if (!data?.data) return false;
      const moduleData = data.data.main_menu_render_tree?.[module];
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
      if (!data?.data) return false;
      const moduleData = data.data.main_menu_render_tree?.[module];
      if (!moduleData || !moduleData.has_access) return false;

      const sectionData = moduleData.sub_module_section?.[section];
      if (!sectionData || !sectionData.has_access) return false;

      const subSectionAccess = sectionData.sub_section_access?.[subSection];
      return subSectionAccess === true;
    };

    return {
      renderTree: data?.data,
      hasModuleAccess,
      hasSectionAccess,
      hasSubSectionAccess,
      isLoading,
      error: error as Error | null,
      refetch,
    };
  }, [data, isLoading, error, refetch]); // ← FIXED: Added proper dependencies

  // Optional: Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load UI configuration</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <UIRendererContext.Provider value={value}>
      {children}
      {isLoading && <AnthropicLoader />}
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