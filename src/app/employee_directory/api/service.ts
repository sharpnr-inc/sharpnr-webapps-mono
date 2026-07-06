import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type { EmployeeOfOrganization } from "./types";

export async function fetchEmployees() {
  const response = await api.get<APIResponse<EmployeeOfOrganization[]>>(
    "/orchestrator/empl",
  );
  return response.data;
}
