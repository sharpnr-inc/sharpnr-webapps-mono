import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@sharpnr/ui";
import SectionHeading from "./SectionHeading";

const FAQS = [
  {
    q: "Who can use SharpIAM?",
    a: "Any employee or manager in your organization. Access and visibility adapt to each person's role, so managers see approvals and team tools while employees see their own workspace.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. SharpIAM uses Sharpnr's secure identity layer with session-aware, multi-factor-ready login, so company resources stay protected on every device.",
  },
  {
    q: "Can I access it on mobile?",
    a: "SharpIAM is fully responsive and works from any device with a browser, so your team can stay connected from anywhere.",
  },
  {
    q: "Does it work with the rest of Sharpnr?",
    a: "SharpIAM is integrated with the entire Sharp platform. People, payroll, finance and operations data stay in sync across connected Sharpnr services.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <div className="mt-12 divide-y divide-border rounded-xl border border-border">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-medium text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
