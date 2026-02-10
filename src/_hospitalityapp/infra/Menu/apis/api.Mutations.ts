import { useMutation } from "@tanstack/react-query";
import {
  AddAddon,
  AddCategoryInMenu,
  AddMenuItemInSubCategory,
  AddSubCategoryInCategory,
  AddVariantGroup,
  AddVariantsInVariantGroup,
  CreateMenu,
} from "./api.service";

export function useCreateMenuMutation() {
  return useMutation({
    mutationFn:CreateMenu,
    mutationKey:["Create Menu"]
  });
}

export function useAddCategoryInMenuMutation() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddCategoryInMenu,
  });
}

export function useAddSubCategoryInCategoryMutation() {
  return useMutation({
    mutationFn: AddSubCategoryInCategory,
    mutationKey: ["ADD_SUB_CATEGORY"],
  });
}

export function useAddMenuItemMutation() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddMenuItemInSubCategory,
  });
}

export function useAddVariantGroupMutation() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddVariantGroup,
  });
}

export function useAddVariantsInVariantGroup() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddVariantsInVariantGroup,
  });
}

export function useAddAddOnsOfMenuItem() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddAddon,
  });
}
