import { updateBarDetails } from "@/api_service/apis/Hospitality/Bar";
import { useMutation } from "@tanstack/react-query";

export function useUpdateBarDetails() {
  return useMutation({
    mutationKey: ["Hospitality", "Bar", "update"],
    mutationFn: updateBarDetails,
  });
}


export function useAddTablesInBar(){

}

export function useAddBookingOnTable(){
    
}