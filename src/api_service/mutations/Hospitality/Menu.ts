import { createCategoryInMenuGroup } from "@/api_service/apis/Hospitality/Menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubCategoryINCategory } from "@/api_service/apis/Hospitality/Menu";

export function useMutateCreateCategory(menuGroupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Create Category", "Menu"],
    mutationFn: createCategoryInMenuGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu-group-details", menuGroupId],
      });
    },
  });
}

export function useMutateCreateSubCategory(menuGroupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Create SubCategory"],
    mutationFn: createSubCategoryINCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu-group-details", menuGroupId],
      });
    },
  });
}
