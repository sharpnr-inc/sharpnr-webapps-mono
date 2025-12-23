import api from "@/middlewares/axios";
import { CoreOrchestratorApi } from "../endpoints/CoreOrchestrator";

export const GetOrchestratorDetails = async () => {
  const res = api.get(CoreOrchestratorApi.getDetails);
  return res;
};
