import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type { SetupProgressResponseDTO } from "./types";

export const SetupWizardAPIEndpoints = {
  GetOrganizationSetUpProgress: "/orchestrator/setup-wiz/progress",
  AddPropertySetup: "/orchestrator/setup-wiz/add-property",
};

export async function GetOrganizationSetUpProgress() {
  const response = await api.get<APIResponse<SetupProgressResponseDTO>>(
    SetupWizardAPIEndpoints.GetOrganizationSetUpProgress,
  );
  return response.data;
}

export async function AddPropertySetup() {
  const response = await api.post<APIResponse<null>>(
    SetupWizardAPIEndpoints.AddPropertySetup,
  );
  return response.data;
}
