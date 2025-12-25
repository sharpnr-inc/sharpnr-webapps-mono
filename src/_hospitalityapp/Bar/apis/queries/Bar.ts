import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import {
  fetchBarLayout,
  getBarConfigDetails,
  type BarGeneralDetailsResponse,
} from "@/_hospitalityapp/Bar/apis/Bar";

export function useBarLayout() {
  return useQuery<ApiResponse<any>>({
    queryKey: ["Bar"],
    queryFn: fetchBarLayout,
    
  });
}

export function useBarGeneralDetails() {
  return useQuery<ApiResponse<BarGeneralDetailsResponse>>({
    queryKey: ["hospitality", "bar", "config"],
    queryFn: getBarConfigDetails,
  });
}
