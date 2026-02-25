import { useMutation } from "@tanstack/react-query";
import { AddEmployeeInOrg } from "../api_funx";

type AddEmployeePayload = {
  name: string;
  email_address?: string;
  mobile: string;
  role: string;
};

export function useAddEmployeeMutation() {
  return useMutation({
    mutationKey: ["HR", "Employee", "Add"],
    mutationFn: async (payload: AddEmployeePayload) => {
      return await AddEmployeeInOrg(payload);
    },
  });
}
