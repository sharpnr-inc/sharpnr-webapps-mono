import type { ReactNode } from "react";

export interface Capability {
  id: string;
  eyebrow: string;
  heading: ReactNode;
  lede: string;
  accomplish: string[];
  why: string;
  journey: string[];
  journeyClose: string;
  poweredBy: string[];
  alongside: string[];
  extra?: ReactNode;
}

/* Everyday examples for Knowledge & Intelligence — knowledge is
   useful for everyone, not just leadership. */
const knowledgeAudiences = [
  { who: "Business leaders", what: "See how the business is doing, and where it could grow." },
  { who: "Finance teams", what: "Spot the odd number before it becomes a problem." },
  { who: "Operations teams", what: "Find where the day keeps getting stuck." },
  { who: "Sales & customer teams", what: "Know which customers are worth going back to." },
  { who: "Technology teams", what: "Find the documentation instead of asking around for it." },
  { who: "Every employee", what: "Get an answer without interrupting somebody else." },
] as const;

/**
 * The business capabilities — Services page content.
 * Structure per spec: story → outcomes → why it matters →
 * connected experience → powered by.
 *
 * Two rules this file is easy to break.
 *
 *   Names come from `sharpnr.md`, verbatim (design.md §10) — Sharp-HR, not
 *   "Sharp HRMS"; Sharp-CRM, not "Sharp CRMS"; OpenSharp IAM, not "Sharp
 *   IAM". Tasks is not a product of its own, it is something an employee
 *   opens OpenSharp IAM to do. "Sharp Operations" is the family name and is
 *   used here because these lists sit beside Sharp-Accounting and its
 *   siblings; the edition form "Sharp Operations · Hospitality" belongs
 *   wherever the hospitality edition specifically is meant.
 *
 *   IVA has no shipping product behind it. Wherever it appears it is
 *   written as being designed, never as something already answering
 *   questions.
 */
export const capabilities: Capability[] = [
  {
    id: "financial-management",
    eyebrow: "Financial management",
    heading: (
      <>
        Sell today,
        <br />
        <span className="text-twilight">the books already know.</span>
      </>
    ),
    lede: "In most businesses the books get written up after the fact, then reconciled at month end. Here a sale posts itself, so the figures are current whenever you look.",
    accomplish: [
      "Keep the books current without writing them up twice",
      "Run several companies and legal entities from one place",
      "See how the business is doing today, not last month",
      "Have the paperwork ready when an audit asks for it",
      "Look at one entity, or all of them together",
    ],
    why: "Nobody should have to wait until month end to find out how the business did. When the books keep up, the number in front of you is today's number.",
    journey: [
      "A customer places an order",
      "The team delivers it",
      "The customer is billed",
      "The books update on their own",
      "The figures on screen move with them",
      "You decide with something current",
    ],
    journeyClose: "One sale. The books already know.",
    poweredBy: ["Sharp-Accounting"],
    alongside: ["Sharp Operations", "Sharp-HR", "Sharp-CRM", "Sharp-Marketplace", "Silo"],
  },
  {
    id: "people-workforce",
    eyebrow: "People & workforce",
    heading: (
      <>
        Hire once,
        <br />
        <span className="text-twilight">everything else follows.</span>
      </>
    ),
    lede: "Hiring, payroll, attendance and training all read the same employee record. Nobody sets the same person up in four places.",
    accomplish: [
      "Get a new starter set up on their first morning",
      "Run attendance, shifts and payroll from one record",
      "Give people the access their job needs, and no more",
      "Keep training and feedback with the person, not in a folder",
      "Let staff handle their own leave, payslips and requests",
      "Change someone's role once and have it hold everywhere",
    ],
    why: "Managers shouldn't be chasing approvals and nobody should be typing the same person in twice. One record means everyone is looking at the same thing.",
    journey: [
      "A new employee joins",
      "Their record is created once",
      "Access is set up from their role",
      "They land in the right teams",
      "Their first tasks are waiting",
      "Their manager sees progress as it happens",
    ],
    journeyClose: "One employee. One record behind them.",
    poweredBy: ["Sharp-HR"],
    alongside: ["OpenSharp IAM", "Cables", "Folio", "Sharp-Accounting"],
  },
  {
    id: "customer-relationships",
    eyebrow: "Customer relationships",
    heading: (
      <>
        One customer,
        <br />
        <span className="text-twilight">one story everywhere.</span>
      </>
    ),
    lede: "In most businesses sales knows one version of a customer and support knows another. Here there is one, and everyone is reading it.",
    accomplish: [
      "Take an enquiry without losing what was said",
      "Build up a customer's history as they keep coming back",
      "Reward the regulars because you can see who they are",
      "Know which customers are worth more, and why",
      "Give the same welcome at every branch",
    ],
    why: "A customer doesn't experience your business department by department. When every team shares one history, you stop asking them to repeat themselves.",
    journey: [
      "Someone gets in touch",
      "The enquiry is logged once",
      "It becomes a booking or a sale",
      "What they like is remembered",
      "The next offer actually suits them",
      "Support already knows the story",
    ],
    journeyClose: "One customer. One history behind them.",
    poweredBy: ["Sharp-CRM"],
    alongside: ["Sharp Operations", "Sharp-Accounting", "Cables", "Silo"],
  },
  {
    id: "communication-collaboration",
    eyebrow: "Communication & collaboration",
    heading: (
      <>
        From conversation,
        <br />
        <span className="text-twilight">to finished work.</span>
      </>
    ),
    lede: "Talk it through, write it down, get it done — without copying anything between three apps. The work stays attached to the conversation that started it.",
    accomplish: [
      "Talk to anyone in the organization without leaving the work",
      "Write and edit documents together, at the same time",
      "Turn what was agreed into work someone owns",
      "Find the decision again months later",
      "Keep a project moving without a status meeting",
    ],
    why: "Teams don't win by talking more. They win when nothing gets lost between the talking and the doing.",
    journey: [
      "A project starts",
      "The team talks it through",
      "The notes become a shared document",
      "What was agreed becomes work someone owns",
      "Progress shows up where the conversation began",
    ],
    journeyClose: "One conversation. Nothing retyped after it.",
    poweredBy: ["Cables", "Folio", "OpenSharp IAM"],
    alongside: ["Silo"],
  },
  {
    id: "identity-governance",
    eyebrow: "Identity, security & governance",
    heading: (
      <>
        One login,
        <br />
        <span className="text-twilight">and only what&rsquo;s yours.</span>
      </>
    ),
    lede: "People join, move teams and leave. You can see who can reach what, why they can, and what they did with it.",
    accomplish: [
      "Give one login that opens everything a person should see",
      "Hand out access by the job someone does",
      "Keep the sensitive things away from everyone else",
      "Apply the same rules across every branch and company",
      "Look back at who changed what, and when",
    ],
    why: "Security shouldn't slow anyone down. Access follows the role, so it is right on someone's first day and right again the day they move.",
    journey: [
      "A new employee joins",
      "One identity is created for them",
      "Their role decides what opens",
      "Apps, documents and channels appear",
      "The role changes; what they can reach changes with it",
      "Every change is on the record",
    ],
    journeyClose: "One login. One record of who did what.",
    poweredBy: ["OpenSharp IAM", "Cortex"],
    alongside: ["Sharp-HR", "Cables", "Folio"],
  },
  {
    id: "knowledge-intelligence",
    eyebrow: "Knowledge & intelligence",
    heading: (
      <>
        Ask a question,
        <br />
        <span className="text-twilight">get an answer.</span>
      </>
    ),
    lede: "Most businesses aren't short of information — they're short of it in one place. Everyday work builds up here into something you can actually put a question to.",
    accomplish: [
      "See how the business is doing without assembling it by hand",
      "Notice a problem while there is still time to fix it",
      "Find what the business already knows, when you need it",
      "Hand off the repetitive jobs nobody should be doing",
      "Give everyone the same figures to argue from",
    ],
    /* IVA has no shipping product behind it — the Products page marks it
       "Soon" — so this stays in designed-language. The journey below is
       written the same way for the same reason. */
    why: "The point isn't more data, it's a straight answer. IVA is being designed to give one, and to act only where policy already allows it — people stay in control.",
    journey: [
      "“Why has business slowed this week?”",
      "The day's work is already recorded",
      "Sales, staffing and customers sit together",
      "IVA is designed to explain what happened",
      "And to suggest what to do about it",
      "You decide whether to do it",
    ],
    journeyClose: "One question. One place to ask it.",
    poweredBy: ["Silo", "IVA"],
    alongside: ["every Sharpnr product"],
    extra: (
      <div className="mt-14">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
          Useful for everyone — not just leadership
        </p>
        <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeAudiences.map((a) => (
            <div key={a.who} className="border-t border-sky/15 pt-4">
              <h3 className="text-sm font-semibold text-white">{a.who}</h3>
              <p className="mt-1 text-sm text-mute">{a.what}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "business-network",
    eyebrow: "Business network",
    heading: (
      <>
        Your suppliers,
        <br />
        <span className="text-twilight">on the same platform.</span>
      </>
    ),
    lede: "Suppliers usually live in somebody's inbox and a spreadsheet. On Sharp-Marketplace they sit beside the orders and the books, and nothing is taken in commission.",
    accomplish: [
      "Find other businesses already on Sharpnr",
      "Buy from them without leaving the platform",
      "Keep the messages, documents and approvals in one thread",
      "Have the supplier and the entry created for you",
      "Sell to them as well as buy from them",
    ],
    why: "Buying is faster when the supplier is already in the same system as the order. Nothing is taken in commission — and payments still settle outside the platform for now.",
    journey: [
      "You need to restock",
      "You find a supplier already on Sharpnr",
      "The conversation starts",
      "What you need is agreed",
      "The order goes through",
      "The supplier and the entry appear in your books",
    ],
    journeyClose: "One order. Nothing entered by hand.",
    poweredBy: ["Sharp-Marketplace"],
    alongside: ["Sharp-Accounting", "Cables", "Folio", "Silo"],
  },
];
