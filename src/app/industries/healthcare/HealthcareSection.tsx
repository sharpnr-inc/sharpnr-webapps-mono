import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useHealthcareAnimation } from "./animations/useHealthcareAnimation";

const plannedAreas = [
  { title: "Patient management", line: "Complete profiles, history and treatment journeys." },
  { title: "Appointments", line: "Doctors, departments and rooms with real-time scheduling." },
  { title: "Medical records", line: "Consultations, prescriptions and follow-ups, connected." },
  { title: "Pharmacy", line: "Medicines, inventory and dispensing workflows." },
  { title: "Laboratory & diagnostics", line: "Requests and reports tied to the patient's history." },
  { title: "Billing & insurance", line: "Invoices and claims through Sharp Accounting." },
  { title: "Workforce", line: "Doctors, nurses and staff through Sharp HRMS." },
  { title: "Operational insight", line: "Patient flow, utilization and scheduling — with IVA supporting people, never replacing clinical judgment." },
] as const;

const patientJourney = [
  "Appointment booked",
  "Visit confirmed",
  "Doctor consultation",
  "Laboratory investigation",
  "Pharmacy dispenses",
  "Billing & insurance",
  "Follow-up scheduled",
  "History updated",
] as const;

const builtFor =
  "Hospitals · Multi-specialty hospitals · Clinics · Medical centres · Diagnostic laboratories · Imaging centres · Pharmacies · Nursing homes · Wellness centres · Healthcare groups";

/**
 * Section 03 — Healthcare (coming soon, as Lifco). Transparent about
 * availability; focused on connected care, not systems.
 *
 * First of the page's three 50/50 sections: argument left, panel right.
 * Corporate below faces the other way, and Multi-industry faces back —
 * two splits in a row facing the same way reads as a template.
 */
export function HealthcareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useHealthcareAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="soon" tone="navy" />
            <span className="text-sm text-mute">
              Sharp Operations · Healthcare — Lifco
            </span>
          </div>
          <SectionIntro
            tone="navy"
            heading={
              <>
                Healthcare deserves connected care.
                <br />
                Not disconnected systems.
              </>
            }
            lede="Healthcare is built around people — patients, doctors, nurses, pharmacists and administrators, every department depending on another. Lifco is being designed to keep every stage of care connected."
          />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* What's being designed */}
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {plannedAreas.map((area) => (
              <div key={area.title} className="hc-area">
                <h3 className="text-base font-semibold text-white">
                  {area.title}
                </h3>
                <p className="mt-1 text-sm text-mute">{area.line}</p>
              </div>
            ))}
          </div>

          {/* One patient journey */}
          <div className="rounded-2xl border border-sky/15 bg-sky/[0.025] p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
              One patient journey, connected end to end
            </p>
            <ol className="relative mt-6 space-y-4">
              <div className="absolute bottom-3 left-[5px] top-3 w-px bg-sky/20" />
              {patientJourney.map((step) => (
                <li key={step} className="hc-step relative flex items-center gap-4">
                  <span className="relative z-10 block size-[11px] shrink-0 rounded-full border-2 border-cyan/60 bg-canvas" />
                  <span className="text-sm text-mute">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-mute">
          Designed for: {builtFor}
        </p>
      </div>
    </section>
  );
}
