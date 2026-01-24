import { useQuery } from "@tanstack/react-query";
import { FetchSetupProgress } from "../service";
import { queryOptions } from "@tanstack/react-query";

export function useSetupProgress(){
    return useQuery({
        queryKey:["Orchestrator", "Setup-progress"],
        queryFn:FetchSetupProgress
    })
}


export const setupProgressQuery = queryOptions({
  queryKey: ["Orchestrator", "Setup-progress"],
  queryFn: FetchSetupProgress,
})