import { useMutation } from "@tanstack/react-query";
import { UpdateKitchenDetails } from "./api.service";

export function useUpdateKitchenGenralDetailsMutation() {
  return useMutation({
    mutationKey: ["Update", "General", "Details"],
    mutationFn: UpdateKitchenDetails,
  });
}
