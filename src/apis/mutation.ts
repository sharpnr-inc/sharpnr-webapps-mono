import { useMutation } from "@tanstack/react-query";
import { AddCustomerInOrg, logout } from "./api_service";
import { appUserActions } from "@/store/AppUserStore";
import { config } from "@/configs/env";

export function useAddCustomer() {
  return useMutation({
    mutationFn: AddCustomerInOrg,
    mutationKey: ["ADD", "CUSTOMER"],
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      appUserActions.clearUser();
      window.location.href = config.iamAppUrl;
    },
  });
}
