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
    label: "Live references",
    href: "#references",
  },
  {
    label: "What you can make",
    href: "#formats",
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
 * Folio's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#0F766E",
} as CSSProperties;

const REFERENCES = [
  {
    title: "Reference anything in Silo",
    body: "Any object the organization stores — a file in the drive, an object in a bucket, a dataset in the lake — can be referenced from inside a document rather than pasted into it as a copy that immediately goes stale.",
  },
  {
    title: "Mentioning grants access",
    body: "When you mention a Silo object in a document, the people you are collaborating with can reach it. The permission follows the mention, so nobody has to file a request to read the thing you just pointed them at.",
  },
  {
    title: "There is one copy",
    body: "The document points at the object in Silo instead of embedding a duplicate. Update the object and every document referring to it is referring to the new version.",
  },
  {
    title: "The discussion is attached",
    body: "Every file carries its own Cables channel, so feedback lives on the document rather than scattering across direct messages and a mail thread.",
  },
];

const FORMATS = [
  {
    term: "Documents",
    description: "Written work, collaborated on in real time, with the people editing it visible while they do.",
  },
  {
    term: "Spreadsheets",
    description: "Sheets that live in the same library as everything else, and can reference the same Silo objects a document can.",
  },
  {
    term: "Whiteboard canvases",
    description: "Boards for diagrams and planning, for the work that is easier drawn than written.",
  },
  {
    term: "PDFs",
    description: "Kept and shared alongside the rest, rather than in whichever folder somebody downloaded them to.",
  },
];

const ONBOARDING = [
  {
    title: "Your colleagues are already here",
    body: "Sharing a document means picking from the employees and teams your organization defined once at the platform level — not building a Folio-specific contact list and keeping it current.",
  },
  {
    title: "Storage was never a separate decision",
    body: "Files go to Silo, where the rest of your organization's data already is. There is no storage quota to buy for the document tool specifically, and no export path to worry about later.",
  },
  {
    title: "The same navigation as every other app",
    body: "The same search, the same permissions model, the same Cables panel. If someone in your organization can use one sharpnr app, most of Folio is already familiar.",
  },
  {
    title: "Turning it on is a switch",
    body: "Folio is started for your organization from Orchestrator. There is nothing to procure, nothing to install, and no data to migrate in from wherever documents used to live.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "silo",
    line: "Every file is stored here, and any Silo object can be referenced live from inside a document.",
  },
  {
    app: "cables",
    line: "Every file gets its own channel, so the conversation about a document stays on the document.",
  },
  {
    app: "iam",
    line: "Project documentation sits with the project, reachable by the people working on it.",
  },
  {
    app: "orchestrator",
    and: "cortex",
    line: "Sharing follows the organization's permission model, decided in whichever console your organization uses.",
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
              <span className="text-base font-bold tracking-tight">Folio</span>
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
          eyebrow={"Documents, sheets and canvases"}
          title={
            <>
              A document that can hold
              <br className="hidden md:inline" /> more than text.
            </>
          }
          lede={"A standalone editor holds words. A Folio document holds a live reference to an object in Silo — and mentioning that object hands your collaborators access to it in the same motion. No second permission request, no re-uploading a copy for the people who could not open the first one."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#references">How references work</a>
              </Button>
            </>
          }
        />

        <PlatformStrip appId="folio" />

        <WebsiteSection
          id="references"
          eyebrow={"Live references"}
          heading={"Mention a file, and the person reading can open it."}
          intro={"The awkward part of sharing a document has never been the document. It is the four files it refers to, which the reader does not have access to and has to ask for one at a time."}
        >
          <PointList points={REFERENCES} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="formats"
          muted
          eyebrow={"What you can make"}
          heading={"Four formats, one library, real-time throughout."}
        >
          <DefinitionRows rows={FORMATS} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          eyebrow={"Getting started"}
          heading={"You are not setting up a document tool. You are opening one your organization already has."}
        >
          <PointList points={ONBOARDING} columns={1} numbered />
        </WebsiteSection>


        <EcosystemSection
          appName={"Folio"}
          className="border-t-0"
          intro={"Folio is where the organization writes things down, which means it sits next to almost everything else the platform holds."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          texture={<Texture className="rotate-180" />}
          heading={"Write it down where the rest of the data already is."}
          body={"Folio comes with the sharpnr platform, holding the same files as every other app in it."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="folio"
        appName={"Folio"}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Folio</span>
            </span>
          </span>
        }
        tagline={"Documents that can reach the rest of your organization's data."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
