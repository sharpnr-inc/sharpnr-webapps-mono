import { UserinfoSetUpPage } from "@/setup_wizard/pages/UserInfoPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/$stepID/userinfo")({
  component: UserinfoSetUpPage,
});
