import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { config } from "@sharpnr/env";
import {
  Button,
  DefinitionRows,
  EcosystemSection,
  FlowLine,
  PlatformStrip,
  PointList,
  WebsiteClosing,
  WebsiteFooter,
  WebsiteHeader,
  WebsiteHero,
  WebsiteSection,
} from "@sharpnr/ui";
import type { EcosystemLink, FlowStep } from "@sharpnr/ui";
import { usePublicCurrentUser } from "@/api/publicClient";
import { HeroDiagram, Texture } from "./Visuals";

const NAV = [
  {
    label: "The shared kitchen",
    href: "#kitchen",
  },
  {
    label: "What it runs",
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
 * sharp-hospitality's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#A16207",
} as CSSProperties;

const KITCHEN_FLOW: FlowStep[] = [
  {
    label: "an order is taken at the POS",
  },
  {
    label: "it routes to the right kitchen screen",
  },
  {
    app: "stockwave",
    label: "ingredients draw down",
  },
  {
    app: "accounting",
    label: "the cost lands in that entity's books",
  },
];

const KITCHEN = [
  {
    title: "Orders route across multiple screens",
    body: "One kitchen can serve more than one outlet, with orders routed to the right display for the station that has to make them.",
  },
  {
    title: "Stock moves as you serve",
    body: "Ingredients draw down from Stockwave as orders are prepared, so the count reflects the service rather than trailing a day behind it.",
  },
  {
    title: "Costs land in the right entity",
    body: "Where the hotel and the restaurant are separate legal entities sharing one operation, the costs are attributed to each in sharp-accounting as they are incurred — not apportioned by estimate at month end.",
  },
  {
    title: "Guests become customers",
    body: "A guest served here is a customer record in sharp-crm, with loyalty attached, without anyone typing them in a second time.",
  },
];

const CAPABILITIES = [
  {
    term: "Hotel reservations",
    description: "Bookings, guests and checkouts, with the guest record shared with the rest of the platform.",
  },
  {
    term: "Point of sale",
    description: "Restaurants and bars taking orders and payment, against the same stock and the same books.",
  },
  {
    term: "Kitchen display systems",
    description: "Order routing across multiple displays, so a kitchen serving several outlets sends each ticket where it belongs.",
  },
  {
    term: "Table management",
    description: "Tables and covers for restaurants and bars, held with the orders they carry.",
  },
  {
    term: "Multiple properties and entities",
    description: "Hotels, restaurants and bars, each attached to the legal entity that operates it.",
  },
];

const ONBOARDING = [
  {
    title: "No middleware between POS and books",
    body: "The integration a hospitality group normally pays for — the one that carries sales into accounting and consumption into inventory — is not built here. Those apps are reading the same records.",
  },
  {
    title: "Your entities and properties are already defined",
    body: "Legal entities and cost centers come from Orchestrator, so setting up a property does not begin with describing the company again.",
  },
  {
    title: "Your staff already have accounts",
    body: "The people running the floor are the employees your organization defined once, and sharp-hr and sharp-iam are working from those same records.",
  },
  {
    title: "Front of house and kitchen can talk",
    body: "Cables is in here too, so the conversation between the floor, the kitchen and management is on the same platform as the orders.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "stockwave",
    line: "Inventory draws down as you serve, and updates without anyone reconciling it afterwards.",
  },
  {
    app: "accounting",
    line: "Multi-entity books, with shared operations costed correctly to each entity.",
  },
  {
    app: "sharpcrm",
    line: "Guests become customer records with loyalty attached, entered once.",
  },
  {
    app: "hr",
    and: "iam",
    line: "The staff, their records and the portal they use are the same people the floor is run by.",
  },
  {
    app: "cables",
    line: "Front of house, kitchen and management in one place.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/workspace">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/workspace">
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
              <span className="text-base font-bold tracking-tight">hospitality</span>
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
          texture={<Texture />}
          aside={<HeroDiagram />}
          eyebrow={"Business operations"}
          title={
            <>
              A hotel and a restaurant
              <br className="hidden md:inline" /> can share one kitchen.
            </>
          }
          lede={"Reservations, point of sale, kitchen displays and table management, on the same platform as your inventory and your books. Two legal entities can run one kitchen between them: orders route to the right screen, ingredients draw down from Stockwave, and the costs land correctly in each entity's books."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#kitchen">Follow an order through</a>
              </Button>
            </>
          }
        />

        <PlatformStrip appId="hospitality" />

        <WebsiteSection
          id="kitchen"
          eyebrow={"The shared kitchen"}
          heading={"One order, four systems' worth of consequences, none of them re-keyed."}
          intro={"A hospitality business normally runs a reservation system, a POS, a kitchen display, an inventory tool and an accounting package from five vendors — and then pays someone to keep them talking to each other. Here they are one system."}
        >
          <FlowLine steps={KITCHEN_FLOW} className="mb-12" />
          <PointList points={KITCHEN} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          muted
          eyebrow={"What it runs"}
          heading={"The floor, the kitchen and the front desk."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"Five vendors' worth of setup that you do not do."}
        >
          <PointList points={ONBOARDING} columns={1} numbered />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-hospitality"}
          className="border-t-0"
          intro={"Hospitality touches stock, money and people every few minutes. Each of those is another sharpnr app holding the same records."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          texture={<Texture className="rotate-180" />}
          heading={"One system, from the reservation to the ledger."}
          body={"sharp-hospitality comes with the sharpnr platform, sharing stock, books and people with the rest of it."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="hospitality"
        appName={"sharp-hospitality"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">hospitality</span>
            </span>
          </span>
        }
        tagline={"Run hotels, restaurants and bars on the platform your business already runs on."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
