import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  HrmsAccountStatusResponse,
  StartHrmsServiceRequestDto,
} from "./types";

const hrmsOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/sharp-hr`,
  startHrmsService: () => `/orchestrator/sharp-hr/start`,
};

export async function getHrmsAccountStatus(): Promise<
  APIResponse<HrmsAccountStatusResponse>
> {
  const response = await api.get(hrmsOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startHrmsService(
  request: StartHrmsServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    hrmsOrchsEndpoints.startHrmsService(),
    request,
  );
  return response.data;
}
