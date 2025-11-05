// hooks/useOrgUIRenderer.ts
import { useQuery } from "@tanstack/react-query";
import { GetOrgUIRenderer } from "../apis/auth_api";
// import type { UIRendererTree } from "@/dummy_data/ui_render_tree";

export function useOrgUIRenderer() {
  return useQuery({
    queryKey: ["org-ui-renderer"],
    queryFn: GetOrgUIRenderer,
    staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false, // UI config doesn't change often
  });
}
