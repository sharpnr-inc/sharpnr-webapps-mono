import { useQuery } from "@tanstack/react-query";
import { FetchSetupProgress } from "../service";

export function useSetupProgress(){
    return useQuery({
        queryKey:["Orchestrator", "Setup-progress"],
        queryFn:FetchSetupProgress
    })
}

import { queryOptions } from "@tanstack/react-query";

export const setupProgressQuery = queryOptions({
  queryKey: ["Orchestrator", "Setup-progress"],
  queryFn: FetchSetupProgress,
})