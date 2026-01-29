import AppUserProfilePage from "@/app_user/AppUserProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/iam/profile")({
  component: AppUserProfilePage,

});
