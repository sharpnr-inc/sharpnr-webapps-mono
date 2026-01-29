import { InitialSignupPage } from "@/signup_and_auth/IntialSignupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/org-signup/")({
  component: InitialSignupPage,
});
