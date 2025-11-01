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
  otp:z.string().min(6,"OTP must be 6 Digit").max(6,"OTP must be 6 Digit"),
})

export type VerifyOTPRequestPayload = z.infer<typeof VerifyOtpReqSchema>

export const LoginSchema = z.object({
  email: z.email(),
  password:z.string()
})

export type LoginPayload = z.infer<typeof LoginSchema>


// Represents an owner or stakeholder of the organization
export interface OrgOwnerDetails {
  owner_name: string;         // Full name of owner
  owner_email?: string;       // Optional email
  owner_phone?: string;       // Optional phone number
}

// Represents organization address details
export interface AddressDetails {
  country: string;
  city: string;
  state: string;
  pincode: string;
  address_line?: string;
  landmark?: string;
}

// Represents the complete organization registration request payload
export interface CompleteRegistrationForm {
  address_details: AddressDetails;
  is_owner: boolean;
  owner_details?: OrgOwnerDetails[];
  org_submodule_config: string[];
}
