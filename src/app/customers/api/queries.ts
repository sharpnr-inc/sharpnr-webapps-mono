import { useQuery } from "@tanstack/react-query";
import { MOCK_CUSTOMERS } from "../mock/customers";
import type { Customer, CustomerResponse } from "./types";

/**
 * Mock-backed customers query.
 *
 * Replace the `queryFn` body with a real `customersService.list()` call when the
 * backend endpoint is available — the component contract (`CustomerResponse`)
 * does not need to change.
 */
async function fetchCustomers(): Promise<CustomerResponse> {
  // Simulate network latency so loading/skeleton states are exercised.
  await new Promise((resolve) => setTimeout(resolve, 600));

  const data: Customer[] = [...MOCK_CUSTOMERS].sort(
    (a, b) =>
      new Date(b.lastActivityAt).getTime() -
      new Date(a.lastActivityAt).getTime(),
  );

  return {
    data,
    total: data.length,
    page: 1,
    pageSize: data.length,
  };
}

export const customerKeys = {
  all: ["customers"] as const,
  list: () => [...customerKeys.all, "list"] as const,
};

export function useCustomers() {
  return useQuery({
    queryKey: customerKeys.list(),
    queryFn: fetchCustomers,
    staleTime: 30_000,
  });
}
