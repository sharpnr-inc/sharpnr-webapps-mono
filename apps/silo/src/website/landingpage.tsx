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
import { SiloMark } from "./brand";


const NAV = [
  {
    label: "What it stores",
    href: "#shapes",
  },
  {
    label: "Who can reach it",
    href: "#governed",
  },
  {
    label: "Your own applications",
    href: "#applications",
  },
  {
    label: "The platform",
    href: "#ecosystem",
  },
];

/**
 * Silo's accent, mapped onto the shared `--primary` token so the website
 * kit in @sharpnr/ui picks it up without any per-app styling.
 */
const ACCENT = {
  "--primary": "#2B3AE8",
} as CSSProperties;

const SHAPES = [
  {
    term: "A cloud drive",
    note: "for people",
    description: "Folders your organization works out of, shared inside the org, with another organization, or publicly.",
  },
  {
    term: "Object storage",
    note: "S3-compatible",
    description: "Buckets your applications write to with the S3 client you already use, and a CDN in front of them when you need one.",
  },
  {
    term: "PostgreSQL databases",
    note: "provisioned",
    description: "Databases created for you, with credentials your applications connect with directly. No separate database provider to manage.",
  },
  {
    term: "A data lake",
    note: "with warehouses and pipelines",
    description: "Datasets, warehouses and pipelines, so analytical work happens over the same storage the operational apps write to.",
  },
];

const GOVERNED = [
  {
    title: "Fine-grained on every resource",
    body: "Permission is set on the bucket, the dataset, the database and the folder — not on a product-wide role that has to be right for all of them at once.",
  },
  {
    title: "Governed from Cortex or Orchestrator",
    body: "An organization picks which of the two owns Silo authorization: Cortex if IT should hold it, Orchestrator if it belongs with the owners. Either way it is one console, and Silo is not a second place to re-administer the same people.",
  },
  {
    title: "The same people as everywhere else",
    body: "The employees, teams and cost centers you grant access to are the ones your organization defined for the platform. There is no Silo-specific user list to keep in step.",
  },
  {
    title: "An audit trail that covers all four",
    body: "Activity and audit logs read across drive, object storage, databases and lake together, because they are one system rather than four with four logs.",
  },
];

const APPLICATIONS = [
  {
    title: "Connect directly",
    body: "Your services get bucket credentials and database connection strings from Silo and use them the way they would use any provider. Nothing about that path involves the rest of the platform.",
  },
  {
    title: "One bill's worth of moving parts",
    body: "The object store your application writes to, the database it reads, and the lake your analysts query are the same account with the same permissions — so an engineer adding storage is not also adding a vendor.",
  },
  {
    title: "Nothing to stand up first",
    body: "Silo comes with the platform. There is no procurement step, no migration, and no integration project between it and the apps your organization already runs — those apps are already storing here.",
  },
];

const ECOSYSTEM_LINKS: EcosystemLink[] = [
  {
    app: "cortex",
    and: "orchestrator",
    line: "Whichever your organization uses to govern who can reach what — access to every Silo resource is decided there, not here.",
  },
  {
    app: "folio",
    line: "Documents, sheets and canvases are stored in Silo, and any Silo object can be referenced from inside a document.",
  },
  {
    app: "cables",
    line: "Files are searchable and shareable from inside any conversation, without leaving it to go find them.",
  },
  {
    app: "iam",
    line: "Employee and project documents live here, reachable from the portal the employee already uses.",
  },
  {
    app: "stockwave",
    line: "Operational records and warehouse documents are stored alongside everything else the organization keeps.",
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
            <SiloMark size={26} accent="#2B3AE8" band="currentColor" />
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Silo</span>
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
          eyebrow={"Storage and data platform"}
          title={
            <>
              Four shapes of storage.
              <br className="hidden md:inline" /> One decision about who can
              reach them.
            </>
          }
          lede={"Silo holds your organization's files, its object storage, its databases and its data lake in one place, under one permission model. Four vendors become one system, four bills become none, and there is no longer a question of which of them is the source of truth."}
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7"
              >
                <a href="#shapes">What it stores</a>
              </Button>
            </>
          }
        />

        <WebsiteSection
          id="shapes"
          eyebrow={"What it stores"}
          heading={"One storage layer, in the four shapes an organization actually needs."}
          intro={"These are not four products behind one login. They share a permission model, an audit trail and a single account, so a file and the database row that references it are governed the same way."}
        >
          <DefinitionRows rows={SHAPES} />
        </WebsiteSection>

        <WebsiteSection
          id="governed"
          eyebrow={"Who can reach it"}
          heading={"Access is decided once, in the console your organization already uses for it."}
        >
          <PointList points={GOVERNED} columns={1} />
        </WebsiteSection>

        <WebsiteSection
          id="applications"
          split
          eyebrow={"Your own applications"}
          heading={"Silo is not only for the sharpnr apps."}
        >
          <PointList points={APPLICATIONS} columns={1} />
        </WebsiteSection>


        <EcosystemSection
          appName={"Silo"}
          className="border-t-0"
          intro={"Silo is underneath most of the platform. When another sharpnr app stores something, it stores it here — which is why a file you can see in one app is a file you can already see in the others."}
          links={ECOSYSTEM_LINKS}
        />

        <WebsiteClosing
          heading={"One storage layer, already under your organization."}
          body={"If your organization is on sharpnr, Silo is already holding what the other apps have written."}
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="silo"
        appName={"Silo"}
        brand={
          <span className="flex items-center gap-2.5">
            <SiloMark size={26} accent="#2B3AE8" band="currentColor" />
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight">Silo</span>
            </span>
          </span>
        }
        tagline={"Storage for everything your organization runs on."}
      />
    </div>
  );
}

/** Some routes import this as a default; both spellings resolve here. */
export default LandingPage;
