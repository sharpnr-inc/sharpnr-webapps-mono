import { useMutation } from "@tanstack/react-query";
import { createCostCenter } from "./service";

export function useCreateCostCenterMutation() {
  return useMutation({
    mutationFn: createCostCenter,
    mutationKey: ["createCostCenter"],
  });
}
