import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CostCenterListResponseDto,
  CreateCostCenterRequestDto,
} from "./types";

const costCenterEndpoints = {
  getCostCenters: () => `/orchestrator/cost_center`,
  getCostCenterById: (costCenterId: string) =>
    `/orchestrator/cost_center/${costCenterId}`,
};

export async function getCostCenters(): Promise<
  APIResponse<CostCenterListResponseDto>
> {
  const response = await api.get(costCenterEndpoints.getCostCenters());
  return response.data;
}

export async function createCostCenter(
  costCenterData: CreateCostCenterRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    costCenterEndpoints.getCostCenters(),
    costCenterData,
  );
  return response.data;
}
