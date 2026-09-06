import { GetAuthenticatedUser, verifyUserAuthentication } from "@/api/service";
import AccountingRootLayout from "@/components/AccountingRootLayout";
import { config } from "@sharpnr/env";
import { appUserActions } from "@/store/AppUserStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import { GetLegalEntities } from "@/temp/api";
import {
  accountingActions,
  useAccountingStore,
} from "@/store/accounting.store";
import { LEGAL_ENTITY_CHOOSER_PATH } from "@/lib/routes";

export const Route = createFileRoute("/_layout")({
  pendingComponent: () => <GlobalLoader message="Loading your workspace" />,

  beforeLoad: async ({ context, location }) => {
    const authUser = await context.queryClient.ensureQueryData({
      queryKey: ["auth-user"],
      queryFn: verifyUserAuthentication,
      staleTime: 1000 * 60 * 5,
    });

    if (!authUser.success) {
      throw redirect({
        href: config.authAppUrl,
      });
    }

    const userDetails = await context.queryClient.ensureQueryData({
      queryKey: ["user-details"],
      queryFn: GetAuthenticatedUser,
      staleTime: 1000 * 60 * 5,
    });

    const user = userDetails.data;
    if (!user) {
      throw redirect({
        href: config.authAppUrl,
      });
    }
    appUserActions.setUser({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    // it fetches the all legal Enties available in the organization
    const legalEntitiesOfOrg = await context.queryClient.ensureQueryData({
      queryKey: ["legal-entities"],
      queryFn: GetLegalEntities,
      staleTime: 1000 * 60 * 5,
    });

    // then we set the legal enties in the store, which is what the sidebar
    // switcher and the chooser page both read from. Setting them also re-hydrates
    // the previously selected entity (see the store) so a reload keeps its books.
    accountingActions.setLegalEntities(legalEntitiesOfOrg.data ?? []);

    // Every page under this layout is scoped to one legal entity, so a user
    // without a selection is sent to the chooser first -- carrying where they
    // were headed so the pick resumes that navigation. The chooser itself is
    // exempt, otherwise it would redirect to itself forever.
    const hasSelection = !!useAccountingStore.getState().selectedLegalEntity;

    if (
      !hasSelection &&
      !location.pathname.startsWith(LEGAL_ENTITY_CHOOSER_PATH)
    ) {
      throw redirect({
        to: LEGAL_ENTITY_CHOOSER_PATH,
        search: { redirect: location.href },
      });
    }

    return { user };
  },

  component: AccountingRootLayout,
});
