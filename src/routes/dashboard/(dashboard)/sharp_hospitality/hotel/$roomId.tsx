import { HotelRoomMainPage } from '@/_hospitalityapp/Hotel/pages/RoomPages/RoomMainPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_hospitality/hotel/$roomId',
)({
  component: RouteComponent,
})

function RouteComponent() {
   const { roomId } = Route.useParams();
  return <div><HotelRoomMainPage/></div>
}
