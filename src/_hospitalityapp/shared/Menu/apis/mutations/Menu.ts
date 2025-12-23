import {
  createAddOnInMenuItem,
  createCategoryInMenuGroup,
  createItemInMenu,
  createVariantInMenuItem,
} from "@/api_service/apis/Hospitality/Menu";
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

export function useMutationCreateItemInMenu() {
  return useMutation({
    mutationKey: ["hospitality", "Menu", "Create-Item"],
    mutationFn: createItemInMenu,
  });
}

export function useMutationCreateVariantInMenuItem() {
  return useMutation({
    mutationKey: ["hospitality", "Menu", "Create-variant"],
    mutationFn: createVariantInMenuItem,
  });
}

export function useMutationAddAddonsInMenu() {
  return useMutation({
    mutationKey: ["hospitality", "Menu", "Create-Addons"],
    mutationFn: createAddOnInMenuItem,
  });
}
