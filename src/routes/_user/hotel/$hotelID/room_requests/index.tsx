import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/hotel/$hotelID/room_requests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/hotel/$hotelID/room_requests/"!</div>
}
