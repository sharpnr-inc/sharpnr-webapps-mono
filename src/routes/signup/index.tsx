import RegisterOrganization from "@/CoreOrchestrator/auth/signup/InitialRegistrationStep";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: RegisterOrganization,
});
