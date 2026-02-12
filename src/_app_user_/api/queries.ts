import { useQuery } from "@tanstack/react-query";
import { GetAppUserProfile } from "./api.service";

export function useAppUserProfile() {
  return useQuery({
    queryKey: ["appUserProfile"],
    queryFn: GetAppUserProfile,
  });
}
