import type { CompleteRegistrationForm } from "@/schemas/Auth";
import { useMutation } from "@tanstack/react-query";
import {
  CompleteOrgRegistration,
  type OrgCompleteRegistrationResponseDTO,
} from "../../apis/auth_api";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useToastService } from "@/context/ToastContext";
import { useLoader } from "@/context/LoaderContext";
import { useModal } from "@/context/ModalContext";
import { useNavigate } from "@tanstack/react-router";

export function useCompleteOrganization() {
  const toast = useToastService();
  const loader = useLoader();
  const modal = useModal();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<OrgCompleteRegistrationResponseDTO>,
    unknown,
    CompleteRegistrationForm
  >({
    mutationFn: (data) => CompleteOrgRegistration(data),
    onMutate: () => {
      loader.showLoader();
    },
    onSuccess(response) {
      if (response.error.isError) {
        toast.error(response.error.message);
        modal.showModal("error", response.error.message);
      } else {
        toast.success(response.message || "Registration successful!");
        localStorage.setItem("empid", response.data?.employee_Id || "")
      }
       navigate({ to: "/dashboard" });
    },

    onError: (error: any) => {
      loader.hideLoader();
      toast.error("Something went wrong. Please try again.");
      modal.showModal("error", "Network error occurred");
      console.error("Unexpected error:", error);
    },
  });
}
