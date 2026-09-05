import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CortexAccountStatusResponse,
  StartCortexServiceRequestDto,
} from "./types";

const cortexOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/cortex`,
  startCortexService: () => `/orchestrator/cortex/start`,
};

export async function getCortexAccountStatus(): Promise<
  APIResponse<CortexAccountStatusResponse>
> {
  const response = await api.get(cortexOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startCortexService(
  request: StartCortexServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    cortexOrchsEndpoints.startCortexService(),
    request,
  );
  return response.data;
}
