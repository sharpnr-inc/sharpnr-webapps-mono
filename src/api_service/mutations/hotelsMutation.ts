import { useMutation } from "@tanstack/react-query";
import { createFloorInHotel, createRoomInFloor, type CreateFloorInHotelReq, type CreateFloorInHotelRes } from "../apis/hotel";

export function mutateFloorInHotel() {
  return useMutation<CreateFloorInHotelRes, Error, CreateFloorInHotelReq>({
    mutationKey: ["Create Floor"],
    mutationFn: async (data) => {
      const res = await createFloorInHotel(data);
      return res.data;
    },
  });
}


export function mutateRoomInFloor(){
  return useMutation({
    mutationKey:["create floor"],
    mutationFn:async (data:any)=>{
      const res = await createRoomInFloor(data);
      return res.data
    } 
  })
}
