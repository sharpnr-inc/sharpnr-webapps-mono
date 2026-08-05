import ProfilePage from "@/app/profile/pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/profile/")({
  component: ProfilePage,
});
