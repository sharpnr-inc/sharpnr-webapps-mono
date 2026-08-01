import { InitialSignupForm } from "@/app/signup/InitialSignupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: InitialSignupForm,
});
