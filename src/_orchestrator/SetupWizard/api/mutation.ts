import { useMutation } from "@tanstack/react-query";
import { AddOrgHQAddress, AddProperty } from "./apiservice";

// TODO --> Create type for the api response and the for the payload of API mutation data
export function useAddOrgHQMutation() {
  return useMutation({
    mutationKey: ["Setup-wiz", "step1"],
    mutationFn: AddOrgHQAddress,
  });
}
// TODO --> Create types 
export function useAddPropertyMutation() {
  return useMutation({
    mutationKey: ["setup-wiz", "step2"],
    mutationFn: AddProperty,
  });
}
