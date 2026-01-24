import { queryOptions } from "@tanstack/react-query";
import { GetOrganizationStatus } from "../api.service";

export const organizationStatusQuery = queryOptions({
  queryKey: ["Org", "status"],
  queryFn: GetOrganizationStatus,
});
