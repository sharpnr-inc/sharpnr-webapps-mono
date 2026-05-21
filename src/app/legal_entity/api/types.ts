import { z } from "zod";
import type {
  LegalEntityAddressType,
  LegalEntityBankAccountType,
  LegalEntityContactType,
  LegalEntityGstRegistrationType,
  LegalEntityIdentifierType,
  LegalEntityLicenseType,
  LegalEntityTaxComponentType,
  LegalEntityTaxType,
  LegalEntityType,
} from "../utils/entity_type";

export interface LegalEntityResponseDto {
  id: string;
  display_name: string;
  legal_name: string;
  status: boolean;
  entity_type: LegalEntityType;
  inc_date: string;
}

/* ---------------------------------- <***> --------------------------------- */

export interface LegalEntityUtilResponse {
  id: string;
  label: string;
}

export interface LegalEntityIdentifierTypeResponse extends LegalEntityUtilResponse {
  description: string;
}

export interface LegalEntityTaxTypeResponse extends LegalEntityIdentifierTypeResponse {}
export interface LegalEntityTaxComponentTypeResponse extends LegalEntityIdentifierTypeResponse {}
export interface LegalEntityBankAccountTypeResponse extends LegalEntityIdentifierTypeResponse {}

/* ---------------------------------- <***> --------------------------------- */

export interface CreateLegalEntityPayload {
  payload: NewLegalEntityRequestDto;
}

export const createLegalEntityAddressSchema = z.object({
  address_line_1: z.string().min(1, "Address line 1 is required"),

  address_line_2: z.string().optional(),

  landmark: z.string().min(1, "Landmark required"),

  address_type: z.string().min(1, "Address type required"),

  city: z.string().min(1, "City required"),

  state: z.string().min(1, "State required"),

  gst_state_code: z.string().min(1, "GST code required"),

  country: z.string().min(1, "Country required"),

  pincode: z
    .string()
    .min(1, "Pincode required")
    .regex(/^\d{6}$/, "Invalid pincode"),

  is_primary: z.boolean(),
});

export const createLegalEntitySchema = z.object({
  legal_name: z.string().min(2, "Legal name required"),

  display_name: z.string().min(2, "Display name required"),

  type: z.string().min(1, "Entity type required"),

  incorporation_date: z.string().min(1, "Date required"),

  fiscal_year_month: z.number().min(1).max(12),

  addresses: z.array(createLegalEntityAddressSchema).optional(),
});

export type NewLegalEntityRequestDto = z.infer<typeof createLegalEntitySchema>;

export type CreateLegalEntityAddressRequest = z.infer<
  typeof createLegalEntityAddressSchema
>;

/* ---------------------------------- <***> --------------------------------- */

export interface LegalEntityContactResponseDto {
  id: string;
  type: LegalEntityContactType; // Maps to LegalEntityContactType constant
  first_name: string;
  last_name: string;
  designation: string;
  email: string;
  mobile: string;
  din: string | null; // Pointer fields map to nullable types
  is_primary: boolean;
  is_active: boolean;
  added_on: string;
}

export interface LegalEntityBankAccountsResponseDto {
  id: string;
  account_holder_name: string;
  account_number: string;
  ifsc: string;
  account_type: LegalEntityBankAccountType; // Maps to LegalEntityBankAccountType constant
  is_primary: boolean;
  is_verified: boolean;
  verified_at: string | null;
  is_active: boolean;
  added_at: string;
}

export interface LegalEntityAddressResponseDto {
  id: string;
  type: LegalEntityAddressType; // Maps to AddressType constant
  address_line1: string;
  address_line2?: string; // Optional field marked by omitempty
  landmark?: string;
  city: string;
  state: string;
  gst_state_code?: string;
  pincode: string;
  country: string;
  is_primary: boolean;
  property_id: string | null;
}

export interface LegalEntityComplianceResponseDto {
  id: string;
  type: LegalEntityLicenseType; // Maps to LegalEntityLicenseType constant
  license_number: string;
  issuing_authority?: string;
  valid_from: string;
  valid_to: string | null;
  renewal_reminder_days: number;
  property_id: string | null;
  module?: string; // Will support "HOTEL" | "RESTAURANT" | "BAR"
  document_url?: string;
  is_active: boolean;
}

export interface LegalEntityIdentifierResponseDto {
  id: string;
  type: LegalEntityIdentifierType; // Maps to LegalEntityIdentifierTypes constant (e.g., PAN, CIN, GSTIN)
  value: string;
  is_verified: boolean;
  verified_at: string | null;
  expires_at: string | null;
}

export interface LegalEntityTaxRegistrationResponseDto {
  id: string;
  tax_type: LegalEntityTaxType;
  registration_number: string;
  gst_registration_type: LegalEntityGstRegistrationType;
  state?: string;
  gst_state_code?: string;
  country: string;
  effective_from: string;
  effective_to: string | null;
  is_active: boolean;
}

export interface LegalEntityTaxComponentResponseDto {
  id: string;
  component_code: LegalEntityTaxComponentType;
  rate: number;
  liability_account_id: string;
}

export interface LegalEntityTaxRuleResponseDto {
  id: string;
  tax_registration_id: string;
  tax_type: LegalEntityTaxType;
  rate: number;
  condition_json: Record<string, any> | null; // Handles the dynamic json.RawMessage payload
  min_value: number | null;
  max_value: number | null;
  priority: number;
  effective_from: string;
  effective_to: string | null;
  is_active: boolean;
  components: LegalEntityTaxComponentResponseDto[];
}

export interface TaxCategoryAccountMappingResponseDto {
  id: string;
  accounting_book_id: string;
  receivable_account_id: string;
  income_account_id: string;
  is_active: boolean;
}

export interface LegalEntityTaxCategoryResponseDto {
  id: string;
  name: string;
  code: string; // e.g., "ROOM_RENT", "FOOD_BEV", "BANQUET"
  description?: string;
  sac_code: string | null;
  hsn_code: string | null;
  is_active: boolean;
  rules: LegalEntityTaxRuleResponseDto[];
  account_mappings: TaxCategoryAccountMappingResponseDto[];
}

// Complete Unified Frontend Response Structure
export interface LegalEntityDetails {
  basic_details: LegalEntityResponseDto;
  contacts_and_people: LegalEntityContactResponseDto[];
  bank_accounts: LegalEntityBankAccountsResponseDto[];
  addresses: LegalEntityAddressResponseDto[];
  licences_and_compliance: LegalEntityComplianceResponseDto[];
  identifiers: LegalEntityIdentifierResponseDto[];
  tax_registrations: LegalEntityTaxRegistrationResponseDto[];
  tax_categories: LegalEntityTaxCategoryResponseDto[];
}
