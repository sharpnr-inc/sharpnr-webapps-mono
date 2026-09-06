import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  SiloAccountStatusResponse,
  StartSiloServiceRequestDto,
} from "./types";

const siloOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/silo`,
  startSiloService: () => `/orchestrator/silo/start`,
};

export async function getSiloAccountStatus(): Promise<
  APIResponse<SiloAccountStatusResponse>
> {
  const response = await api.get(siloOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startSiloService(
  request: StartSiloServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    siloOrchsEndpoints.startSiloService(),
    request,
  );
  return response.data;
}
