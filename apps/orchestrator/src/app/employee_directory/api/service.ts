import type { APIResponse } from "@sharpnr/utils";
import { api } from "@sharpnr/http";
import type {
  AddNewSuperAdminInOrganizationRequestDto,
  EmployeeOfOrganization,
} from "./types";

const emplDirEndpoints = {
  getAllEmployees: () => `/orchestrator/empl`,
  addSuperAdmin: () => `/orchestrator/empl/add_super_admin`,
};

export async function fetchEmployees() {
  const response = await api.get<APIResponse<EmployeeOfOrganization[]>>(
    emplDirEndpoints.getAllEmployees(),
  );
  return response.data;
}

export async function addNewSuperAdmin(
  req: AddNewSuperAdminInOrganizationRequestDto,
): Promise<APIResponse<null>> {
  const response = await api.post(emplDirEndpoints.addSuperAdmin(), req);
  return response.data;
}
