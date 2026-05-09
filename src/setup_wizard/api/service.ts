import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type {
  AddPropertySetupRequestDTO,
  SetupProgressResponseDTO,
} from "./types";

/* ---------------------------------- <***> --------------------------------- */

/* -------------------------------------------------------------------------- */
/*                           SetUp Wiz API Endpoints                          */
/* -------------------------------------------------------------------------- */

export const SetupWizardAPIEndpoints = {
  GetOrganizationSetUpProgress: "/orchestrator/setup-wiz/progress",
  UpdateSuperAdminDetails: "/orchestrator/setup-wiz/v1/sasetup",
  AddPropertySetup: "/orchestrator/setup-wiz/v1/property_setup",
  AddLegalEntitySetup: "/orchestrator/setup-wiz/v1/legal-entity_setup",
};

/* ---------------------------------- <***> --------------------------------- */

export async function GetOrganizationSetUpProgress() {
  const response = await api.get<APIResponse<SetupProgressResponseDTO>>(
    SetupWizardAPIEndpoints.GetOrganizationSetUpProgress,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function UpdateSuperAdmin({}: AddPropertySetupRequestDTO) {
  const response = await api.post<APIResponse<any>>(
    SetupWizardAPIEndpoints.UpdateSuperAdminDetails,
    null,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function AddPropertySetup() {
  const response = await api.post<APIResponse<null>>(
    SetupWizardAPIEndpoints.AddPropertySetup,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function AddLegalEntity() {
  const response = await api.post<APIResponse<null>>(
    SetupWizardAPIEndpoints.AddLegalEntitySetup,
    null,
  );

  return response.data;
}
