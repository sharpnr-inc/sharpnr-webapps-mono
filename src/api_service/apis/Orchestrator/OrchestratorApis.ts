import api from "@/api_service/axios";
import { CoreOrchestratorApi } from "../endpoints/CoreOrchestrator";

export const GetOrchestratorDetails = async () => {
  const res = api.get(CoreOrchestratorApi.getDetails);
  return res;
};
