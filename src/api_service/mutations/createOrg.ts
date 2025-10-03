import type { RegisterOrganizationRequestPayload } from "@/schemas/Auth";
import { useMutation } from "@tanstack/react-query";
import {
  InitiateOrgRegistration,
  type OrgSignupResponseDTO,
} from "../apis/auth_api";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useToastService } from "@/context/ToastContext";
import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";

export function useRegisterOrganization() {
  const toast = useToastService();
  const loader = useLoader();
  const modal = useModal();

  return useMutation<
    ApiResponse<OrgSignupResponseDTO>,
    unknown,
    RegisterOrganizationRequestPayload
  >({
    mutationFn: (data) => InitiateOrgRegistration(data),

    onMutate: () => {
      loader.showLoader(); // Show loader immediately
    },

    onSuccess: (response) => {
      loader.hideLoader(); // Hide loader

      if (response.error.isError) {
        toast.error(response.error.message); // Toast error
        modal.showModal("error", response.error.message); // Modal for testing
      } else {
        toast.success(response.data?.message || "Registration successful!");
        localStorage.setItem(
          "_sharpnr_web_app_token_",
          response?.data?.token || "" // ✅ store safely
        );
        modal.showModal("success", `OTP sent to ${response.data?.email}`); // Modal for testing
      }
    },

    onError: (error: any) => {
      loader.hideLoader(); // Hide loader
      toast.error("Something went wrong. Please try again.");
      modal.showModal("error", "Network error occurred"); // Modal for testing
      console.error("Unexpected error:", error);
    },
  });
}
