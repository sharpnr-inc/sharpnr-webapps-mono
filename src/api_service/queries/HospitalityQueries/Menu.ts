import type { HospitalityOrg_GetAllMenuGroup_Response } from "@/_hospitalityapp/schemas/types/restaurant/MenuTerminal.schema";
import {
  getAllMenuGroup,
  getMenuGroup,
  getVariantOfMenuItem,
} from "@/api_service/apis/Hospitality/Menu";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useQuery } from "@tanstack/react-query";

export function useMenuGroup() {
  return useQuery<ApiResponse<HospitalityOrg_GetAllMenuGroup_Response>>({
    queryKey: ["Menu", "Get-all"],
    queryFn: getAllMenuGroup,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useMenuGroupDetails(menuGroupId: string) {
  return useQuery<ApiResponse<any>>({
    queryKey: ["menu-group-details", menuGroupId],
    queryFn: () => getMenuGroup(menuGroupId),
    enabled: !!menuGroupId, // prevents running when id is empty
  });
}

export function useVariantOfMenuItem(id: string) {
  return useQuery({
    queryKey: ["hospitality", "Menu", "variant"],
    queryFn: () => getVariantOfMenuItem(id),
  });
}
