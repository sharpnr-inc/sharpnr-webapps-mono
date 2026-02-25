import { useMutation } from "@tanstack/react-query";
import { CreateAccountMapping } from "../api_calls";

export function useMutateCreateAccountMapping(){
    return useMutation({
        mutationKey:["Accounting", "Mapping", "Create"],
        mutationFn:CreateAccountMapping
    })
}