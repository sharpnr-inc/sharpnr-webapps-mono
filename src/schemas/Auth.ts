import { z } from "zod";

export const RegisterOrganizationSchema = z.object({
  name: z.string().min(10, "Organisation Name must be atleast 10 Character long"),
  email: z.email(),
  mobile: z.string().min(10, "Mobile Number Must be 10 digit Long").max(10),
  org_type: z.string(),
  password: z.string().min(12),
});

export type RegisterOrganizationRequestPayload = z.infer<typeof RegisterOrganizationSchema>;


export const VerifyOtpReqSchema = z.object({
  otp:z.string().min(6,"OTP must be 6 Didgit").max(6,"OTP must be 6 Didgit")
})

export type VerifyOTPRequestPayload = z.infer<typeof VerifyOtpReqSchema>