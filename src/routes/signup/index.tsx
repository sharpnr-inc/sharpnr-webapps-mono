import { InitialSignupPage } from "@/app/signup/InitialSignupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  beforeLoad(ctx) {},
  component: InitialSignupPage,
});
