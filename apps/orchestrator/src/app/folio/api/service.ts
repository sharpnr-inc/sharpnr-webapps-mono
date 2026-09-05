import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  FolioAccountStatusResponse,
  StartFolioServiceRequestDto,
} from "./types";

const folioOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/folio`,
  startFolioService: () => `/orchestrator/folio/start`,
};

export async function getFolioAccountStatus(): Promise<
  APIResponse<FolioAccountStatusResponse>
> {
  const response = await api.get(folioOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startFolioService(
  request: StartFolioServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    folioOrchsEndpoints.startFolioService(),
    request,
  );
  return response.data;
}
