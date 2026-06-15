import { FEATURES } from "../data/features";
import SectionHeading from "./SectionHeading";

const Features = () => {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Everything in one place"
          title="A complete employee workspace"
          description="From the first login to payslips, approvals and reports — SharpIAM covers the full self-service experience for employees and managers."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
