import { Route } from "@/routes/dashboard/(dashboard)/sharp_hospitality/hotel/$roomId";
export function HotelRoomMainPage() {
  const { roomId } = Route.useParams();

  return <div>Room ID: {roomId}</div>;
}
