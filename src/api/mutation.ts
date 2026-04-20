import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/service";
import { appUserActions } from "@/store/AppUserStore";
import { config } from "@/configs/env";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      appUserActions.clearUser();
      window.location.href = config.iamAppUrl;
    },
  });
}
