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
