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
    label: "One console",
    href: "#console",
  },
  {
    label: "What you manage",
    href: "#surface",
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
 * Cortex's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#4338CA",
} as CSSProperties;

const CONSOLE = [
  {
    title: "The employee asks where they already are",
    body: "Someone who needs access to a database or a bucket asks over Cables, from the app they are working in. There is nothing new for them to learn and no separate portal to remember.",
  },
  {
    title: "IT approves it here",
    body: "The request lands in Cortex against the actual resource in Silo, so approving it is granting the permission — not writing a note that somebody then has to go and action somewhere else.",
  },
  {
    title: "The records are the same records",
    body: "The employee in the request, the device they were issued, and the permission being granted all refer to the same person in the same organization. Nothing has to be reconciled between three systems afterwards.",
  },
];

const SURFACE = [
  {
    term: "Devices and assets",
    description: "The laptops and hardware issued to employees: which asset is with which person, and what condition it is in.",
  },
  {
    term: "Device insights",
    description: "Reporting across the fleet, so the state of the hardware your organization owns is a question with an answer.",
  },
  {
    term: "Access to Silo resources",
    description: "Which employees can reach which object storage, which data lake objects and which databases — set per resource, not per product.",
  },
  {
    term: "Database health",
    description: "Monitoring on the PostgreSQL databases Silo provisions, in the console that also decides who can connect to them.",
  },
  {
    term: "Access requests",
    description: "Requests raised by employees over Cables, approved here against the resource they name.",
  },
];

const ONBOARDING = [
  {
    title: "No directory sync",
    body: "The people you administer are the employees your organization defined once in Orchestrator. There is no connector between an identity provider and a device manager, because there are not two systems to connect.",
  },
  {
    title: "No agent to distribute before it is useful",
    body: "The resources you are granting access to — buckets, databases, datasets — are in Silo, part of the same platform. Governing them starts the moment Cortex is switched on for your organization.",
  },
  {
    title: "One permission model",
    body: "The policies and roles you define here are the platform's, not a Cortex dialect of them. What you grant is understood by every app that reads the same model.",
  },
  {
    title: "Cortex or Orchestrator, not both",
    body: "An organization picks which console owns Silo authorization. If the owners should hold it, that is Orchestrator; if IT should, it is here. The choice is made once and the other console does not shadow it.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "silo",
    line: "Govern access to every storage resource — buckets, databases, datasets and drive folders.",
  },
  {
    app: "cables",
    line: "Access requests arrive as conversations from the employee, instead of as tickets in a separate queue.",
  },
  {
    app: "orchestrator",
    line: "The alternative governance path, for organizations where owner-level control should hold Silo authorization.",
  },
  {
    app: "iam",
    line: "The employees and the devices issued to them are the same records the employee portal reads.",
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
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Cortex</span>
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
          eyebrow={"For IT administrators"}
          title={
            <>
              The fleet and the data permissions,
              <br className="hidden md:inline" /> in one console.
            </>
          }
          lede={"Which laptop is issued to whom, and which employees can reach which bucket, database and dataset in Silo, are usually two different products bought at two different times. In Cortex they are one console over one set of records — the same employees the rest of your organization's platform already knows about."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#console">How it fits together</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="console"
          eyebrow={"One console"}
          heading={"Requests arrive in the conversation the employee was already having."}
          intro={"An access request usually means a ticket in a system the employee had to be taught to use, sitting in a queue away from anything else. Here it starts as a message in Cables and is approved in Cortex."}
        >
          <PointList points={CONSOLE} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="surface"
          eyebrow={"What you manage"}
          heading={"Assets and access, over the same set of employees."}
        >
          <DefinitionRows rows={SURFACE} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"Nothing to import. The employees and the assets are already in here."}
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"Cortex"}
          className="border-t-0"
          intro={"Cortex governs the parts of the platform that need an administrator, which puts it next to the apps that hold the assets and the data."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"One console for the hardware and the data."}
          body={"Cortex comes with the sharpnr platform, already holding your organization's employees and assets."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="cortex"
        appName={"Cortex"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Cortex</span>
            </span>
          </span>
        }
        tagline={"The IT console for your organization's hardware and data."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
