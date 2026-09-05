import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  SharpCrmAccountStatusResponse,
  StartSharpCrmServiceRequestDto,
} from "./types";

const sharpCrmOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/sharpcrm`,
  startSharpCrmService: () => `/orchestrator/sharpcrm/start`,
};

export async function getSharpCrmAccount(): Promise<
  APIResponse<SharpCrmAccountStatusResponse>
> {
  const response = await api.get(sharpCrmOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startSharpCrmService(
  request: StartSharpCrmServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    sharpCrmOrchsEndpoints.startSharpCrmService(),
    request,
  );
  return response.data;
}
