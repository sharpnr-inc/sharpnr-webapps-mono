import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";
import { useToastService } from "@/context/ToastContext";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import type { LoginPayload } from "@/schemas/Auth";
import { useMutation } from "@tanstack/react-query";
import { Login, type OrgEmployeeData } from "../../apis/Auth/auth_api";

export function useLoginUser() {
  const toast = useToastService();
  const loader = useLoader();
  const modal = useModal();

  return useMutation<ApiResponse<OrgEmployeeData>, unknown, LoginPayload>({
    mutationFn: (data) => Login(data),

    onMutate: () => {
      loader.showLoader();
    },

    onSuccess: (response) => {
      loader.hideLoader();

      if (response.error.isError) {
        // Handle invalid credentials or API error
        toast.error(response.error.message || "Invalid credentials. Please try again.");
        modal.showModal(
          "error",
          response.error.message || "Please check your email or password.",
          "Login Failed"
        );
      } else {
        // Login success
        toast.success(response.message || "Login successful!");
        modal.showModal(
          "success",
          `Welcome back ${response.data?.EmployeeEmail || "User"}! You have successfully logged in.`,
          "Login Successful"
        );

        if (response.data) {
          // Optionally store user/org info
          localStorage.setItem(
            "_sharpnr_user_data_",
            JSON.stringify({
              OrgId: response.data.OrgId,
              OrgType: response.data.OrgType,
              EmployeeID: response.data.EmployeeID,
              EmployeeEmail: response.data.EmployeeEmail,
            })
          );
        }
      }
    },

    onError: (error: any) => {
      loader.hideLoader();
      const errorMessage =
        error?.message || "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      modal.showModal(
        "error",
        "Network error occurred. Please check your internet connection.",
        "Login Error"
      );
      console.error("Login error:", error);
    },
  });
}
