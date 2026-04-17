import { LoginPage } from "@/app/login/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LoginPage,
});
