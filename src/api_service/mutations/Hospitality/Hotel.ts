import { createBookingInRoomHotel, createGuestInHotel, createRoomInHotel, updateHotelGeneralDetails } from "@/api_service/apis/Hospitality/Hotel";
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
   const queryClient = useQueryClient();
  return useMutation({
    mutationKey:["Hospitality", "Hotel", "Create-guest"],
    mutationFn: createGuestInHotel,
      onSuccess: (_data, variables) => {
      // variables === value passed to mutate(value)
      const mobile = variables.mobile;

      queryClient.invalidateQueries({
        queryKey: ["Hospitality", "Hotel", "guest-search", mobile],
      });
    },
  })
}

export function useMutationCreateRoomBooking(){
  return useMutation({
    mutationKey:["Hospitality", "Create-Booking"],
    mutationFn:createBookingInRoomHotel
  })
}

export function useMutationCreateRoom(){
  return useMutation({
    mutationKey:["Hospitality", "Hotel", "Create-Room"],
    mutationFn:createRoomInHotel
  })
}