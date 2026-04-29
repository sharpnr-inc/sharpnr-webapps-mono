// This is the profile page for "/"
import AppUserProfilePage from "@/app/pages/profilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/")({
  component: AppUserProfilePage,
});
