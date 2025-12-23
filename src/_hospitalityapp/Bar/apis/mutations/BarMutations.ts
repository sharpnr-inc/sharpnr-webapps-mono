import { updateBarDetails } from "@/_hospitalityapp/Bar/apis/Bar";
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