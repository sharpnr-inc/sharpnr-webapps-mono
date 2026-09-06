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
    label: "Where customers come from",
    href: "#origin",
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
 * sharp-crm's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#BE185D",
} as CSSProperties;

const ORIGIN_FLOW: FlowStep[] = [
  {
    app: "hospitality",
    label: "a guest checks in",
  },
  {
    label: "the customer record exists here",
  },
  {
    label: "loyalty and value follow from it",
  },
];

const ORIGIN = [
  {
    title: "Operations create the record",
    body: "A guest served in sharp-hospitality is a customer here. Nobody re-enters them at the end of the week, and there is no import that has to be de-duplicated afterwards.",
  },
  {
    title: "Loyalty runs on real activity",
    body: "The loyalty programme reads what the customer actually did, because the operational record and the customer record are the same record.",
  },
  {
    title: "Value comes from the books",
    body: "What a customer is worth is answered from sharp-accounting rather than from whatever was last typed into an opportunity field.",
  },
  {
    title: "Selling to organizations, too",
    body: "The organizations you trade with on sharp-marketplace are customers here as well, so business-to-business and direct customers sit in one place.",
  },
];

const CAPABILITIES = [
  {
    term: "Customer records",
    description: "The people and organizations your business serves, created by the operations that served them.",
  },
  {
    term: "Loyalty rewards",
    description: "A programme running on what customers actually did, rather than on a separate loyalty database that has to be fed.",
  },
  {
    term: "Customer communication",
    description: "Reach customers over Cables, from the same place your organization talks to itself.",
  },
  {
    term: "Pipeline and quotes",
    description: "Leads, quotations and the pipeline behind them, against the same customer records everything else uses.",
  },
];

const ONBOARDING = [
  {
    title: "It comes with the platform",
    body: "sharp-crm is not a product you evaluate, buy and then spend a quarter populating. It is started for your organization from Orchestrator, already holding the customers your operations created.",
  },
  {
    title: "Nothing to connect it to",
    body: "The usual CRM project is connecting it to the systems that know about customers. Those systems are the apps beside it, reading the same records.",
  },
  {
    title: "Your team is already in it",
    body: "Who can see which customers follows the organization's permission model, over the employees defined once at the platform level.",
  },
  {
    title: "Familiar from the first screen",
    body: "The same navigation, search and Cables panel as every other sharpnr app, so learning it is mostly not learning it.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "hospitality",
    and: "healthcare",
    line: "Customers appear automatically from the operations that served them, with nothing entered twice.",
  },
  {
    app: "cables",
    line: "Reach customers directly, on the same platform your organization talks on.",
  },
  {
    app: "marketplace",
    line: "The organizations you sell to are the same records here.",
  },
  {
    app: "accounting",
    line: "What each customer is worth, from the books rather than from an estimate.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/home">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/home">
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
              <span className="text-base font-bold tracking-tight">crm</span>
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
          eyebrow={"Customers"}
          title={
            <>
              The customer record was created
              <br className="hidden md:inline" /> by the business, not by data entry.
            </>
          }
          lede={"A guest checking into a hotel in sharp-hospitality is a customer record here, without anyone entering them twice. The loyalty programme runs on operational data because it is the same data — and what a customer is worth comes from the books rather than from an estimate."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#origin">How records arrive</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="origin"
          eyebrow={"Where customers come from"}
          heading={"Nobody types the customer in."}
          intro={"The reason CRMs go stale is that keeping them current is somebody's separate job. Here the record is created by the operation that served the customer, which is the one moment the details are definitely correct."}
        >
          <FlowLine steps={ORIGIN_FLOW} className="mb-12" />
          <PointList points={ORIGIN} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          eyebrow={"What it does"}
          heading={"Customer records, loyalty, and a way to reach them."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"There is no import step, because there is nothing to import from."}
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-crm"}
          className="border-t-0"
          intro={"A CRM is only as good as the data it is fed. This one is fed by the apps that actually meet the customer."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"The customers are already here."}
          body={"sharp-crm comes with the sharpnr platform, fed by the apps that meet your customers."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="sharpcrm"
        appName={"sharp-crm"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">crm</span>
            </span>
          </span>
        }
        tagline={"Customer relationships, connected to the operations that create them."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
