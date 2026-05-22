import api from "@/middlewares/axios";
import { LegalEntityEndpoints } from "./endpoints";
import type { APIResponse } from "@/lib/api_response";
import type {
  CreateLegalEntityPayload,
  LegalEntityBankAccountTypeResponse,
  LegalEntityDetails,
  LegalEntityIdentifierTypeResponse,
  LegalEntityResponseDto,
  LegalEntityTaxComponentTypeResponse,
  LegalEntityTaxTypeResponse,
  LegalEntityUtilResponse,
} from "./types";
import type {
  AddBankAccountInLegalEntityRequestDto,
  CreateLegalEntityContactsRequestDto,
} from "../utils/schemas";

/* -------------------------------------------------------------------------- */
/*                         Legal Entity General CRUD                         */
/* -------------------------------------------------------------------------- */

export async function listAllLegalEntityOfOrganization() {
  const response = await api.get<APIResponse<LegalEntityResponseDto[]>>(
    LegalEntityEndpoints.listallLegalEntity(),
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface LegalEntityDetailsRequestParams {
  legalEntityID: string;
}
export async function legalEntityDetails({
  legalEntityID,
}: LegalEntityDetailsRequestParams) {
  const response = await api.get<APIResponse<LegalEntityDetails>>(
    LegalEntityEndpoints.legalEntityDetails(legalEntityID),
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function createNewLegalEntity({
  payload,
}: CreateLegalEntityPayload) {
  const response = await api.post<APIResponse<null>>(
    LegalEntityEndpoints.createLegalEntity(),
    payload,
  );

  response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface addNewContactInLegalEntityPayload {
  legalEntityID: string;
  payload: CreateLegalEntityContactsRequestDto;
}
export async function addNewContactInLegalEntity({
  payload,
  legalEntityID,
}: addNewContactInLegalEntityPayload) {
  const response = await api.post(
    LegalEntityEndpoints.addContactsInLegalEntity(legalEntityID),
    payload,
  );

  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface addNewBankAccountDetailsINLegalEntityPayload {
  legalEntityID: string;
  payload: AddBankAccountInLegalEntityRequestDto;
}

export async function addNewBankAccountDetailsINLegalEntity({
  legalEntityID,
  payload,
}: addNewBankAccountDetailsINLegalEntityPayload) {
  const response = await api.post(
    LegalEntityEndpoints.addBankAccountsInLegalEntity(legalEntityID),
    payload,
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

export async function getLegalEntityTaxComponentTypes() {
  const response = await api.get<
    APIResponse<LegalEntityTaxComponentTypeResponse[]>
  >(LegalEntityEndpoints.utils.getLegalEntityTaxComponentTypes());
  return response.data.data;
}

export async function getLegalEntityBankAccountTypes() {
  const response = await api.get<
    APIResponse<LegalEntityBankAccountTypeResponse[]>
  >(LegalEntityEndpoints.utils.getLegalEntityBankAccountTypes());
  return response.data.data;
}

export async function getLegalEntityTaxTypes() {
  const response = await api.get<APIResponse<LegalEntityTaxTypeResponse[]>>(
    LegalEntityEndpoints.utils.getLegalEntityTaxTypes(),
  );
  return response.data.data;
}
