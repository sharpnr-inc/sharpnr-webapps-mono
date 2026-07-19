import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useOperationsAnimation } from "./animations/useOperationsAnimation";

const operationalAreas = [
  { title: "Reservations & bookings", line: "Real-time availability across rooms and tables." },
  { title: "Front desk & guests", line: "Check-ins, room assignments and guest history in one place." },
  { title: "Point of sale", line: "Dine-in, takeaway, delivery, room service and split billing." },
  { title: "QR ordering", line: "Digital menus with self-service ordering and payments." },
  { title: "Kitchen display", line: "Every order routed to the right preparation station." },
  { title: "Table management", line: "Occupancy, waitlists and service flow in real time." },
  { title: "Inventory", line: "Ingredients, consumption and wastage tracked from every sale." },
  { title: "Vendor & procurement", line: "Purchase requests and replenishment in one workflow." },
  { title: "Housekeeping", line: "Cleaning, maintenance and inspections, coordinated." },
  { title: "Staff operations", line: "Shifts, attendance and schedules through Sharp HRMS." },
  { title: "Loyalty & guests", line: "Profiles, rewards and memberships through Sharp CRMS." },
  { title: "Analytics & reporting", line: "Live performance across outlets, kitchens and brands." },
] as const;

const businessTypes = [
  "Hotels",
  "Resorts",
  "Restaurants",
  "Fine dining",
  "Cafés",
  "Bars",
  "Night clubs",
  "Cloud kitchens",
  "Food courts",
  "QSR chains",
  "Catering",
  "Multi-brand groups",
  "Franchise networks",
] as const;

const futureExperiences = [
  {
    name: "Healthcare",
    product: "Lifco",
    status: "soon" as const,
    line: "Patients, appointments, records, pharmacy and hospital administration.",
  },
  {
    name: "Retail",
    status: "roadmap" as const,
    line: "Point of sale, inventory, procurement, warehouses and omnichannel stores.",
  },
  {
    name: "Education",
    status: "roadmap" as const,
    line: "Admissions, the student lifecycle, examinations and academic operations.",
  },
  {
    name: "Manufacturing",
    status: "roadmap" as const,
    line: "Production planning, quality control and plant operations.",
  },
  {
    name: "Professional Services",
    status: "roadmap" as const,
    line: "Projects, clients, billing and resource planning.",
  },
] as const;

/**
 * Section 02 — Sharp Operations. The operational product family:
 * Hospitality available today, more industries sharing the same
 * connected foundation over time.
 */
export function OperationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useOperationsAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} id="operations" className="scroll-mt-24 bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            eyebrow="Sharp Operations"
            heading="Built around how your business actually works."
            lede="Every industry deserves software built for the way it operates. Sharp Operations delivers industry-specific experiences while finance, people, communication and intelligence stay connected automatically."
          />
        </div>

        {/* Available today — Hospitality */}
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <h3 className="text-heading-sm font-bold text-navy">
            Sharp Operations · Hospitality
          </h3>
          <StatusBadge kind="available" />
        </div>
        <p className="prose-width mt-3 text-base text-slate-600">
          Whether you're running a single café or managing hotel properties
          across cities, the operational experience adapts to the way your
          business works.
        </p>

        {/* The operational day — one connected experience */}
        <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {operationalAreas.map((area) => (
            <div key={area.title} className="ops-area border-l-2 border-slate-200 pl-5">
              <h4 className="text-base font-semibold text-slate-900">
                {area.title}
              </h4>
              <p className="mt-1 text-sm text-slate-500">{area.line}</p>
            </div>
          ))}
        </div>

        {/* Who it's built for */}
        <div className="mt-14">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Built for
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {businessTypes.map((t) => (
              <li
                key={t}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Connected by default */}
        <div className="mt-14 rounded-2xl bg-navy px-6 py-8 md:px-10">
          <h4 className="text-title-lg font-semibold text-white">
            Connected by default.
          </h4>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            Reservations update guest history. Orders update accounting.
            Inventory updates stock. Employees update payroll. IVA learns from
            every interaction. Nothing is entered twice — everything stays
            connected.
          </p>
        </div>

        {/* Where Sharp Operations goes next */}
        <div className="mt-16">
          <h3 className="text-heading-sm font-bold text-navy">
            Designed to expand into every industry.
          </h3>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {futureExperiences.map((exp) => (
              <div key={exp.name} className="ops-future">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-base font-semibold text-slate-900">
                    Sharp Operations · {exp.name}
                  </h4>
                  <StatusBadge kind={exp.status} />
                </div>
                {"product" in exp && (
                  <p className="mt-1 text-xs text-slate-400">
                    Product name: {exp.product}
                  </p>
                )}
                <p className="mt-2 text-sm text-slate-500">{exp.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
