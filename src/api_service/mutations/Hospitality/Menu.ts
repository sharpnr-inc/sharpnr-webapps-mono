import { createCategoryInMenuGroup } from "@/api_service/apis/Hospitality/Menu";
import { useMutation } from "@tanstack/react-query";
import { createSubCategoryINCategory } from "@/api_service/apis/Hospitality/Menu";

export function useMutateCreateCategory(){
    return useMutation({
        mutationKey:["Create Category", "Menu"],
        mutationFn:createCategoryInMenuGroup
    })
}



export function useMutateCreateSubCategory() {
  return useMutation({
    mutationKey: ["Create SubCategory"],
    mutationFn: createSubCategoryINCategory,
  });
}
