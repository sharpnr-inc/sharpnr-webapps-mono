import { queryOptions } from "@tanstack/react-query";
import { fetchOrgTypeList } from "../apis/utility_api";

export default function createOrgTypeQuery(){
    return queryOptions({
        queryKey:["UTILITY_ORG_TYPES"],
        queryFn:fetchOrgTypeList
    });
}







