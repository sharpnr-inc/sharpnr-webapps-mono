export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  code: string;
  address_line: string;
  country: string;
}

export interface PropertiesOfOrganizationData {
  properties: Property[];
}

/* ---------------------------------- <***> --------------------------------- */

export interface PropertyDetailsData {
  name: string;
  code: string;
  city: string;
  address_line: string;
  state: string;
  country: string;
}

/* ---------------------------------- <***> --------------------------------- */

/** Hospitality module values the backend accepts (mirror of Go `HospitalityModulesType`). */
export type HospitalityModuleType =
  | "RESTAURANT"
  | "HOTEL"
  | "BAR"
  | "NIGHT_CLUB"
  | "RESORT"
  | "CLOUD_KITCHEN/TAKEAWAYS";

/** Healthcare module values the backend accepts (mirror of Go `HealthcareModulesType`). */
export type HealthcareModuleType =
  | "HOSPITAL"
  | "CLINIC"
  | "PHARMACY"
  | "DIAGNOSTICS"
  | "TELEMEDICINE"
  | "HOME_CARE";

/** One module plus how many instances to create. `quantity` must be >= 1 (enforced server-side). */
export interface HospitalityModuleQuantity {
  module: HospitalityModuleType;
  quantity: number;
}

export interface HealthcareModuleQuantity {
  module: HealthcareModuleType;
  quantity: number;
}

/**
 * JSON request body for adding business operation modules.
 * Keys are snake_case to match the backend DTO (`AddBusinessOpModulesRequestDto`).
 * Healthcare is on hold server-side, so `healthcare_modules` is optional.
 */
export interface AddBusinessOperationModulesBody {
  hospitality_modules: HospitalityModuleQuantity[];
  healthcare_modules?: HealthcareModuleType[] extends never
    ? never
    : HealthcareModuleQuantity[];
}

/**
 * Payload for adding business operation modules to a property.
 * `propertyID` goes in the URL params; `payload` is the JSON request body.
 */
export interface AddBusinessOperationModulesPayload {
  propertyID: string;
  payload: AddBusinessOperationModulesBody;
}

/* ---------------------------------- <***> --------------------------------- */

export interface HospitalityBusinessModule {
  id: string;
  name: string;
  module_type: HospitalityModuleType;
  status: boolean;
  is_configured: boolean;
}

export interface HealthcareBusinessModule {
  id: string;
  name: string;
  module_type: HealthcareModuleType;
  status: boolean;
  is_configured: boolean;
}

export interface fetchBusinessOperationModulesResponseType {
  hospitality_business_operation_modules: HospitalityBusinessModule[];
  healthcare_business_operation_modules: HealthcareBusinessModule[];
}

/* ---------------------------------- <***> --------------------------------- */

/** General (business-agnostic) infra values — mirror of Go `GeneralInfraModulesType`. */
export type GeneralInfraType =
  | "Front Desk / Reception"
  | "Billing Counter"
  | "Security Desk";

/** Hospitality infra values — mirror of Go `HospitalityInfraModulesTypes`. */
export type HospitalityInfraType =
  | "KITCHEN"
  | "BAR_COUNTER"
  | "DINING_HALL"
  | "INVENTORY_STORE"
  | "RECEPTION_FRONT_DESK"
  | "HOUSEKEEPING";

/** Healthcare infra values — mirror of Go `HealthcareInfraModulesType`. */
export type HealthcareInfraType =
  | "WARD_INPATIENT_UNIT"
  | "OPERATION_THEATRE"
  | "LABORATORY"
  | "PHARMACY_COUNTER"
  | "RECEPTION_REGISTRATION"
  | "RADIOLOGY_IMAGING";

export interface GeneralInfraModuleQuantity {
  module: GeneralInfraType;
  quantity: number;
}

export interface HospitalityInfraModuleQuantity {
  module: HospitalityInfraType;
  quantity: number;
}

export interface HealthcareInfraModuleQuantity {
  module: HealthcareInfraType;
  quantity: number;
}

/**
 * JSON request body for adding infra modules.
 * Keys are snake_case to match the backend DTO (`AddInfraModulesRequestDto`).
 * The server currently only provisions `hospitality_infra` (Kitchen); general
 * and healthcare infra are accepted but skipped, so those two are optional.
 */
export interface AddInfraModulesBody {
  hospitality_infra: HospitalityInfraModuleQuantity[];
  general_modules?: GeneralInfraModuleQuantity[];
  health_care_infra?: HealthcareInfraModuleQuantity[];
}

export interface AddInfraModulesPayload {
  propertyID: string;
  payload: AddInfraModulesBody;
}

/* ---------------------------------- <***> --------------------------------- */

export interface GeneralInfraModule {
  id: string;
  name: string;
  infra_type: GeneralInfraType;
}

export interface HospitalityInfraModule {
  id: string;
  name: string;
  status: boolean;
  infra_type: HospitalityInfraType;
  meta?: unknown; // shape TBD server-side (Go `meta,omitempty`)
}

export interface HealthcareInfraModule {
  id: string;
  name: string;
  infra_type: HealthcareInfraType;
}

export interface fetchInfraModulesResponse {
  general_infra_modules: GeneralInfraModule[];
  hospitality_infra_modules: HospitalityInfraModule[];
  healthcare_infra_modules: HealthcareInfraModule[];
}
