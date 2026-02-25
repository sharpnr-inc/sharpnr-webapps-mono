import { useQuery } from "@tanstack/react-query";
import { GetLegalEntities } from "../api.service";

export function useOrganizationLegalEntities() {
    return useQuery({
        queryKey: ["legal-entities"],
        queryFn: GetLegalEntities,
    });
}