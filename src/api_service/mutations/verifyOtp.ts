import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";
import { useToastService } from "@/context/ToastContext";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useMutation } from "@tanstack/react-query";
import { VerifyOtp, type OtpVerificactionResponseDTO } from "../apis/auth_api";
import type { VerifyOTPRequestPayload } from "@/schemas/Auth";

export function useVerifyOtpRegistration(){
      const toast = useToastService();
      const loader = useLoader();
      const modal = useModal();

      return useMutation<ApiResponse<OtpVerificactionResponseDTO>, unknown, VerifyOTPRequestPayload> ({
        mutationFn:(data)=>VerifyOtp(data),
        onMutate:()=>{
            loader.showLoader(); // Show loader immediately
        },

        onSuccess:()=>{
             loader.hideLoader(); // Hide loader
        },
        onError:()=>{
            loader.hideLoader(); // Hide loader
        }
      })
}