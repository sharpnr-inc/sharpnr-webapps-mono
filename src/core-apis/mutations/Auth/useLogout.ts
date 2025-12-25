import { Logout } from "@/core-apis/apis/Auth/auth_api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useLogoutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Logout"],
    mutationFn: Logout,
    onSuccess: () => {
      // Clear all cached auth-related data
      queryClient.clear();

      // Redirect to home/login
      navigate({ to: "/" });
    },
  });
}
