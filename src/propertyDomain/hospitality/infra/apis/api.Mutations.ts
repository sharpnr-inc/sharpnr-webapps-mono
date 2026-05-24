import { useMutation } from "@tanstack/react-query";
import {
  AddAddon,
  AddCategoryInMenu,
  AddMenuItemInSubCategory,
  AddPreferredKitchenToMenuCategory,
  AddPreferredKitchenToMenuGroup,
  AddPreferredKitchenToMenuItem,
  AddPreferredKitchenToMenuSubCategory,
  AddSubCategoryInCategory,
  AddTacCategoryOfMenuGroup,
  AddVariantGroup,
  AddVariantsInVariantGroup,
  CreateMenu,
} from "./api.service";

export function useCreateMenuMutation() {
  return useMutation({
    mutationFn: CreateMenu,
    mutationKey: ["Create Menu"],
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
    mutationKey: ["ADD", "ADDONS"],
    mutationFn: AddAddon,
  });
}

export function useAddPreferredKitchenToMenuGroupMutation() {
  return useMutation({
    mutationKey: ["ADD", "PREFERRED", "KITCHEN", "MENU_GROUP"],
    mutationFn: AddPreferredKitchenToMenuGroup,
  });
}

export function useAddPreferredKitchenToMenuCategoryMutation() {
  return useMutation({
    mutationKey: ["ADD", "PREFERRED", "KITCHEN", "MENU_CATEGORY"],
    mutationFn: AddPreferredKitchenToMenuCategory,
  });
}
export function useAddPreferredKitchenToMenuSubCategoryMutation() {
  return useMutation({
    mutationKey: ["ADD", "PREFERRED", "KITCHEN", "MENU_SUB_CATEGORY"],
    mutationFn: AddPreferredKitchenToMenuSubCategory,
  });
}
export function useAddPreferredKitchenToMenuItemMutation() {
  return useMutation({
    mutationKey: ["ADD", "PREFERRED", "KITCHEN", "MENU_ITEM"],
    mutationFn: AddPreferredKitchenToMenuItem,
  });
}

export function useAddTaxCategoryOfMenuGroup() {
  return useMutation({
    mutationKey: ["ADD_TAX_CATEGORIES", "MENU_GROUP"],
    mutationFn: AddTacCategoryOfMenuGroup,
  });
}
