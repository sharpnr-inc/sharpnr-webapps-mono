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
import { usePublicCurrentUser } from "@/apis/Queries";
import { HeroDiagram, Texture } from "./Visuals";

const NAV = [
  {
    label: "Above the apps",
    href: "#above",
  },
  {
    label: "What you control",
    href: "#control",
  },
  {
    label: "Comes with the platform",
    href: "#included",
  },
  {
    label: "The platform",
    href: "#ecosystem",
  },
];

/**
 * Orchestrator's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#1E293B",
} as CSSProperties;

const ABOVE = [
  {
    title: "One organization",
    body: "Legal entities, cost centers, departments and the employee directory are set up here. Every app in the platform is looking at that, so a new employee is added once and is immediately who they should be in accounting, inventory, HR and the rest.",
  },
  {
    title: "One permission model",
    body: "Who can do what is decided here, across the platform, rather than administered app by app in eleven different permission screens that gradually disagree with each other.",
  },
  {
    title: "A view across every entity",
    body: "Owners see the whole organization at once, including across legal entities — which is the view that stops existing the moment each part of a business runs on its own software.",
  },
  {
    title: "Services are turned on from here",
    body: "Cables, Silo, Folio, Cortex and the rest are started for your organization in this console. Adding one to your organization is switching it on, not evaluating and buying it.",
  },
];

const CONTROL = [
  {
    term: "Legal entities",
    description: "The entities your organization actually trades under, which the books, the properties and the operations apps are all scoped by.",
  },
  {
    term: "Cost centers and departments",
    description: "Defined once, with their locations, and used by the apps that need to attribute cost or organize work by them.",
  },
  {
    term: "The employee directory",
    description: "The people in your organization, and the record every other app resolves a person against.",
  },
  {
    term: "Authorization",
    description: "Policies, roles and user groups for the whole platform, including — if your organization chooses — authorization over Silo resources.",
  },
  {
    term: "Each app's service state",
    description: "Which sharpnr services are started for your organization, and which are currently active.",
  },
];

const INCLUDED = [
  {
    title: "It is already there",
    body: "Orchestrator is not a separate purchase, a separate deployment or a separate thing to evaluate. It is where a sharpnr organization is set up, so it exists from the moment your organization does.",
  },
  {
    title: "There is nothing to connect it to",
    body: "A governance layer over eleven products normally means eleven integrations, each with its own scope and its own way of going stale. There is nothing to connect here — the apps are reading the same records this console writes.",
  },
  {
    title: "The setup happens once",
    body: "Your organization is configured through a setup process in this console. After that, adding an app does not restart the question of who your employees are or what your entities are called.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "silo",
    line: "Govern storage authorization at the owner level, when that should sit with the owners rather than with IT.",
  },
  {
    app: "cortex",
    line: "The IT-level console. Orchestrator sits above it, and an organization picks which of the two owns Silo authorization.",
  },
  {
    app: "accounting",
    line: "Visibility across every legal entity, in one place rather than one set of books at a time.",
  },
  {
    app: "cables",
    line: "Channels for the organization are provisioned from here, along with the service itself.",
  },
  {
    app: "iam",
    and: "hr",
    line: "The employees both apps work with are the directory defined in this console.",
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
              <span className="text-base font-bold tracking-tight">Orchestrator</span>
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
          eyebrow={"For owners and stakeholders"}
          title={
            <>
              Set the organization up once.
              <br className="hidden md:inline" /> Every app reads it.
            </>
          }
          lede={"Orchestrator sits above the individual apps rather than inside one. Your legal entities, cost centers, departments, employees and permissions are defined here, and the rest of the platform is downstream of that — so an organization is configured once, not eleven times."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#above">What that means</a>
              </Button>
            </>
          }
        />

        <PlatformStrip appId="orchestrator" />

        <WebsiteSection
          id="above"
          eyebrow={"Above the apps"}
          heading={"The organization is defined in one place and inherited everywhere."}
          intro={"The reason a company ends up administering the same people in six products is that each product carries its own copy of the org chart. Here there is one copy, and the apps read it."}
        >
          <PointList points={ABOVE} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="control"
          muted
          eyebrow={"What you control"}
          heading={"Organization-wide, not app-by-app."}
        >
          <DefinitionRows rows={CONTROL} />
        </WebsiteSection>

        <WebsiteSection
          id="included"
          split
          eyebrow={"Comes with the platform"}
          heading={"This is not a governance product you bolt on."}
        >
          <PointList points={INCLUDED} columns={1} numbered />
        </WebsiteSection>


        <EcosystemSection
          appName={"Orchestrator"}
          className="border-t-0"
          intro={"Orchestrator does not sit beside the other apps. It is the console the rest of the platform reads its organization from."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          texture={<Texture className="rotate-180" />}
          heading={"The top-down view, without a top-down project."}
          body={"Orchestrator is where a sharpnr organization is set up, so it is already there when you get here."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="orchestrator"
        appName={"Orchestrator"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Orchestrator</span>
            </span>
          </span>
        }
        tagline={"The super-admin console for owners and stakeholders."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
