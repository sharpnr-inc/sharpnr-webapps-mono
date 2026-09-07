import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  StockwaveAccountStatusResponse,
  StartStockwaveServiceRequestDto,
} from "./types";

const stockwaveOrchsEndpoints = {
  getAccountStatus: () => `/orchestrator/stockwave`,
  startStockwaveService: () => `/orchestrator/stockwave/start`,
};

export async function getStockwaveAccountStatus(): Promise<
  APIResponse<StockwaveAccountStatusResponse>
> {
  const response = await api.get(stockwaveOrchsEndpoints.getAccountStatus());
  return response.data;
}

export async function startStockwaveService(
  request: StartStockwaveServiceRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    stockwaveOrchsEndpoints.startStockwaveService(),
    request,
  );
  return response.data;
}
