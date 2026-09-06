import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { config } from "@sharpnr/env";
import {
  Button,
  DefinitionRows,
  EcosystemSection,
  PlatformStrip,
  PointList,
  WebsiteClosing,
  WebsiteFooter,
  WebsiteHeader,
  WebsiteHero,
  WebsiteSection,
} from "@sharpnr/ui";
import type { EcosystemLink } from "@sharpnr/ui";
import { usePublicCurrentUser } from "@/api/publicClient";
import { HeroDiagram, Texture } from "./Visuals";

const NAV = [
  {
    label: "Already holding your people",
    href: "#belonging",
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
 * sharp-hr's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#7C3AED",
} as CSSProperties;

const BELONGING = [
  {
    title: "No import",
    body: "Your employees are the ones your organization set up in Orchestrator, with their departments, cost centers and entities already attached. There is no first migration and no reconciliation afterwards.",
  },
  {
    title: "No identity integration",
    body: "Everyone signs in with the same sharpnr account they use for every other app. There is no directory to connect, no provisioning to configure, and no leaver process that quietly misses one system.",
  },
  {
    title: "No export to finance",
    body: "Payroll lands in the books in sharp-accounting, against the legal entity the employee belongs to. It is not a file somebody produces and somebody else imports.",
  },
  {
    title: "The employee side already exists",
    body: "The portal your staff use for leave, claims and payslips is sharp-iam, reading these same records. You are not rolling out a self-service front end as a second project.",
  },
];

const CAPABILITIES = [
  {
    term: "Payroll",
    description: "Run against employee records that the rest of the platform is already working from, with the result posting to the books.",
  },
  {
    term: "Employee records",
    description: "The employee file — details, documents, privileges and history — as one record rather than a row in several systems.",
  },
  {
    term: "Leave and attendance",
    description: "Applications arriving from the portal employees already use, against entitlements defined once.",
  },
  {
    term: "Onboarding and offboarding",
    description: "Joining and leaving as processes over the same records every other app resolves a person against.",
  },
  {
    term: "Training and performance",
    description: "What has been assigned and what has been reviewed, held against the employee rather than in a separate tool.",
  },
];

const ONBOARDING = [
  {
    title: "Nothing to procure",
    body: "sharp-hr comes with the platform. It is started for your organization from Orchestrator — there is no evaluation, no purchase and no implementation partner between deciding and using it.",
  },
  {
    title: "Nothing to integrate",
    body: "No connector to finance, no sync to the identity provider, no nightly job to watch. The apps it would have integrated with are reading the same records.",
  },
  {
    title: "Permissions are already decided",
    body: "Who in the HR team can see what follows the organization's permission model, set once at the platform level rather than administered again here.",
  },
  {
    title: "Familiar from the first screen",
    body: "The same navigation, search and Cables panel as every other sharpnr app your team already uses.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "iam",
    line: "The employee-facing side of the same records — leave, claims, payslips and documents.",
  },
  {
    app: "accounting",
    line: "Payroll lands in the books, against the legal entity the employee belongs to.",
  },
  {
    app: "cables",
    line: "HR communication and announcements, in the place the organization already talks.",
  },
  {
    app: "orchestrator",
    line: "The employee directory, departments and cost centers this app works from are defined there.",
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
              <span className="text-base font-bold tracking-tight">hr</span>
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
          eyebrow={"For the HR team"}
          title={
            <>
              An HR system you do not have to
              <br className="hidden md:inline" /> buy, connect, or migrate into.
            </>
          }
          lede={"sharp-hr is the HR team's application; sharp-iam is the employee's portal. Both work from the same records — the employees your organization defined once for the whole platform — so payroll runs against the people that operations, projects and accounting are already working with."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#belonging">Why that matters</a>
              </Button>
            </>
          }
        />

        <PlatformStrip appId="hr" />

        <WebsiteSection
          id="belonging"
          eyebrow={"Already holding your people"}
          heading={"The employee file was never somewhere else."}
          intro={"Most of the cost of an HR system is not the software. It is the import, the identity integration, the payroll export to finance, and the year in which two systems disagree about how many people work here."}
        >
          <PointList points={BELONGING} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          muted
          eyebrow={"What it does"}
          heading={"The HR team's side of the organization."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"Turning it on, rather than rolling it out."}
        >
          <PointList points={ONBOARDING} columns={1} numbered />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-hr"}
          className="border-t-0"
          intro={"HR normally sits at the end of a row of integrations. Here it is holding the same employee records as everything else in the platform."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          texture={<Texture className="rotate-180" />}
          heading={"The HR system is already holding your employees."}
          body={"sharp-hr comes with the sharpnr platform. sharp-iam is the employee's side of it."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="hr"
        appName={"sharp-hr"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">hr</span>
            </span>
          </span>
        }
        tagline={"HR for your organization, in the same platform as the work."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
