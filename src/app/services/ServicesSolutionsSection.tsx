import { useRef } from "react";
import { Check, Factory, ShoppingBag } from "lucide-react";
import { useServicesSolutionsAnimation } from "./animations/useServicesSolutionsAnimation";

const solutions = [
  {
    badge: "Live",
    name: "Sharp-Hospitality",
    pain: "Hotels, restaurants, and resorts run on chaos.",
    pitch:
      "Separate systems for the front desk, the kitchen, the bar, and the books — and none of them talk. Sharp-Hospitality brings order: one platform for every property, every kitchen, and every order, with accounting that records itself.",
    features: [
      "Point of Sale, table management, and KDS",
      "Hotel room reservations, check-in, and room service",
      "Digital menus, QR ordering, takeaway, and delivery",
      "Shared kitchens and menus across multiple businesses",
      "Inventory, stock, and supplier management",
      "Automatic integration with Sharp-Accounting",
      "Multi-branch, multi-property, multi-legal-entity",
      "Staff and shift management",
    ],
  },
  {
    badge: "Coming Soon",
    name: "Lifco",
    pain: "Healthcare runs on paper trails and phone calls.",
    pitch:
      "Hospitals, clinics, diagnostic centers, and pharmacies juggle disconnected records, schedules, and billing. Lifco unifies patient care and operations on one platform — connected to the same accounting and HR core as the rest of your organization.",
    features: [
      "Patient management and medical records",
      "Appointment scheduling",
      "Doctor and staff management",
      "Pharmacy and inventory management",
      "Billing and insurance integration",
      "Multi-branch support",
      "Integrated with Sharp-Accounting and the platform",
      "Ever-expanding features",
    ],
  },
] as const;

const upcoming = [
  {
    icon: ShoppingBag,
    name: "Sharp-Retail",
    blurb: "Stores, stock, and sales — retail operations on the Sharp core.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    blurb: "Production, procurement, and plant operations — on the roadmap.",
  },
] as const;

export function ServicesSolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useServicesSolutionsAnimation({ sectionRef, panelsRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div
        ref={panelsRef}
        className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-8"
      >
        {solutions.map((solution) => (
          <div
            key={solution.name}
            className="grid gap-10 rounded-3xl border border-border bg-surface p-8 md:p-12 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-text-muted">
                {solution.badge}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-text-dark sm:text-3xl">
                {solution.name}
              </h2>
              <p className="mt-4 font-display text-lg font-semibold text-text-dark">
                {solution.pain}
              </p>
              <p className="mt-3 leading-relaxed text-text-muted">
                {solution.pitch}
              </p>
            </div>
            <ul className="grid content-center gap-3 sm:grid-cols-2">
              {solution.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-snug text-text-muted"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent-strong"
                    strokeWidth={2}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Industries on the way */}
        <div className="grid gap-4 sm:grid-cols-2">
          {upcoming.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-4 rounded-2xl border border-dashed border-border bg-background p-7"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <item.icon className="size-5 text-primary" strokeWidth={1.7} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-text-dark">
                    {item.name}
                  </h3>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-text-faint">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {item.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
