import SecretsIndexPage from "@/app/secrets/pages/SecretsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/secrets/")({
  component: SecretsIndexPage,
});
