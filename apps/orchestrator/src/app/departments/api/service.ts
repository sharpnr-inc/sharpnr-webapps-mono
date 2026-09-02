import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type { DepartmentViewResponse } from "./types";

const orgDepartmentsEndpoints = {
  getDepartments: () => `/orchestrator/department`,
};

export async function listAllOrgDepartments(): Promise<
  APIResponse<DepartmentViewResponse>
> {
  const response = await api.get(orgDepartmentsEndpoints.getDepartments());
  return response.data;
}
