import CompleteRegistration from "@/components/signup/CompleteRegistration";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/complete-registration")({
  component: CompleteRegistration,
});
