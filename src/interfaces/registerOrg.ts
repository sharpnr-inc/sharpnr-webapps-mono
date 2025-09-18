import { z } from "zod";

export interface RegisterOrganizationRequestPayload{
    Name: string
    Email:string
    Phone:string
    OrgType?:string
    Password:string
}

export interface OTPVerifyOrganizationRequestPayload{
    org_email: string
    password:string
    org_type:string
    org_name:string
}

export const ZodOrgRegsitrationSchema = z.object({
    Name: z.string().min(10, "Name Must be at least 10 Character "),
    Email:z.string(),
    Phone: z.string(),
    OrgType: z.string().optional(),
    Password:z.string(),
})

// export const registerOrgresponse = ZodOrgRegsitrationSchema.safeParse({
//    token: "string",
//    message:"string" 
// })

