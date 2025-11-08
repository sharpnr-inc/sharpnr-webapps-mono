import { queryOptions } from "@tanstack/react-query";
import { fetchBar } from "../apis/bar";

export function useBar(){
  return queryOptions({
    queryKey:["Bar"],
    queryFn:fetchBar
  })
}