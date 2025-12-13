import type { Hospitality_ORG_GetAllMenuGroup_RESPONSE } from "@/_hospitalityapp/schemas/interfaces/menu/MenuGroup.dto";

import {
  getAllMenuGroup,
  getMenuGroup,
  getVariantOfMenuItem,
} from "@/api_service/apis/Hospitality/Menu";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useQuery } from "@tanstack/react-query";

export function useMenuGroup() {
  return useQuery<ApiResponse<Hospitality_ORG_GetAllMenuGroup_RESPONSE>>({
    queryKey: ["Menu", "Get-all"],
    queryFn: getAllMenuGroup,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useMenuGroupDetails(menuGroupId: string) {
  return useQuery<ApiResponse<any>>({
    queryKey: ["menu-group-details", menuGroupId],
    queryFn: () => getMenuGroup(menuGroupId),
    enabled: !!menuGroupId,
  });
  
}

export function useVariantOfMenuItem(id: string) {
  return useQuery({
    queryKey: ["hospitality", "Menu", "variant"],
    queryFn: () => getVariantOfMenuItem(id),
  });
}
