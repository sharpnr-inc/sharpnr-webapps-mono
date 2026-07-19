import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useEcosystemEffectAnimation } from "./animations/useEcosystemEffectAnimation";

const journeys = [
  {
    title: "A guest checks in",
    steps: [
      "A room is booked",
      "Sharp Operations receives the reservation",
      "The guest profile updates in Sharp CRMS",
      "Housekeeping gets a preparation task",
      "Front desk is notified through Cables",
      "Accounting prepares the records",
      "IVA watches occupancy trends",
    ],
    close: "Nothing entered twice. Nothing synchronized later.",
  },
  {
    title: "A new employee joins",
    steps: [
      "HR creates the employee in Sharp HRMS",
      "Sharp IAM creates secure access",
      "Cables adds them to the right channels",
      "Tasks creates the onboarding checklist",
      "Folio prepares the documents",
      "They start with everything ready",
    ],
    close: "One employee. One workflow. Every department connected.",
  },
  {
    title: "Procurement without friction",
    steps: [
      "Inventory hits its reorder level",
      "IVA recommends replenishment",
      "Sharp Marketplace suggests verified suppliers",
      "Suppliers respond through Cables",
      "The purchase order is approved",
      "Stock and accounting update automatically",
    ],
    close: "A connected business process — not disconnected paperwork.",
  },
  {
    title: "An owner asks a question",
    steps: [
      "“Why were sales lower this week?”",
      "IVA reviews operations, customers and pricing",
      "It checks staffing and inventory",
      "It explains what happened and why",
      "It recommends improvements",
      "Approved follow-ups become tasks",
    ],
    close: "One question. One answer. The whole organization considered.",
  },
  {
    title: "Secure access in seconds",
    steps: [
      "“Give Sarah access to Financial Reports.”",
      "IVA checks identity and policies",
      "Authorized: access granted immediately",
      "Otherwise: routed for approval automatically",
      "Audit logs update on their own",
    ],
    close: "Governance never slows the business down.",
  },
] as const;

const traditional = [
  "Separate databases",
  "Duplicate data entry",
  "Manual exports",
  "Endless integrations",
  "Disconnected reporting",
  "Multiple logins",
] as const;

const connected = [
  "One connected platform",
  "One knowledge foundation",
  "One identity",
  "One business understanding",
  "One intelligent assistant",
  "One connected experience",
] as const;

/**
 * Section 07 — The ecosystem effect. Not integrations: complete
 * business journeys where every completed action triggers the next.
 */
export function EcosystemEffectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEcosystemEffectAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="The ecosystem effect"
            heading={
              <>
                Every product is powerful.
                <br />
                Together, they become transformational.
              </>
            }
            lede="Software may integrate — the business never truly does. Because every Sharpnr product shares one platform, work flows instead of being transferred. Here's what that looks like."
          />
        </div>

        <div className="mt-20 space-y-16 md:space-y-20">
          {journeys.map((journey, i) => (
            <article
              key={journey.title}
              className="effect-journey grid gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-last lg:text-right" : ""}`}>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Journey {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-heading-sm font-bold text-navy">
                  {journey.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-slate-600">
                  {journey.close}
                </p>
              </div>
              <div className="lg:col-span-8">
                <ol className="relative space-y-4">
                  <div className="absolute bottom-3 left-[5px] top-3 w-px bg-slate-200" />
                  {journey.steps.map((step) => (
                    <li key={step} className="effect-step relative flex items-start gap-4">
                      <span className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-2 border-blue/60 bg-white" />
                      <span className="text-sm leading-relaxed text-slate-600 md:text-base">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>

        {/* The connected advantage */}
        <div className="effect-advantage mx-auto mt-24 max-w-3xl">
          <h3 className="text-center text-heading-sm font-bold text-navy">
            The connected advantage.
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Traditional software
              </p>
              <ul className="mt-4 space-y-2.5">
                {traditional.map((t) => (
                  <li key={t} className="text-sm text-slate-500">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
                Sharpnr
              </p>
              <ul className="mt-4 space-y-2.5">
                {connected.map((c) => (
                  <li key={c} className="text-sm font-medium text-slate-800">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
