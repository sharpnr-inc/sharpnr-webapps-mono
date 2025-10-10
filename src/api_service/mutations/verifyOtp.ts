import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";
import { useToastService } from "@/context/ToastContext";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useMutation } from "@tanstack/react-query";
import { VerifyOtp, type OtpVerificactionResponseDTO } from "../apis/auth_api";
import type { VerifyOTPRequestPayload } from "@/schemas/Auth";

export function useVerifyOtpRegistration() {
  const toast = useToastService();
  const loader = useLoader();
  const modal = useModal();
  
  return useMutation<
    ApiResponse<OtpVerificactionResponseDTO>,
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
        
        // Store authentication data
        if (response.data) {
          // Store the authentication token
          localStorage.setItem("_sharpnr_auth_token_", response.token);
          
          // Optionally store user data for quick access
          localStorage.setItem("_sharpnr_user_data_", JSON.stringify({
            name: response.data.name,
            email: response.data.email,
            sharpnr_id: response.data.sharpnr_id,
            org_type: response.data.org_type
          }));
        }
        
        // Clear the temporary verification token
        localStorage.removeItem("_sharpnr_web_app_token_");
      }
    },
    onError: (error: any) => {
      loader.hideLoader();
      const errorMessage = error?.message || "Something went wrong. Please try again.";
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