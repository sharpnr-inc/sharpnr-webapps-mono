import type { APIResponse } from "@/lib/api_response";
import { api } from "@sharpnr/http";
import type {
  SetupProgressResponseDTO,
  SetupWizAddPropertyPayload,
  SuperAdminDetailspayload,
  UpdateOrganizationNamePayload,
} from "./types";

/* ---------------------------------- <***> --------------------------------- */

/* -------------------------------------------------------------------------- */
/*                           SetUp Wiz API Endpoints                          */
/* -------------------------------------------------------------------------- */

export const SetupWizardAPIEndpoints = {
  GetOrganizationSetUpProgress: "/orchestrator/setup-wiz/progress",
  UpdateSuperAdminDetails: "/orchestrator/setup-wiz/v1/sasetup",
  UpdateOrganizationName: "/orchestrator/setup-wiz/v1/org_details",
  AddPropertySetup: "/orchestrator/setup-wiz/v1/property_setup",
};

/* ---------------------------------- <***> --------------------------------- */

export async function GetOrganizationSetUpProgress() {
  const response = await api.get<APIResponse<SetupProgressResponseDTO>>(
    SetupWizardAPIEndpoints.GetOrganizationSetUpProgress,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function UpdateSuperAdmin({ payload }: SuperAdminDetailspayload) {
  const response = await api.post<APIResponse<unknown>>(
    SetupWizardAPIEndpoints.UpdateSuperAdminDetails,
    payload,
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

export async function UpdateOrgName({
  payload,
}: UpdateOrganizationNamePayload) {
  const response = await api.post<APIResponse<null>>(
    SetupWizardAPIEndpoints.UpdateOrganizationName,
    payload,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function SetupWizAddProperty({
  payload,
}: SetupWizAddPropertyPayload) {
  const response = await api.post<APIResponse<null>>(
    SetupWizardAPIEndpoints.AddPropertySetup,
    payload,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */
