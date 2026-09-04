import { useMutation } from "@tanstack/react-query";
import { createOrgDepartment } from "./service";

export function useCreateOrgDepartment() {
  return useMutation({
    mutationFn: createOrgDepartment,
    mutationKey: ["createOrgDepartment"],
  });
}
