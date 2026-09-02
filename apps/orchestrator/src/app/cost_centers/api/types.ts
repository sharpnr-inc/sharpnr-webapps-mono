import { z } from "zod";

export const createCostCenterRequestDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  code: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

export type CreateCostCenterRequestDto = z.infer<
  typeof createCostCenterRequestDtoSchema
>;

export interface CostCenterResponseDto {
  id: string;
  name: string;
  description: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export type CostCenterListResponseDto = CostCenterResponseDto[];
