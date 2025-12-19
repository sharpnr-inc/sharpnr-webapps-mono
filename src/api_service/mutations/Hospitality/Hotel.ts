import { createGuestInHotel, updateHotelGeneralDetails } from "@/api_service/apis/Hospitality/Hotel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateHotelMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Hospitality", "Hotel", "Update"],
    mutationFn: updateHotelGeneralDetails,
    onSuccess: () => {
      // 🔁 Refetch hotel details
      queryClient.invalidateQueries({
        queryKey: ["organization hotel"],
      });
    },
  });
}


export function useMutationCreateGuest(){
  return useMutation({
    mutationKey:["Hospitality", "Hotel", "Create-guest"],
    mutationFn: createGuestInHotel,
    // onSuccess:() =>{
    //    const queryClient = useQueryClient();
    //    queryClient.fetchQuery({
    //     queryKey:[]
    //    })
    // }
  })
}