import ContactsIndexPage from "@/app/contacts/pages/ContactsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/contacts/")({
  component: ContactsIndexPage,
});
