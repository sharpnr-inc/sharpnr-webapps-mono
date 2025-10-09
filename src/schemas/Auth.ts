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