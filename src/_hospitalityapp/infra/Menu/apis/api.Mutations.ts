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
    mutationKey: ["AddItemInMenu"],
    mutationFn: AddMenuItemInSubCategory,
  });
}

export function useAddVariantGroupMutation() {
  return useMutation({
    mutationKey: ["AddVariantGroup"],
    mutationFn: AddVariantGroup,
  });
}

export function useAddVariantsInVariantGroup() {
  return useMutation({
    mutationKey: ["ADD_VARIANTS"],
    mutationFn: AddVariantsInVariantGroup,
  });
}

export function useAddAddOnsOfMenuItem() {
  return useMutation({
    mutationKey: [""],
    mutationFn: AddAddon,
  });
}
