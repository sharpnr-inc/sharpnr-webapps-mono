import type { APIResponse } from "@sharpnr/utils";
import { api } from "@sharpnr/http";
import type { EmployeeOfOrganization } from "./types";

export async function fetchEmployees() {
  const response = await api.get<APIResponse<EmployeeOfOrganization[]>>(
    "/orchestrator/empl",
  );
  return response.data;
}
