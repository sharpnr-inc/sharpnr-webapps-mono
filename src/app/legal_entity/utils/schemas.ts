import { z } from "zod";

export const createLegalEntityContactsSchema = z.object({
  type: z.string(),

  first_name: z.string().min(1, "First name is required"),

  last_name: z.string().optional(),

  designation: z.string().optional(),

  email: z.email("Invalid email").optional().or(z.literal("")),

  mobile: z.string().optional(),

  din: z.string().nullable().optional(),

  is_primary: z.boolean(),
});

export type CreateLegalEntityContactsRequestDto = z.infer<
  typeof createLegalEntityContactsSchema
>;

/* ---------------------------------- <***> --------------------------------- */

export const addBankAccountInLegalEntityRequestSchema = z.object({
  account_holder_name: z.string().min(1, "Account holder name is required"),
  account_number: z.string().min(1, "Account number is required"),
  ifsc: z.string().min(1, "IFSC code is required"),
  bank_name: z.string().optional(),
  branch_name: z.string().optional(),
  micr_code: z.string().optional(),
  account_type: z.string(),
  is_primary: z.boolean(),
});

export type AddBankAccountInLegalEntityRequestDto = z.infer<
  typeof addBankAccountInLegalEntityRequestSchema
>;

/* ---------------------------------- <***> --------------------------------- */

export const addIdentifiersInLegalEntityRequestSchema = z.object({
  type: z.string(),
  value: z.string().min(1, "Identifier value is required"),
});

export type AddIdentifiersInLegalEntityRequestDto = z.infer<
  typeof addIdentifiersInLegalEntityRequestSchema
>;

/* ---------------------------------- <***> --------------------------------- */

export const addLicenseAndComplianceInLegalEntityRequestSchema = z.object({
  type: z.string().min(1, "License type is required"),
  license_number: z.string().min(1, "License number is required"),
  issuing_authority: z.string().optional(),
  valid_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  valid_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .optional()
    .nullable(),
});

export type AddNewLicenseAndComplianceRequestDto = z.infer<
  typeof addLicenseAndComplianceInLegalEntityRequestSchema
>;

/* ---------------------------------- <***> --------------------------------- */

export const addTaxRegistrationInLegalEntityRequestSchema = z.object({
  tax_type: z.string().min(1, "Tax type is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  gst_registration_type: z.string().min(1, "GST registration type is required"),
  state: z.string().optional(),
  gst_state_code: z.string().optional(),
  country: z.string().min(1, "Country code is required"),
  // Configured as an ISO datetime string to match Go's time.Time
  effective_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  // Optional / Nullable ISO string to match Go's *time.Time pointer
  effective_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .optional()
    .nullable(),
});

export type AddNewTaxRegistrationInLegalEntityRequestDto = z.infer<
  typeof addTaxRegistrationInLegalEntityRequestSchema
>;
