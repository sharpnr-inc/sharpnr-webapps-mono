import { z } from "zod";

export interface DepartmentViewResponseDto {
  id: string;
  name: string;
  description: string;
  code: string;
  department_head?: string | null;
  created_at: string;
  updated_at: string;
}
export type DepartmentViewResponse = DepartmentViewResponseDto[];

export const createDepartmentRequestDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  code: z.string().optional(),
  department_head: z.string().optional(),
});

export type CreateDepartmentRequestDto = z.infer<
  typeof createDepartmentRequestDtoSchema
>;
