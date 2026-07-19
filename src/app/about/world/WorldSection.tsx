import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useWorldAnimation } from "./animations/useWorldAnimation";

/**
 * Section 02 — The world we see. The observation that led to
 * Sharpnr: businesses became connected; their software didn't.
 */
export function WorldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useWorldAnimation({ sectionRef, bodyRef });

  return (
    <section ref={sectionRef} id="story" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={bodyRef} className="mx-auto max-w-2xl">
          <SectionIntro
            eyebrow="The world we see"
            heading={
              <>
                Businesses already work together.
                <br />
                Their software should too.
              </>
            }
            lede="Finance depends on operations. Operations depend on people. Customers influence every decision, and suppliers affect every outcome. Nothing in a business happens in isolation."
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              Yet for decades, software has been designed around departments.
              Finance software. HR software. CRM software. Project software.
              Each solved an individual problem. Very few solved the problem of
              working together.
            </p>
            <p>
              So information gets copied. Processes get repeated. Teams spend
              valuable time moving work between systems instead of moving the
              business forward.
            </p>
            <p>
              The problem isn't that businesses need more software. It's that
              businesses need software that understands how everything
              connects.
            </p>
          </div>

          {/* The idea, in one line */}
          <blockquote className="world-quote my-14 border-l-2 border-cyan pl-6">
            <p className="text-heading-sm font-bold text-navy md:text-heading-md">
              Business is already connected.
              <br />
              Software should be too.
            </p>
          </blockquote>

          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              We don't believe businesses should spend their time maintaining
              software. They should spend it serving customers, supporting
              employees, making better decisions and growing with confidence.
            </p>
            <p>
              Technology should quietly support the business — not become
              another job to manage. That's the future we believe organizations
              deserve, and it's why Sharpnr exists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
