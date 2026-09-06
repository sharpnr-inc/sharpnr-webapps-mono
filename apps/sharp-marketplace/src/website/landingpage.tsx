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
    label: "After the yes",
    href: "#after",
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
 * sharp-marketplace's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#B45309",
} as CSSProperties;

const AFTER_FLOW: FlowStep[] = [
  {
    app: "cables",
    label: "you negotiate directly",
  },
  {
    label: "the purchase is confirmed",
  },
  {
    app: "accounting",
    label: "the entry is recorded",
  },
  {
    app: "stockwave",
    label: "stock reflects it",
  },
];

const AFTER = [
  {
    title: "The negotiation is a conversation",
    body: "You talk to the other organization over Cables rather than in a mail thread nobody else on either side can see. When the deal is done, the record of how it got there is attached to it.",
  },
  {
    title: "The entry records itself",
    body: "A confirmed purchase or sale is already an entry in sharp-accounting, against the right legal entity. No export, no month-end catch-up.",
  },
  {
    title: "Stock reflects it without re-entry",
    body: "Orders flow into Stockwave as orders. The warehouse is not waiting on somebody to forward a confirmation email before the count is right.",
  },
  {
    title: "Buying works the same way in reverse",
    body: "A purchase order raised in sharp-accounting goes straight out to the market, rather than being printed, attached and sent to a supplier who re-enters it at their end.",
  },
];

const CAPABILITIES = [
  {
    term: "List and sell",
    description: "Your organization publishes what it offers, and sells to other organizations on the platform.",
  },
  {
    term: "Browse and buy",
    description: "Find what another organization offers and purchase it, with the resulting order and entry already handled.",
  },
  {
    term: "Requests for quotation",
    description: "Put a requirement out and take quotations back, with the negotiation happening in the conversation rather than across attachments.",
  },
  {
    term: "Orders",
    description: "The orders you have placed and received, in the same records that inventory and the books are reading.",
  },
];

const ONBOARDING = [
  {
    title: "Your organization is already the seller",
    body: "The entity you trade as, the people authorized to act for it, and the catalogue behind it are already defined at the platform level. There is no separate merchant profile to build and keep current.",
  },
  {
    title: "Fulfilment is not a second integration",
    body: "What you sell draws on Stockwave, and what you agree posts to sharp-accounting. Those connections do not need configuring, because they are not connections.",
  },
  {
    title: "You already know how to talk to buyers",
    body: "Negotiation happens in Cables, the same place your organization talks to itself. Nobody has to learn a marketplace messaging system that exists only here.",
  },
  {
    title: "Nothing to procure",
    body: "sharp-marketplace comes with the platform and is switched on for your organization from Orchestrator.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "cables",
    line: "Negotiate directly with the other organization, in a conversation attached to the deal.",
  },
  {
    app: "accounting",
    line: "Confirmed deals record themselves, and a purchase order raised in the books goes straight out to the market.",
  },
  {
    app: "stockwave",
    line: "Orders flow into inventory as orders, with nothing re-entered between the two.",
  },
  {
    app: "sharpcrm",
    line: "The organizations you sell to are the same customer records your other apps work with.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/browse">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/browse">
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
              <span className="text-base font-bold tracking-tight">marketplace</span>
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
          eyebrow={"Business to business"}
          title={
            <>
              The interesting part is
              <br className="hidden md:inline" /> what happens after "yes".
            </>
          }
          lede={"Organizations list and sell services here, and buy from each other. The negotiation happens over Cables, so the conversation and the transaction are not in two places — and a confirmed purchase is already an entry in sharp-accounting and already reflected in Stockwave."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#after">Follow a deal through</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="after"
          eyebrow={"After the yes"}
          heading={"A confirmed deal does not become somebody's data entry."}
          intro={"Agreeing terms with another organization is the easy half. The half that costs time is everything after it — the order, the entry, the stock, and the three people who each type the same numbers into a different system."}
        >
          <FlowLine steps={AFTER_FLOW} className="mb-12" />
          <PointList points={AFTER} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          eyebrow={"What it does"}
          heading={"Organization to organization, not a storefront for consumers."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"Selling here does not start with setting up a seller account."}
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-marketplace"}
          className="border-t-0"
          intro={"A marketplace is only as useful as what happens once a deal closes. Here that is three apps' worth of work that nobody has to do."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"Trade with other organizations, not with their inboxes."}
          body={"sharp-marketplace comes with the sharpnr platform, connected to the books and the stock it moves."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="marketplace"
        appName={"sharp-marketplace"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">marketplace</span>
            </span>
          </span>
        }
        tagline={"Where organizations buy and sell with each other."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
