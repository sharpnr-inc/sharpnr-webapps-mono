import { useQuery } from "@tanstack/react-query";
import {GetOrchestratorDetails} from "../../apis/Orchestrator/OrchestratorApis"

export function useOrchestratorQuery(){
    return useQuery({
        queryKey:["Orchestrator", "Details"],
        queryFn:GetOrchestratorDetails
    })
}