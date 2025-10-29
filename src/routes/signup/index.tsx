import RegisterOrganization from "@/components/signup/IntialRegistraionStep";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: RegisterOrganization,
});
