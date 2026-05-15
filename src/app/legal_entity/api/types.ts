export interface LegalEntityListResponse {}

/* ---------------------------------- <***> --------------------------------- */

export interface LegalEntityUtilResponse {
  id: string;
  label: string;
}

export interface LegalEntityIdentifierTypeResponse
  extends LegalEntityUtilResponse {
  description: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface AddLegalEntityRequestDto {}
