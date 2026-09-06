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
    label: "Work and conversation",
    href: "#projects",
  },
  {
    label: "What you can do here",
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
 * sharp-iam's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#0369A1",
} as CSSProperties;

const PROJECTS = [
  {
    title: "A project carries its own channel",
    body: "Every project has a Cables channel, with the people on the project already in it. Nobody creates the channel, invites the members, or explains which of the six similarly-named channels is the current one.",
  },
  {
    title: "And its own documents",
    body: "Project files live in Silo alongside everything else the organization stores, reachable from the project rather than from whoever last had them.",
  },
  {
    title: "Tracked where the work is",
    body: "The project tracker is part of the portal you already open for leave and payslips, not a separate product with a separate login and a separate idea of who your colleagues are.",
  },
  {
    title: "Across teams, without arranging it",
    body: "Collaborating with someone in another team does not require an administrator to grant anything first. They are in the same organization, defined once at the platform level.",
  },
];

const CAPABILITIES = [
  {
    term: "Projects",
    description: "The work you are on, with a built-in tracker, a channel and its documents attached.",
  },
  {
    term: "Leave",
    description: "Apply for leave and see where the application is, without asking anyone where the application is.",
  },
  {
    term: "Reimbursements",
    description: "Raise an expense claim against the cost center it belongs to, and follow it through.",
  },
  {
    term: "HR communication",
    description: "Announcements and the conversation with the HR team, in the same place as the rest of it.",
  },
  {
    term: "Training and courses",
    description: "What you have been assigned and what you have completed, held against your own record.",
  },
  {
    term: "Your records",
    description: "Payslips, contracts, benefits, attendance and documents — the employee's view of what sharp-hr holds.",
  },
];

const ONBOARDING = [
  {
    title: "One account",
    body: "The same sign-in as every other sharpnr app your organization uses. No new password, no separate employee portal credentials to be issued and then forgotten.",
  },
  {
    title: "Your details are already correct",
    body: "Your team, your cost center, your manager and your entitlements come from the organization your company defined once. You are not filling in a profile that duplicates what HR already has.",
  },
  {
    title: "Familiar from the first screen",
    body: "The same navigation, the same search and the same Cables panel as the other sharpnr apps. If you have used one, most of this one is already known.",
  },
  {
    title: "Request access from here",
    body: "Need a system or a device? Ask over Cables and IT approves it in Cortex. There is no ticketing tool to learn for the two times a year you need one.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "cables",
    line: "A channel per project, with the people on the project already in it.",
  },
  {
    app: "silo",
    line: "Project and personal documents, stored where the rest of the organization's files are.",
  },
  {
    app: "hr",
    line: "The HR team's side of the same records: payroll and the employee file this portal shows you.",
  },
  {
    app: "cortex",
    line: "Request access to systems and devices, approved by IT against the actual resource.",
  },
  {
    app: "folio",
    line: "Project documentation, written and collaborated on in the same platform.",
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
              <span className="text-base font-bold tracking-tight">iam</span>
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
          eyebrow={"For employees"}
          title={
            <>
              Everything you need from the company,
              <br className="hidden md:inline" /> on the account you already have.
            </>
          }
          lede={"Leave, reimbursements, documents, training, and the projects you are actually working on — in one portal, signed in with the same account as every other sharpnr app. sharp-iam is the employee's side of the organization; sharp-hr is the HR team's side of the same records."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#projects">How projects work</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="projects"
          eyebrow={"Work and conversation"}
          heading={"The work, the conversation about the work, and the files are one record."}
          intro={"Project tracking is included here rather than bought separately — and because it is part of the platform, a project is not just a list of tasks in a tool that knows nothing else about your organization."}
        >
          <PointList points={PROJECTS} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          eyebrow={"What you can do here"}
          heading={"The things you would otherwise email someone about."}
        >
          <DefinitionRows rows={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"There is nothing for you to set up. You are already in it."}
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"sharp-iam"}
          className="border-t-0"
          intro={"The portal is where an employee meets the rest of the platform, so most of what is useful in it is shared with another app."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"One portal, on the account you already use."}
          body={"If your organization runs on sharpnr, sharp-iam is already holding your record."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="iam"
        appName={"sharp-iam"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">iam</span>
            </span>
          </span>
        }
        tagline={"The employee portal for your organization."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
