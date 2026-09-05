import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type { SharpCrmAccountStatusResponse } from "./types";

const sharpCrmOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/sharpcrm`,
};

export async function getSharpCrmAccount(): Promise<
  APIResponse<SharpCrmAccountStatusResponse>
> {
  const response = await api.get(sharpCrmOrchsEndpoints.getAccountStatus());
  return response.data;
}
