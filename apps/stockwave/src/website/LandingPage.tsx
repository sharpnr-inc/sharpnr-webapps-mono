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
import { Logo } from "./Logo";


const NAV = [
  {
    label: "Why the count holds",
    href: "#writeback",
  },
  {
    label: "Warehouses",
    href: "#warehouses",
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
 * Stockwave's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#863BFF",
} as CSSProperties;

const WRITEBACK_FLOW: FlowStep[] = [
  {
    app: "accounting",
    label: "raises an invoice",
  },
  {
    label: "stock is reduced here",
  },
  {
    label: "the entry is already in the books",
  },
];

const WRITEBACK = [
  {
    title: "A sale reduces stock",
    body: "An invoice issued in sharp-accounting draws the items down here. The accountant is not sending a message to the warehouse, and the warehouse is not adjusting a spreadsheet to match.",
  },
  {
    title: "A purchase increases it",
    body: "Recording a purchase updates inventory, against the warehouse and the inventory account it belongs to. One entry, both effects.",
  },
  {
    title: "An order arrives already entered",
    body: "An order placed through sharp-marketplace comes in as an order, not as an email somebody has to transcribe before the day's count means anything.",
  },
  {
    title: "Operations draw it down as they serve",
    body: "A restaurant running on sharp-hospitality consumes ingredients from the same stock as it prepares them, so the kitchen and the count do not drift apart over a service.",
  },
];

const WAREHOUSES = [
  {
    term: "Multiple warehouses",
    description: "Stock held in as many places as you actually hold it, with on-hand, reserved and available quantities per location.",
  },
  {
    term: "By cost center and location",
    description: "Warehouses belong to the cost centers your organization defined once in Orchestrator, so what a location costs is attributable without a second mapping.",
  },
  {
    term: "Order intake",
    description: "Sales orders and purchase orders arriving from the apps that raise them, and from the people who raise them here.",
  },
  {
    term: "Movement between them",
    description: "Transfers, receiving, returns and stock takes, with the ledger effect of each one landing in the books rather than waiting for a month-end reconciliation.",
  },
];

const ONBOARDING = [
  {
    title: "No connector to the accounting system",
    body: "The most expensive integration in a stock deployment is the one to the books, and it does not exist here: sharp-accounting is reading and writing these same records.",
  },
  {
    title: "Your locations are already defined",
    body: "Warehouses attach to the cost centers your organization set up in Orchestrator. You are not re-entering the shape of the business into an inventory product.",
  },
  {
    title: "Nothing to procure",
    body: "Stockwave comes with the platform and is started for your organization from Orchestrator. There is no evaluation, no purchase and no rollout project in front of using it.",
  },
  {
    title: "The warehouse has a channel",
    body: "Each warehouse carries its own Cables channel, so the question about a discrepancy is asked next to the number, by people who are already signed in.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "accounting",
    line: "Every inventory transaction posts to the books, and every invoice and purchase moves stock here.",
  },
  {
    app: "marketplace",
    line: "Orders from other organizations arrive as orders, with nothing re-entered in between.",
  },
  {
    app: "hospitality",
    and: "healthcare",
    line: "Operations draw on this stock as they run, so consumption and the count are the same event.",
  },
  {
    app: "cables",
    line: "A channel per warehouse, for the floor and the people reading the numbers.",
  },
  {
    app: "silo",
    line: "Operational records and warehouse documents are stored with the rest of the organization's files.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/dashboard">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/dashboard">
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
            <Logo className="size-7" />
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Stockwave</span>
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
          eyebrow={"Inventory"}
          title={
            <>
              Stock stays correct because
              <br className="hidden md:inline" /> nobody re-keys it.
            </>
          }
          lede={"Every app that touches inventory writes to these records. An invoice raised in sharp-accounting moves stock. A purchase updates it. An order from sharp-marketplace arrives without anyone typing it in. There is no sync between systems, because there is only one system."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#writeback">See how it moves</a>
              </Button>
            </>
          }
        />

        <PlatformStrip appId="stockwave" />

        <WebsiteSection
          id="writeback"
          eyebrow={"Why the count holds"}
          heading={"The number moves when the business does."}
          intro={"Inventory goes wrong in the gap between systems: the sale happened over here, the stock lives over there, and something has to carry it across. Remove the gap and the usual causes of a wrong count go with it."}
        >
          <FlowLine steps={WRITEBACK_FLOW} className="mb-12" />
          <PointList points={WRITEBACK} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="warehouses"
          muted
          eyebrow={"Warehouses"}
          heading={"Multiple warehouses, organized the way the business is."}
        >
          <DefinitionRows rows={WAREHOUSES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"The hard part of inventory software is usually the wiring. There isn't any."}
        >
          <PointList points={ONBOARDING} columns={1} numbered />
        </WebsiteSection>


        <EcosystemSection
          appName={"Stockwave"}
          className="border-t-0"
          intro={"Stockwave is written to by the apps around it far more often than it is opened directly. That is the point."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          texture={<Texture className="rotate-180" />}
          heading={"One count, written by everything that touches it."}
          body={"Stockwave comes with the sharpnr platform, already sharing records with the books and the operations apps."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="stockwave"
        appName={"Stockwave"}
        brand={
          <span className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Stockwave</span>
            </span>
          </span>
        }
        tagline={"Inventory and warehouse management for the whole organization."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
