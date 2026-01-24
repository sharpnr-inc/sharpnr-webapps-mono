import { queryOptions } from "@tanstack/react-query";
import { fetchOrgSetupProgress } from "./apiservice";

export const setupProgressQuery = queryOptions({
  queryKey: ["Orchestrator", "Setup-progress"],
  queryFn: fetchOrgSetupProgress,
})