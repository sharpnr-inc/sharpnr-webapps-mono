import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type { BusinessModulesData, InfraModulesData } from "./types";

export async function GetAllBusinessModules() {
  const res = await api.get<APIResponse<BusinessModulesData>>(
    "/orchestrator/utils/buinsess_modules",
  );
  return res.data;
}

export async function GetAllInfraModules() {
  const res = await api.get<APIResponse<InfraModulesData>>(
    "/orchestrator/utils/Infra_modules",
  );
  return res.data;
}
