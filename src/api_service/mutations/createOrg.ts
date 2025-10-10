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
import Cookies from "js-cookie";

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
      loader.showLoader();
    },

    onSuccess: (response) => {
      loader.hideLoader();

      if (response.error.isError) {
        toast.error(response.error.message);
        modal.showModal("error", response.error.message);
      } else {
        toast.success(response.message || "Registration successful!");

        // ✅ Save token in secure cookie
        if (response.token != "") {
          Cookies.set("_sharpnr_web_app_token_", response.token, {
            expires: 1,          // 1 day expiration
            secure: true,        // HTTPS only
            sameSite: "Strict",  // CSRF protection
          });
        }

        modal.showModal("success", `OTP sent to ${response.data?.email}`);
      }
    },

    onError: (error: any) => {
      loader.hideLoader();
      toast.error("Something went wrong. Please try again.");
      modal.showModal("error", "Network error occurred");
      console.error("Unexpected error:", error);
    },
  });
}
