import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useEducationAnimation } from "./animations/useEducationAnimation";

const studentJourney = [
  "Enquiry",
  "Application",
  "Enrollment",
  "Classes",
  "Assignments",
  "Examinations",
  "Results",
  "Graduation",
  "Alumni",
] as const;

const plannedAreas = [
  "Admissions & onboarding",
  "Student information & attendance",
  "Academic & curriculum planning",
  "Faculty management",
  "Examinations & report cards",
  "Fees through Sharp Accounting",
  "Parent communication",
  "Hostels, libraries & campus operations",
] as const;

/**
 * Section 06 — Education (roadmap). Organized around the complete
 * student journey — every milestone leading to the next.
 *
 * Left-aligned like every other industry section. It used to be centred,
 * which put a centred section in the middle of the page and then went back
 * to left-aligned ones: once a page starts centring it should stay centred
 * to the end, so the centring belongs to Multi-industry and the finale
 * rather than here.
 */
export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEducationAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="roadmap" tone="navy" />
            <span className="text-sm text-mute">
              Sharp Operations · Education
            </span>
          </div>
          <SectionIntro
            tone="navy"
            heading={
              <>
                Built for education.
                <br />
                Designed around the complete student journey.
              </>
            }
            lede="Every student begins with an application. Admissions become enrollments, classes become examinations, results become graduation — while teachers, administrators and parents stay connected throughout."
          />
        </div>

        {/* The student lifecycle — one continuous line */}
        <div className="relative mt-16">
          <div className="absolute inset-x-4 top-[5px] hidden h-px bg-sky/15 md:block">
            <div className="edu-fill h-full w-full origin-left scale-x-0 bg-cyan/70" />
          </div>
          <ol className="flex flex-col gap-5 md:flex-row md:justify-between">
            {studentJourney.map((stage) => (
              <li key={stage} className="edu-stage flex items-center gap-4 md:flex-col md:gap-3">
                <span className="relative z-10 block size-[11px] shrink-0 rounded-full border-2 border-cyan/60 bg-canvas" />
                <span className="text-sm font-medium text-sky/85">{stage}</span>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {plannedAreas.map((area) => (
            <li key={area} className="edu-area border-l border-sky/20 pl-4 text-sm text-mute">
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-mute">
          Designed for schools, colleges, universities, coaching institutes,
          training centres, professional academies and multi-campus
          institutions. IVA assists administrators and educators — educational
          decisions stay with people.
        </p>
      </div>
    </section>
  );
}
