import api from "@/middlewares/axios";
import { LegalEntityEndpoints } from "./endpoints";
import type { APIResponse } from "@/lib/api_response";
import type {
  LegalEntityIdentifierTypeResponse,
  LegalEntityListResponse,
  LegalEntityUtilResponse,
} from "./types";

export async function ListAllLegalEntityOfOrganization() {
  const response = await api.get<APIResponse<LegalEntityListResponse>>(
    LegalEntityEndpoints.listallLegalEntity(),
  );
  return response.data;
}

/* -------------------------------------------------------------------------- */
/*                         Legal Entity Utils Services                        */
/* -------------------------------------------------------------------------- */

export async function getLegalEntityTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.getLegalEntityTypes(),
  );
  return response.data.data;
}

export async function getGSTRegistrationTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.getGSTResgistrationTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityAddressTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.getLegalEntityAddressTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityLicenseTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.getLegalEntityLicenseTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityContactTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.getLegalEntityContactTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityIdentifierTypes() {
  const response = await api.get<
    APIResponse<LegalEntityIdentifierTypeResponse[]>
  >(LegalEntityEndpoints.utils.getLegalEntityIdentifierTypes());
  return response.data.data;
}
