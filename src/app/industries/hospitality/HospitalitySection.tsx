import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useHospitalityAnimation } from "./animations/useHospitalityAnimation";

const guestJourney = [
  { stage: "Reservation", note: "Availability stays accurate across every location." },
  { stage: "Arrival & check-in", note: "Guest history and requests reach every department." },
  { stage: "Dining", note: "Orders move by POS or QR, straight to the kitchen." },
  { stage: "Kitchen", note: "Every order routed to the right preparation station." },
  { stage: "Room & housekeeping", note: "Rooms, cleaning and maintenance stay coordinated." },
  { stage: "Billing & payment", note: "Split bills, room charges and payments in one flow." },
  { stage: "Accounting", note: "Every event posts to your books automatically." },
  { stage: "Feedback & loyalty", note: "The stay becomes a lasting guest relationship." },
] as const;

const builtFor = [
  "Hotels",
  "Resorts",
  "Restaurants",
  "Fine dining",
  "Casual dining",
  "Cafés",
  "Coffee chains",
  "Bars & pubs",
  "Night clubs",
  "Lounges",
  "Cloud kitchens",
  "Food courts",
  "QSR chains",
  "Bakeries",
  "Dessert parlours",
  "Catering",
  "Hospitality groups",
  "Franchise networks",
] as const;

const poweringTheDay = [
  "Point of sale",
  "QR ordering",
  "Kitchen display",
  "Table management",
  "Room operations",
  "Housekeeping",
  "Inventory",
  "Procurement",
  "Workforce",
  "Loyalty",
  "Accounting",
  "Live insights",
] as const;

/**
 * Section 02 — Hospitality, available today. Visitors follow one
 * guest through the business; the platform stays almost invisible.
 *
 * Full width: the rail is the section, so there is no second column to
 * put anything opposite. Alternation starts at Healthcare below.
 */
export function HospitalitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useHospitalityAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      id="hospitality"
      className="relative scroll-mt-24 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="available" tone="navy" />
            <span className="text-sm text-mute">
              Sharp Operations · Hospitality
            </span>
          </div>
          <SectionIntro
            tone="navy"
            heading={
              <>
                Built for hospitality.
                <br />
                Designed around how you actually operate.
              </>
            }
            lede="Hospitality is fast-paced — every minute matters, and staff coordinate across kitchens, rooms, inventory and suppliers. Your team focuses on guests. Sharpnr keeps the business connected."
          />
        </div>

        {/* One guest, one connected day — alternating rail */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute bottom-6 left-[9px] top-6 w-px bg-sky/15 md:left-1/2">
            <div className="hosp-fill h-full w-full origin-top scale-y-0 bg-cyan/70" />
          </div>
          <ol className="relative space-y-10">
            {guestJourney.map((step, i) => (
              <li
                key={step.stage}
                className={`hosp-step relative flex gap-5 md:w-1/2 md:gap-6 ${
                  i % 2 === 0
                    ? "md:pr-10 md:text-right"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`absolute left-0 top-1 z-10 block size-[19px] rounded-full border-2 border-cyan/60 bg-canvas ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-[9.5px]"
                      : "md:-left-[9.5px]"
                  }`}
                />
                <div className="pl-9 md:pl-0">
                  <h3 className="text-title-md font-semibold text-white">
                    {step.stage}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* What powers the day */}
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
            Powering every one of those moments
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {poweringTheDay.map((c) => (
              <li
                key={c}
                className="rounded-full border border-sky/15 bg-sky/[0.025] px-3.5 py-1.5 text-sm text-sky/85"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Who it's for */}
        <div className="mt-12">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
            Built for
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mute">
            {builtFor.join(" · ")}
          </p>
        </div>

        <p className="prose-width mt-12 text-base text-mute">
          Hospitality becomes even more powerful through the ecosystem — Sharp
          Accounting, Sharp HRMS, Sharp CRMS, Cables, Tasks, Silo, IVA and
          Sharp Marketplace work behind every guest moment. Nothing operates
          in isolation.
        </p>
      </div>
    </section>
  );
}
