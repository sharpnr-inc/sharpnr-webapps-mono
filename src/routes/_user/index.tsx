import AppUserProfilePage from "@/app/pages/AppUserProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/")({
  component: AppUserProfilePage,
});
