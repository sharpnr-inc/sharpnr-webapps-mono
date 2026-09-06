import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { config } from "@sharpnr/env";
import {
  Button,
  DefinitionRows,
  EcosystemSection,
  PointList,
  WebsiteClosing,
  WebsiteFooter,
  WebsiteHeader,
  WebsiteHero,
  WebsiteSection,
} from "@sharpnr/ui";
import type { EcosystemLink } from "@sharpnr/ui";
import { usePublicCurrentUser } from "@/api/publicClient";

const NAV = [
  {
    label: "Status",
    href: "#status",
  },
  {
    label: "Where it will sit",
    href: "#place",
  },
  {
    label: "The platform",
    href: "#ecosystem",
  },
];

/**
 * sharp-healthcare's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#0E7490",
} as CSSProperties;

const STATUS = [
  {
    title: "What it will be",
    body: "A business-operations application for healthcare organizations — the operational side of running a clinic or a hospital, in the same platform as the inventory, the books and the people.",
  },
  {
    title: "What it is now",
    body: "In development. An alpha release candidate is coming. There is no signup here and nothing to join: when it is ready it will be started for an organization from Orchestrator, like every other app in the platform.",
  },
  {
    title: "What it will not be",
    body: "sharp-healthcare is about running the organization. It makes no clinical claim, and nothing on this page should be read as one.",
  },
];

const PLACE = [
  {
    term: "Stockwave",
    note: "planned",
    description: "Supplies and inventory will draw on the same stock records as the rest of the organization, rather than a separate count kept for the clinic.",
  },
  {
    term: "sharp-accounting",
    note: "planned",
    description: "Operational activity will post to the books of the legal entity that incurred it, the way sharp-hospitality's does.",
  },
  {
    term: "sharp-crm",
    note: "planned",
    description: "Patient records will be held as customer records in the platform, created by the operation rather than entered twice.",
  },
  {
    term: "Cables",
    note: "planned",
    description: "Communication between staff will run on the same platform as everything else, rather than in a system bought for this app alone.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "hospitality",
    line: "The business-operations app that is running today, and the closest sibling to this one.",
  },
  {
    app: "stockwave",
    line: "Inventory and warehouses across the organization, available now.",
  },
  {
    app: "accounting",
    line: "Multi-entity double-entry books, available now.",
  },
  {
    app: "cables",
    line: "Communication attached to the work, in every other sharpnr app.",
  },
  {
    app: "orchestrator",
    line: "Where an organization is set up, and where each app is switched on when it is ready.",
  },
];


export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className="px-4">
      <Link to="/patients">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className="h-12 px-7">
      <Link to="/patients">
        Continue to app
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button asChild size="lg" className="h-12 px-7">
      <a href={config.hospitalityAppUrl}>
        See sharp-hospitality, running today
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
              <span className="text-base font-bold tracking-tight">healthcare</span>
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
          eyebrow={"In development"}
          title={
            <>
              sharp-healthcare is being built.
              <br className="hidden md:inline" /> The rest of the platform is not.
            </>
          }
          lede={"sharp-healthcare will be the business-operations app for healthcare organizations, built into the sharpnr platform alongside sharp-hospitality. An alpha release candidate is coming. Everything it will connect to already exists — so while you wait for this one, the inventory, the books and the communication are there today."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#status">What is coming</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="status"
          eyebrow={"Status"}
          heading={"In development, with an alpha release candidate coming."}
          intro={"This page is here so you know what sharp-healthcare is and where it fits, not to sell you something that is not ready."}
        >
          <PointList points={STATUS} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="place"
          eyebrow={"Where it will sit"}
          heading={"What it will connect to, in the future tense."}
          intro={"None of the following is available in sharp-healthcare yet. It describes the connections the app is being built to have, to the apps that are already running."}
        >
          <DefinitionRows rows={PLACE} />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-healthcare"}
          className="border-t-0"
          intro={"This app is not finished, but the platform it belongs to is running. These are the apps it will work with, and every one of them is available now."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"Not ready yet. The platform around it is."}
          body={"There is nothing to sign up for here. If your organization is on sharpnr, sharp-healthcare will be switched on from Orchestrator when the alpha lands."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="healthcare"
        appName={"sharp-healthcare"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">healthcare</span>
            </span>
          </span>
        }
        tagline={"Business operations for healthcare organizations. In development."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
