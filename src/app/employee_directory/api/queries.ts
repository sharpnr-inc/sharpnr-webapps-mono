import { useQuery } from "@tanstack/react-query";
import { MOCK_EMPLOYEES } from "../mock/employees";
import type { Employee, EmployeeResponse } from "./types";

/**
 * Mock-backed employees query.
 *
 * Replace the `queryFn` body with a real `employeesService.list()` call when the
 * backend endpoint is available — the component contract (`EmployeeResponse`)
 * does not need to change.
 */
async function fetchEmployees(): Promise<EmployeeResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data: Employee[] = [...MOCK_EMPLOYEES].sort(
    (a, b) =>
      new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime(),
  );

  return { data, total: data.length };
}

export const employeeKeys = {
  all: ["employees"] as const,
  list: () => [...employeeKeys.all, "list"] as const,
};

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.list(),
    queryFn: fetchEmployees,
    staleTime: 30_000,
  });
}
