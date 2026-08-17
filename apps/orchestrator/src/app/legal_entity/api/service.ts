import { api } from "@sharpnr/http";
import { LegalEntityEndpoints } from "./endpoints";
import type { APIResponse } from "@/lib/api_response";
import type {
  CreateLegalEntityAddressRequest,
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
  AddIdentifiersInLegalEntityRequestDto,
  AddNewLicenseAndComplianceRequestDto,
  AddNewTaxRegistrationInLegalEntityRequestDto,
  CreateLegalEntityContactsRequestDto,
} from "../utils/schemas";

/* -------------------------------------------------------------------------- */
/*                         Legal Entity General CRUD                         */
/* -------------------------------------------------------------------------- */

export async function listAllLegalEntityOfOrganization() {
  const response = await api.get<APIResponse<LegalEntityResponseDto[]>>(
    LegalEntityEndpoints.list(),
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
    LegalEntityEndpoints.details(legalEntityID),
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function createNewLegalEntity({
  payload,
}: CreateLegalEntityPayload) {
  const response = await api.post<APIResponse<null>>(
    LegalEntityEndpoints.create(),
    payload,
  );
  return response.data;
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
    LegalEntityEndpoints.contacts.create(legalEntityID),
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
  const response = await api.post<APIResponse<null>>(
    LegalEntityEndpoints.bankAccounts.create(legalEntityID),
    payload,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface addNewAddressesInLegalEntityPayload {
  legalEntityID: string;
  payload: CreateLegalEntityAddressRequest;
}
export async function addNewAddressLegalEntity({
  legalEntityID,
  payload,
}: addNewAddressesInLegalEntityPayload) {
  const response = await api.post<APIResponse<null>>(
    LegalEntityEndpoints.addresses.create(legalEntityID),
    payload,
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface addNewIdentifierInLegalEntityPayload {
  legalEntityID: string;
  payload: AddIdentifiersInLegalEntityRequestDto;
}

export async function addNewIdentifierInLegalEntity({
  legalEntityID,
  payload,
}: addNewIdentifierInLegalEntityPayload) {
  const response = await api.post(
    LegalEntityEndpoints.identities.create(legalEntityID),
    payload,
  );

  return response.data;
}
/* ---------------------------------- <***> --------------------------------- */

interface addNewLicenseOrComplianceInLegalEntityPayload {
  legalEntityID: string;
  payload: AddNewLicenseAndComplianceRequestDto;
}

export async function addNewLicenseOrComplianceInLegalEntity({
  legalEntityID,
  payload,
}: addNewLicenseOrComplianceInLegalEntityPayload) {
  const response = await api.post(
    LegalEntityEndpoints.licenses.create(legalEntityID),
    payload,
  );

  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface addNewTaxRegistrationInLegalEntityPayload {
  legalEntityID: string;
  payload: AddNewTaxRegistrationInLegalEntityRequestDto;
}

export async function addNewTaxRegistrationInLegalEntity({
  legalEntityID,
  payload,
}: addNewTaxRegistrationInLegalEntityPayload) {
  const response = await api.post(
    LegalEntityEndpoints.taxRegistrations.create(legalEntityID),
    payload,
  );

  return response.data;
}

/* -------------------------------------------------------------------------- */
/*                         Legal Entity Utils Services                        */
/* -------------------------------------------------------------------------- */

export async function getLegalEntityTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.entityTypes(),
  );
  return response.data.data;
}

export async function getGSTRegistrationTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.gstTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityAddressTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.addressTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityLicenseTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.licenseTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityContactTypes() {
  const response = await api.get<APIResponse<LegalEntityUtilResponse[]>>(
    LegalEntityEndpoints.utils.contactTypes(),
  );
  return response.data.data;
}

export async function getLegalEntityIdentifierTypes() {
  const response = await api.get<
    APIResponse<LegalEntityIdentifierTypeResponse[]>
  >(LegalEntityEndpoints.utils.identifierTypes());
  return response.data.data;
}

export async function getLegalEntityTaxComponentTypes() {
  const response = await api.get<
    APIResponse<LegalEntityTaxComponentTypeResponse[]>
  >(LegalEntityEndpoints.utils.taxComponentTypes());
  return response.data.data;
}

export async function getLegalEntityBankAccountTypes() {
  const response = await api.get<
    APIResponse<LegalEntityBankAccountTypeResponse[]>
  >(LegalEntityEndpoints.utils.bankAccountTypes());
  return response.data.data;
}

export async function getLegalEntityTaxTypes() {
  const response = await api.get<APIResponse<LegalEntityTaxTypeResponse[]>>(
    LegalEntityEndpoints.utils.taxTypes(),
  );
  return response.data.data;
}
