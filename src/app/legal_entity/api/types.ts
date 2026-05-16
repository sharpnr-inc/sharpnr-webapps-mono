import { z } from "zod";
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
