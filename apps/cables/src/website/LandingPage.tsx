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
import { usePublicCurrentUser } from "@/api/queries";
import { CablesLockup, CablesMark } from "./BrandMark";

const NAV = [
  { label: "Attached to the work", href: "#attached" },
  { label: "What it does", href: "#capabilities" },
  { label: "Getting started", href: "#start" },
  { label: "The platform", href: "#ecosystem" },
];

/**
 * Cables keeps its own ink/paper/patch ground, so the shared website kit --
 * which is written against the semantic tokens -- is handed the brand palette
 * through those tokens rather than being special-cased per component.
 */
const CABLES_TOKENS = {
  "--background": "#0b0a09",
  "--foreground": "#ede8e1",
  "--muted-foreground": "#7e766c",
  "--border": "#241f1b",
} as CSSProperties;

const ACCENT = "bg-patch text-ink hover:bg-patch/85";

/** The lead argument: a conversation belongs to a record in another app. */
const ATTACHED = [
  {
    term: "A project",
    note: "in sharp-iam",
    description:
      "opens with its channel already there, and the people on the project are already in it.",
  },
  {
    term: "A warehouse",
    note: "in Stockwave",
    description:
      "has a channel, so a question about stock is asked next to the stock.",
  },
  {
    term: "A document",
    note: "in Folio",
    description:
      "carries its own channel, and the discussion stays on the document instead of scattering across DMs.",
  },
  {
    term: "A negotiation",
    note: "in sharp-marketplace",
    description:
      "is a conversation with the other organization, not a mail thread nobody else can see.",
  },
  {
    term: "An access request",
    note: "in Cortex",
    description:
      "starts as a message from the employee and is approved by IT, without a ticket queue in between.",
  },
];

const CAPABILITIES = [
  {
    title: "Channels",
    body: "For a team, a department, or the whole organization — open to the org or limited to the people who should be in them.",
  },
  {
    title: "Direct and group messages",
    body: "Message anyone in the organization, across any team, without working out who they report to first.",
  },
  {
    title: "Calls and video",
    body: "One-to-one audio and video, started from the conversation you are already having.",
  },
  {
    title: "Town halls",
    body: "One room the whole organization can be in, for the things everyone is meant to hear at once.",
  },
  {
    title: "Search",
    body: "Across every conversation you are part of — channels, direct messages and groups together.",
  },
  {
    title: "Files from Silo",
    body: "Find any file the organization stores and share it into the conversation without leaving it.",
  },
  {
    title: "Aware of the organization",
    body: "Cables knows your teams, projects and resources, because those are the same records every other sharpnr app reads.",
  },
];

const ONBOARDING = [
  {
    title: "Nobody gets invited",
    body: "There are no invite links to send and no directory to build. Your colleagues are the employees your organization already defined in Orchestrator, so the roster is right on the first day and stays right when someone joins or leaves.",
  },
  {
    title: "You sign in once",
    body: "The same sharpnr account you use for every other app. No separate workspace to join, no second password, no per-app identity to keep in step.",
  },
  {
    title: "Nothing to connect",
    body: "Cables reaches into Silo, sharp-iam and Stockwave with no connector, no API key and no sync job to watch. Those are not external systems it integrates with — they are the same platform. Turning Cables on is a switch in Orchestrator, not a project.",
  },
  {
    title: "Permissions are already decided",
    body: "Who can see which channel follows the organization's permission model, set once at the platform level rather than administered again in here.",
  },
];

export function LandingPage() {
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;

  const continueAction = (
    <Button asChild size="sm" className={`px-4 ${ACCENT}`}>
      <Link to="/home">
        Continue to app
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  const primaryCta = user ? (
    <Button asChild size="lg" className={`h-12 px-7 ${ACCENT}`}>
      <Link to="/home">
        Continue to app
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button asChild size="lg" className={`h-12 px-7 ${ACCENT}`}>
      <a href={`${config.authAppUrl}/signup`}>
        Create an account
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );

  return (
    <div
      className="dark min-h-screen bg-ink font-mono text-paper"
      style={CABLES_TOKENS}
    >
      <WebsiteHeader
        brand={
          <span className="flex items-center gap-3">
            <CablesMark className="h-8 w-8 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-[0.24em] text-paper-muted uppercase">
                sharpnr
              </span>
              <span className="text-base font-bold tracking-tight lowercase text-paper">
                cables
              </span>
            </span>
          </span>
        }
        nav={NAV}
        user={user}
        isPending={isPending}
        continueAction={continueAction}
        ctaClassName={ACCENT}
        scrolledClassName="border-b border-ink-line bg-ink/90 backdrop-blur-md"
      />

      <main>
        <WebsiteHero
          className="relative overflow-hidden border-ink-line"
          mark={<CablesMark animated className="h-12 w-12" />}
          title={
            <>
              The conversation about a thing
              <br className="hidden md:inline" /> lives{" "}
              <span className="text-patch">on the thing</span>.
            </>
          }
          lede="Cables is the communication layer for the sharpnr platform. It is not an app you switch into — it is present in every other sharpnr app, so the message about an order sits next to the order, and a ping reaches you wherever in the platform you happen to be working."
          actions={
            <>
              {primaryCta}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-ink-line px-7 text-paper-dim hover:bg-ink-raised hover:text-paper"
              >
                <a href="#attached">How it fits together</a>
              </Button>
            </>
          }
        >
          {/* The patch bay: a field of unused ports, kept faint enough that it
              stays behind the type rather than competing with it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(63,58,52,0.5) 1.5px, transparent 1.6px)",
              backgroundSize: "28px 28px",
              maskImage: "linear-gradient(to bottom, black, transparent 75%)",
            }}
          />
        </WebsiteHero>

        <WebsiteSection
          id="attached"
          className="border-ink-line"
          eyebrow="Attached to the work"
          heading="You do not go to Cables to find the conversation. You are already looking at what it is about."
          intro="A record in another sharpnr app is not linked out to a chat somewhere else. It carries the conversation, because one platform holds both."
        >
          <DefinitionRows rows={ATTACHED} className="border-ink-line" />
        </WebsiteSection>

        <WebsiteSection
          id="capabilities"
          className="border-ink-line"
          eyebrow="What it does"
          heading="Everything you would expect from a chat app, and one thing you would not."
        >
          <PointList points={CAPABILITIES} />
        </WebsiteSection>

        <WebsiteSection
          id="start"
          split
          className="border-ink-line"
          eyebrow="Getting started"
          heading="There is no rollout. Your organization is already in here."
        >
          <PointList points={ONBOARDING} columns={1} />
        </WebsiteSection>

        <EcosystemSection
          appName="Cables"
          className="border-t-0 border-b border-ink-line"
          intro="Cables is not a destination. It is the layer the rest of the platform talks through, which is why the most useful thing about it is always happening somewhere else."
          links={[
            {
              app: "iam",
              line: "Every project gets its own channel, with the people on the project already in it.",
            },
            {
              app: "folio",
              line: "Every document gets its own channel, so feedback stays with the document.",
            },
            {
              app: "stockwave",
              line: "Every warehouse gets its own channel, for the floor and the people reading the numbers.",
            },
            {
              app: "silo",
              line: "Find and share any file the organization stores without leaving the conversation.",
            },
            {
              app: "cortex",
              line: "Employees request access to a system here, and IT approves it there.",
            },
            {
              app: "marketplace",
              line: "Negotiate a deal directly with the other organization, in the conversation the order comes out of.",
            },
            {
              app: "sharpcrm",
              line: "Talk to customers from the same place you talk to colleagues.",
            },
          ]}
        />

        <WebsiteClosing
          heading="Patch your people in."
          body="If your organization runs on sharpnr, Cables is already part of it."
          actions={primaryCta}
        />
      </main>

      <WebsiteFooter
        appId="cables"
        appName="Cables"
        brand={<CablesLockup />}
        tagline="The communication layer for the sharpnr platform."
      />
    </div>
  );
}
