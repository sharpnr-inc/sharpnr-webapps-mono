import { InitialSignupPage } from "@/signup/IntialSignupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/org-signup/")({
  component: InitialSignupPage,
});
