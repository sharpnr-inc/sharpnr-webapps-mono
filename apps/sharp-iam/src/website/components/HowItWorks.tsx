import { LogIn, MousePointerClick, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: LogIn,
    title: "Sign in securely",
    description:
      "Use your Sharpnr identity to access the portal. One secure login connects you to everything you need.",
  },
  {
    icon: MousePointerClick,
    title: "Work from your dashboard",
    description:
      "See tasks, schedules, announcements and approvals in one view, then act on what matters today.",
  },
  {
    icon: Send,
    title: "Submit & track requests",
    description:
      "Raise leave, expenses and other requests, then follow every approval to completion in real time.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Up and running in three steps"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-3xl font-semibold text-muted-foreground/30 font-heading">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
