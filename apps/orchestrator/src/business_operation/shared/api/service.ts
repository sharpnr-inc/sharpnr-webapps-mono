import type { APIResponse } from "@/lib/api_response";
import { api } from "@sharpnr/http";
import type { BusinessModulesData, InfraModulesData } from "./types";

export async function GetAllBusinessModules() {
  const res = await api.get<APIResponse<BusinessModulesData>>(
    "/orchestrator/property/utils/bm",
  );
  return res.data;
}

export async function GetAllInfraModules() {
  const res = await api.get<APIResponse<InfraModulesData>>(
    "/orchestrator/property/utils/infra",
  );
  return res.data;
}
