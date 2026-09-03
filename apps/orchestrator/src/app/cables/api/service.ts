import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CablesServiceResponseDto,
  ChannelListResponseDto,
  StartCablesServiceRequestsDto,
} from "./types";

const cablesEndpoints = {
  getCablesAccountStatus: () => `/orchestrator/cables`,
  startCablesService: () => `/orchestrator/cables/start`,
  getAllChannels: () => `/orchestrator/cables/channel`,
};

export async function getCablesAccountStatus(): Promise<
  APIResponse<CablesServiceResponseDto>
> {
  const response = await api.get(cablesEndpoints.getCablesAccountStatus());
  return response.data;
}

export async function startCablesService(
  request: StartCablesServiceRequestsDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    cablesEndpoints.startCablesService(),
    request,
  );
  return response.data;
}

export async function getAllChannels(): Promise<
  APIResponse<ChannelListResponseDto>
> {
  const response = await api.get(cablesEndpoints.getAllChannels());
  return response.data;
}
