import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";
import { useToastService } from "@/context/ToastContext";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useMutation } from "@tanstack/react-query";
import { VerifyOtp, type OtpVerificationResponseDTO } from "../../apis/Auth/auth_api";
import type { VerifyOTPRequestPayload } from "@/schemas/Auth";
import { useNavigate } from "@tanstack/react-router";

export function useVerifyOtpRegistration() {
  const toast = useToastService();
  const loader = useLoader();
  const modal = useModal();
  const navigate = useNavigate(); // ✅ TanStack Router navigation

  return useMutation<
    ApiResponse<OtpVerificationResponseDTO>,
    unknown,
    VerifyOTPRequestPayload
  >({
    mutationFn: (data) => VerifyOtp(data),
    onMutate: () => {
      loader.showLoader();
    },
    onSuccess: (response) => {
      loader.hideLoader();

      if (response.error.isError) {
        // Handle API error response
        toast.error(response.error.message);
        modal.showModal("error", response.error.message, "Verification Failed");
      } else {
        // Handle successful verification
        toast.success(response.message || "Email verified successfully!");
        modal.showModal(
          "success",
          `Welcome ${response.data?.name}! Your email has been verified. You can now login to your account.`,
          "Verification Successful"
        );
        navigate({ to: "/signup/complete-registration" });
      }
    },
    onError: (error: any) => {
      loader.hideLoader();
      const errorMessage =
        error?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      modal.showModal(
        "error",
        "Network error occurred. Please check your connection and try again.",
        "Verification Error"
      );
      console.error("OTP Verification error:", error);
    },
  });
}
