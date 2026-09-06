import { AccountingLegalEntityPage } from "@/components/AccountingLegalEntitySwitcher";
import { createFileRoute } from "@tanstack/react-router";

export interface LegalEntityChooserSearch {
  /** Where to go once an entity is picked, set by the layout guard. */
  redirect?: string;
}

export const Route = createFileRoute("/_layout/legal-entities/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): LegalEntityChooserSearch => {
    const redirect = search.redirect;

    // Only in-app paths are honoured; "//host" and absolute URLs would turn the
    // guard into an open redirect.
    const isInternalPath =
      typeof redirect === "string" &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//");

    return { redirect: isInternalPath ? redirect : undefined };
  },

  component: AccountingLegalEntityPage,
});
