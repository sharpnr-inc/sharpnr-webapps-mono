import { Plus } from "lucide-react";
import { SectionIntro } from "./SectionIntro";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading?: string;
  lede?: string;
  items: FaqItem[];
}

/**
 * Common questions — native <details> so answers work without
 * JavaScript, read well for screen readers, and stay calm.
 */
export function FaqSection({
  heading = "Common questions",
  lede,
  items,
}: FaqSectionProps) {
  return (
    <section className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIntro eyebrow="Questions" heading={heading} lede={lede} size="md" />
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {items.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-title-md font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus
                      className="size-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45"
                      strokeWidth={1.8}
                    />
                  </summary>
                  <p className="prose-width pb-6 text-base leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
