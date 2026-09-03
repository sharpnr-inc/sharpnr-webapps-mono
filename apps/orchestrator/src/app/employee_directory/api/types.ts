import { z } from "zod";

export interface EmployeeRole {
  id: string;
  role: string;
  description: string;
}

export interface EmployeeOfOrganization {
  id: string;
  name: string;
  nickname: string;
  role: EmployeeRole;
  status: string;
}

export const addNewSuperAdminInOrganizationRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AddNewSuperAdminInOrganizationRequestDto = z.infer<
  typeof addNewSuperAdminInOrganizationRequestSchema
>;
