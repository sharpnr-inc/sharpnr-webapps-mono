import CredentialsIndexPage from "@/app/credentials/pages/CredentialsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/credentials/")({
  component: CredentialsIndexPage,
});
