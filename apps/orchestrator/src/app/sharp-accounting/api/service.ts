import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  AccountingAccountStatusResponse,
  StartAccountingServiceRequestDto,
} from "./types";

// The org-level switch lives on the orchestrator under /sharp-accounting, to
// match this app's own route. The engine's product API stays on /accounting.
const accountingOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/sharp-accounting`,
  startAccountingService: () => `/orchestrator/sharp-accounting/start`,
};

export async function getAccountingAccountStatus(): Promise<
  APIResponse<AccountingAccountStatusResponse>
> {
  const response = await api.get(accountingOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startAccountingService(
  request: StartAccountingServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    accountingOrchsEndpoints.startAccountingService(),
    request,
  );
  return response.data;
}
