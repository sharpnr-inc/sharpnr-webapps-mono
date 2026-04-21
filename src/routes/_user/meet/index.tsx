import { createFileRoute } from "@tanstack/react-router";
import { MeetRoom } from "@/components/MeetRoom";

export const Route = createFileRoute("/_user/meet/")({
  component: MeetPage,
});

function MeetPage() {
  return <MeetRoom />;
}
