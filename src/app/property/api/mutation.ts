import { useMutation } from "@tanstack/react-query";
import { AddProperty } from "./service";

export function useCreatePropertyMutation() {
  return useMutation({
    mutationFn: AddProperty,
    mutationKey: ["AddProperty"],
  });
}
