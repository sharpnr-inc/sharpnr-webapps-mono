import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  fetchBar,
  getBarConfigDetails,
} from "@/api_service/apis/Hospitality/Bar";

export function useBar() {
  return queryOptions({
    queryKey: ["Bar"],
    queryFn: fetchBar,
  });
}

export function useGetBarConfig() {
  return useQuery({
    queryKey: ["hospitality", "bar", "config"],
    queryFn: getBarConfigDetails,
  });
}
