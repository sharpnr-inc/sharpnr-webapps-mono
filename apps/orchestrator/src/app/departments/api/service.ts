import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  CreateDepartmentRequestDto,
  DepartmentViewResponse,
  DepartmentViewResponseDto,
} from "./types";

const orgDepartmentsEndpoints = {
  getDepartments: () => `/orchestrator/department`,
  getDepartmentById: (id: string) => `/orchestrator/department/${id}`,
};

export async function listAllOrgDepartments(): Promise<
  APIResponse<DepartmentViewResponse>
> {
  const response = await api.get(orgDepartmentsEndpoints.getDepartments());
  return response.data;
}

export async function createOrgDepartment(
  request: CreateDepartmentRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(
    orgDepartmentsEndpoints.getDepartments(),
    request,
  );
  return response.data;
}


export async function getOrgDepartmentById(
  departmentId: string,
): Promise<APIResponse<DepartmentViewResponseDto>> {
  const response = await api.get(
    orgDepartmentsEndpoints.getDepartmentById(departmentId),
  );
  return response.data;
}
