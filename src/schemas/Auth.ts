import { z } from "zod";

export const RegisterOrganizationSchema = z.object({
  name: z.string().min(10, "Organisation Name must be atleast 8 Character long"),
  email: z.email(),
  mobile: z.string().min(10, "Mobile Number Must be 10 digit Long").max(10, "Mobile Number Must be 10 digit Long"),
  org_type: z.string(),
  password: z.string().min(8, "Password id Too shorts"),
  conformPassword: z.string().optional(),
  
}).refine((data) => data.password === data.conformPassword, {
   path: ["conformPassword"], // this marks confirmPassword as the error field
    message: "Passwords do not match",
});

export type RegisterOrganizationRequestPayload = z.infer<typeof RegisterOrganizationSchema>;


export const VerifyOtpReqSchema = z.object({
  otp:z.string().min(6,"OTP must be 6 Didgit").max(6,"OTP must be 6 Didgit"),
  token:z.string()
})

export type VerifyOTPRequestPayload = z.infer<typeof VerifyOtpReqSchema>

export const LoginSchema = z.object({
  email: z.email(),
  password:z.string()
})

export type LoginPayload = z.infer<typeof LoginSchema>


// RegistrationDetails schema
const RegistrationDetailsSchema = z.object({
  is_register: z.boolean(),
  gst_number: z.string().optional(),
  cin_number: z.string().optional(),
});

// AddressDetails schema
const AddressDetailsSchema = z.object({
  country:z.string(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  address_line: z.string().optional(),
  area_locality:z.string().optional()
});

// BankDetails schema
const BankDetailsSchema = z.object({
  bank_name: z.string().min(1, "Bank name is required"),
  account_number: z.string().min(1, "Account number is required"),
  ifsc_code: z.string().min(1, "IFSC code is required"),
  branch_name: z.string().optional(),
  is_primary: z.boolean(),
  is_secondary: z.boolean().optional(),
});

// OrgOwnerDetails schema
const OrgOwnerDetailsSchema = z.object({
  owner_name: z.string().min(1, "Owner name is required"),
  owner_email: z.string().optional(),
  owner_phone: z.string().optional(),
});


// Main DTO schema
export const CompleteOrgResgistrationSchema = z.object({
  registration_details: RegistrationDetailsSchema,
  address_details: AddressDetailsSchema,
  is_owner:z.boolean(),
  owner_details: z.array(OrgOwnerDetailsSchema),
});

// ✅ Optional: export inferred TypeScript type
export type CompleteOrgResgistrationPayload = z.infer<typeof CompleteOrgResgistrationSchema>;
