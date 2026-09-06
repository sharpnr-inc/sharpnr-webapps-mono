import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { config } from "@sharpnr/env";
import {
  Button,
  DefinitionRows,
  EcosystemSection,
  FlowLine,
  PointList,
  WebsiteClosing,
  WebsiteFooter,
  WebsiteHeader,
  WebsiteHero,
  WebsiteSection,
} from "@sharpnr/ui";
import type { EcosystemLink, FlowStep } from "@sharpnr/ui";
import { usePublicCurrentUser } from "@/api/publicClient";

const NAV = [
  {
    label: "Shared operations",
    href: "#shared",
  },
  {
    label: "What it does",
    href: "#capabilities",
  },
  {
    label: "Getting started",
    href: "#start",
  },
  {
    label: "The platform",
    href: "#ecosystem",
  },
];

/**
 * sharp-accounting's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#15803D",
} as CSSProperties;

const SHARED_FLOW: FlowStep[] = [
  {
    app: "hospitality",
    label: "the kitchen prepares an order",
  },
  {
    app: "stockwave",
    label: "ingredients draw down",
  },
  {
    label: "the cost lands in the right entity's books",
  },
];

const SHARED = [
  {
    title: "Two entities, one operation",
    body: "The hotel and the restaurant are separate legal entities with separate books. The kitchen they share is one operation. The costs of running it are attributed to each entity as they are actually incurred, rather than apportioned afterwards by estimate.",
  },
  {
    title: "Because the inventory account is shared, not copied",
    body: "An inventory account can be shared across the organization while the entries it produces stay scoped to the entity that consumed the stock. That is what makes the shared kitchen work without two sets of numbers that have to be argued into agreement.",
  },
  {
    title: "And every entity keeps its own view",
    body: "Trial balance, profit and loss, and balance sheet are per legal entity, while the owners' view across all of them lives in Orchestrator.",
  },
];

const CAPABILITIES = [
  {
    term: "Multiple legal entities",
    description: "As many as your organization trades under, defined once in Orchestrator and used consistently by every app that has to know which one it is acting for.",
  },
  {
    term: "Double-entry, accrual",
    description: "A real journal and a real chart of accounts, so the books are books rather than a report generated from operational tables.",
  },
  {
    term: "Invoicing",
    description: "Issue an invoice and the stock it commits moves in Stockwave as part of the same act.",
  },
  {
    term: "Purchases",
    description: "Record a purchase against a supplier, an inventory item and a warehouse inventory account, and inventory updates with it.",
  },
  {
    term: "Reporting",
    description: "Trial balance, profit and loss and balance sheet, per entity, from entries that operations wrote rather than entries somebody re-typed.",
  },
];

const ONBOARDING = [
  {
    title: "No connector to inventory or operations",
    body: "The usual first project after buying an accounting package is wiring it to everything that generates entries. There is nothing to wire: Stockwave, sharp-marketplace and the operations apps are already writing here.",
  },
  {
    title: "Your entities are already defined",
    body: "Legal entities, cost centers and departments come from Orchestrator, so setting up the books does not begin by describing the organization for a second time.",
  },
  {
    title: "Your suppliers and customers are shared",
    body: "The organizations you buy from and sell to are the same records sharp-marketplace and sharp-crm work with. A supplier added for a purchase order is not a supplier only accounting knows about.",
  },
  {
    title: "Nothing to procure",
    body: "sharp-accounting comes with the platform and is started from Orchestrator. There is no evaluation and no migration between it and the apps that feed it.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "stockwave",
    line: "Invoices and purchases move stock automatically, and every inventory transaction posts back to the books.",
  },
  {
    app: "marketplace",
    line: "Raise a purchase order that goes straight out to the market, and sell with the entry already recorded.",
  },
  {
    app: "hospitality",
    and: "healthcare",
    line: "Operational activity posts to the books of the legal entity that incurred it, including where an operation is shared.",
  },
  {
    app: "orchestrator",
    line: "Legal entities are defined there, and the owner-level view across all of them lives there too.",
  },
  {
    app: "sharpcrm",
    line: "What each customer is actually worth, against the same customer records operations created.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/overview">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/overview">
        Continue to app
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button asChild size="lg" className="h-12 px-7">
      <a href={`${config.authAppUrl}/signup`}>
        Create an account
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground" style={ACCENT}>
      <WebsiteHeader
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">accounting</span>
            </span>
          </span>
        }
        nav={NAV}
        user={user}
        isPending={isPending}
        continueAction={continueAction}
      />

      <main>
        <WebsiteHero
          eyebrow={"Finance"}
          title={
            <>
              The books reconcile with operations
              <br className="hidden md:inline" /> because they are the same system.
            </>
          }
          lede={"Issue an invoice and stock moves in Stockwave. Record a purchase and inventory updates. Sell through sharp-marketplace and the entry is already made. Double-entry accrual accounting across as many legal entities as your organization trades under — with the operational side of each entry already accounted for."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#shared">The multi-entity case</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="shared"
          eyebrow={"Shared operations"}
          heading={"A hotel and a restaurant under two legal entities can share one kitchen."}
          intro={"This is the case that breaks a stack assembled from separate products. Two entities, one shared operation, and costs that have to land correctly in each entity's books — with nobody doing it by hand at the end of the month."}
        >
          <FlowLine steps={SHARED_FLOW} className="mb-12" />
          <PointList points={SHARED} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          eyebrow={"What it does"}
          heading={"Proper accounting, not a summary of what the other apps did."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"The integration you would normally budget for is not on the list."}
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-accounting"}
          className="border-t-0"
          intro={"Accounting is downstream of almost everything, which is normally why it is the last thing to be right. Here it is the same records."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"Books that were never a separate copy."}
          body={"sharp-accounting comes with the sharpnr platform, sharing records with inventory and operations."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="accounting"
        appName={"sharp-accounting"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">accounting</span>
            </span>
          </span>
        }
        tagline={"Double-entry accrual accounting for multi-entity organizations."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
