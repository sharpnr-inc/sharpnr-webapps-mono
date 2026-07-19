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
 */
export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEducationAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="roadmap" />
            <span className="text-sm text-slate-500">
              Sharp Operations · Education
            </span>
          </div>
          <SectionIntro
            align="center"
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
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute inset-x-4 top-[5px] hidden h-px bg-slate-300 md:block">
            <div className="edu-fill h-full w-full origin-left scale-x-0 bg-blue/60" />
          </div>
          <ol className="flex flex-col gap-5 md:flex-row md:justify-between">
            {studentJourney.map((stage) => (
              <li key={stage} className="edu-stage flex items-center gap-4 md:flex-col md:gap-3">
                <span className="relative z-10 block size-[11px] rounded-full border-2 border-blue/60 bg-white" />
                <span className="text-sm font-medium text-slate-600">{stage}</span>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mx-auto mt-16 grid max-w-3xl gap-x-10 gap-y-3 sm:grid-cols-2">
          {plannedAreas.map((area) => (
            <li key={area} className="edu-area border-l-2 border-slate-200 pl-4 text-sm text-slate-600">
              {area}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-500">
          Designed for schools, colleges, universities, coaching institutes,
          training centres, professional academies and multi-campus
          institutions. IVA assists administrators and educators — educational
          decisions stay with people.
        </p>
      </div>
    </section>
  );
}
