import MessagePage from "@/app/pages/MessagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/messages")({
  component: MessagePage,
});
