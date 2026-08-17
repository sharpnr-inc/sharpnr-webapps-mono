import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./service";

export function useProfileDetails() {
  return useQuery({
    queryKey: ["USER PROFILE"],
    queryFn: getProfile,
  });
}
